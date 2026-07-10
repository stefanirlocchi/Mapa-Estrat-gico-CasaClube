from __future__ import annotations

import os
import sqlite3
import uuid
from datetime import datetime, timezone
from pathlib import Path
from xml.sax.saxutils import escape as xml_escape

from flask import Flask, jsonify, request, send_from_directory
from PIL import Image as PillowImage

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import cm
from reportlab.platypus import Image, Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle


BASE_DIR = Path(__file__).resolve().parent
PROJECT_ROOT = BASE_DIR.parent
DB_PATH = Path(os.environ.get("DATABASE_PATH", str(BASE_DIR / "mentoria.db"))).expanduser()
REPORTS_DIR = BASE_DIR / "generated_reports"
UPLOADS_DIR = Path(os.environ.get("UPLOADS_DIR", str(BASE_DIR / "uploads"))).expanduser()
CASA_CLUBE_LOGO = PROJECT_ROOT / "logo.casaclube.cropped.png"
LU_LOCCCHI_LOGO = PROJECT_ROOT / "LOGOMENTORALULOCCHI.cropped.png"
LOGO_CACHE_DIR = REPORTS_DIR / "logo-cache"

REPORT_STEP_TITLES = [
    "Área da cliente",
    "Boas-vindas",
    "A Primeira Pergunta",
    "Como funciona",
    "Expectativas",
    "Origem",
    "Essência",
    "Momento Atual",
    "Cliente",
    "Produto",
    "Loja",
    "Comercial",
    "Gestão",
    "Futuro",
    "Prioridades",
    "Documentos",
    "Reflexão Final",
    "Observações da Mentora",
    "Gerar relatório final",
]


def utc_now() -> str:
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


def pdf_safe(value: object) -> str:
    return xml_escape(str(value or "—")).replace("\n", "<br/>")


def crop_logo_asset(path: Path) -> Path | None:
    if not path.exists():
        return None

    LOGO_CACHE_DIR.mkdir(parents=True, exist_ok=True)
    cached_path = LOGO_CACHE_DIR / path.name
    if cached_path.exists() and cached_path.stat().st_mtime >= path.stat().st_mtime:
        return cached_path

    image = PillowImage.open(path).convert("RGBA")
    pixels = image.getdata()
    mask = PillowImage.new("L", image.size, 0)
    mask_pixels = []

    for red, green, blue, alpha in pixels:
        visible = alpha > 0 and max(red, green, blue) > 18
        mask_pixels.append(255 if visible else 0)

    mask.putdata(mask_pixels)
    bounds = mask.getbbox()
    if bounds:
        image = image.crop(bounds)

    image.save(cached_path)
    return cached_path


def maybe_logo(path: Path, width: float) -> Image | None:
    if not path.exists():
        return None

    logo = Image(str(path))
    logo._restrictSize(width, 1.8 * cm)
    return logo


def build_pdf_report(file_path: Path, session_row: sqlite3.Row, answers: list[sqlite3.Row], notes: list[sqlite3.Row]) -> None:
    REPORTS_DIR.mkdir(parents=True, exist_ok=True)

    answers_by_step: dict[str, list[sqlite3.Row]] = {}
    notes_by_step: dict[str, list[sqlite3.Row]] = {}

    for row in answers:
        answers_by_step.setdefault(row["step_key"], []).append(row)

    for row in notes:
        notes_by_step.setdefault(row["step_key"], []).append(row)

    styles = getSampleStyleSheet()
    title_style = ParagraphStyle(
        "CasaClubeTitle",
        parent=styles["Title"],
        fontName="Helvetica-Bold",
        fontSize=20,
        leading=24,
        textColor=colors.HexColor("#6d302d"),
        spaceAfter=8,
    )
    subtitle_style = ParagraphStyle(
        "CasaClubeSubtitle",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=9.5,
        leading=12,
        textColor=colors.HexColor("#6b7280"),
        spaceAfter=14,
    )
    section_style = ParagraphStyle(
        "CasaClubeSection",
        parent=styles["Heading2"],
        fontName="Helvetica-Bold",
        fontSize=14,
        leading=17,
        textColor=colors.HexColor("#4a1f1d"),
        spaceBefore=14,
        spaceAfter=6,
    )
    label_style = ParagraphStyle(
        "CasaClubeLabel",
        parent=styles["Normal"],
        fontName="Helvetica-Bold",
        fontSize=9,
        leading=11,
        textColor=colors.HexColor("#4a1f1d"),
        spaceBefore=6,
    )
    body_style = ParagraphStyle(
        "CasaClubeBody",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=10,
        leading=13,
        textColor=colors.HexColor("#2a2c31"),
        spaceAfter=4,
    )
    muted_style = ParagraphStyle(
        "CasaClubeMuted",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=9,
        leading=11,
        textColor=colors.HexColor("#6f6b67"),
    )

    story: list[object] = []
    title_row = [
        maybe_logo(crop_logo_asset(CASA_CLUBE_LOGO) or CASA_CLUBE_LOGO, 7.0 * cm) or Paragraph("Casa Clube", subtitle_style),
        Paragraph("<b>Relatório Estratégico Casa Clube®</b><br/>Gerado a partir do Mapa Estratégico Casa Clube®.", subtitle_style),
        maybe_logo(crop_logo_asset(LU_LOCCCHI_LOGO) or LU_LOCCCHI_LOGO, 5.4 * cm) or Paragraph("Lu Locchi", subtitle_style),
    ]
    title_table = Table([title_row], colWidths=[7.0 * cm, 4.8 * cm, 5.4 * cm])
    title_table.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                ("ALIGN", (0, 0), (0, 0), "LEFT"),
                ("ALIGN", (1, 0), (1, 0), "CENTER"),
                ("ALIGN", (2, 0), (2, 0), "RIGHT"),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
            ]
        )
    )
    story.append(title_table)
    story.append(Spacer(1, 10))

    meta_table = Table(
        [
            [
                Paragraph(f"<b>Cliente:</b> {pdf_safe(session_row['client_name'])}", body_style),
                Paragraph(f"<b>Empresa:</b> {pdf_safe(session_row['client_company'])}", body_style),
            ],
            [
                Paragraph(f"<b>Sessão:</b> #{session_row['id']}", body_style),
                Paragraph(f"<b>Status:</b> {pdf_safe(session_row['status'])}", body_style),
            ],
            [
                Paragraph(f"<b>Início:</b> {pdf_safe(session_row['started_at'])}", body_style),
                Paragraph(f"<b>Atualizado:</b> {pdf_safe(session_row['updated_at'])}", body_style),
            ],
        ],
        colWidths=[8.1 * cm, 8.1 * cm],
    )
    meta_table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), colors.HexColor("#fffaf7")),
                ("BOX", (0, 0), (-1, -1), 0.6, colors.HexColor("#e8dccc")),
                ("INNERGRID", (0, 0), (-1, -1), 0.4, colors.HexColor("#eadfd2")),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 10),
                ("RIGHTPADDING", (0, 0), (-1, -1), 10),
                ("TOPPADDING", (0, 0), (-1, -1), 8),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
            ]
        )
    )
    story.append(meta_table)
    story.append(Spacer(1, 12))

    for step_title in REPORT_STEP_TITLES:
        step_answers = answers_by_step.get(step_title, [])
        step_notes = notes_by_step.get(step_title, [])

        if not step_answers and not step_notes:
            continue

        story.append(Paragraph(step_title, section_style))

        for answer in step_answers:
            story.append(Paragraph(pdf_safe(answer["field_key"]), label_style))
            story.append(Paragraph(pdf_safe(answer["answer"]), body_style))

        for note in step_notes:
            story.append(Paragraph("Observação da mentora", label_style))
            story.append(Paragraph(pdf_safe(note["note"]), body_style))

    if len(story) == 4:
        story.append(Paragraph("Nenhuma resposta foi registrada para esta sessão.", muted_style))

    doc = SimpleDocTemplate(
        str(file_path),
        pagesize=A4,
        leftMargin=1.8 * cm,
        rightMargin=1.8 * cm,
        topMargin=1.8 * cm,
        bottomMargin=1.8 * cm,
    )
    doc.build(story)


def report_file_name(session_id: int) -> str:
    return f"session_{session_id}_final_report.pdf"


def sanitize_filename(file_name: str) -> str:
    cleaned = "".join(ch if ch.isalnum() or ch in {"-", "_", "."} else "_" for ch in (file_name or "arquivo"))
    cleaned = cleaned.strip("._")
    return cleaned or "arquivo"


def get_connection() -> sqlite3.Connection:
    DB_PATH.parent.mkdir(parents=True, exist_ok=True)
    connection = sqlite3.connect(DB_PATH)
    connection.row_factory = sqlite3.Row
    connection.execute("PRAGMA foreign_keys = ON;")
    return connection


def init_db() -> None:
    schema_path = BASE_DIR / "schema.sql"
    with get_connection() as connection:
        connection.executescript(schema_path.read_text(encoding="utf-8"))
    UPLOADS_DIR.mkdir(parents=True, exist_ok=True)


def ensure_db_initialized() -> None:
    # Required in production because gunicorn imports the app without running __main__.
    # Running the schema script on every boot is safe because it uses CREATE TABLE IF NOT EXISTS.
    if os.environ.get("SKIP_DB_INIT") == "1":
        return
    init_db()


def create_app() -> Flask:
    ensure_db_initialized()
    app = Flask(__name__)

    def serve_project_file(filename: str):
        file_path = PROJECT_ROOT / filename
        if not file_path.exists() or file_path.is_dir():
            return jsonify(error="file not found"), 404
        return send_from_directory(PROJECT_ROOT, filename)

    @app.after_request
    def add_cors_headers(response):
        response.headers["Access-Control-Allow-Origin"] = "*"
        response.headers["Access-Control-Allow-Headers"] = "Content-Type"
        response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
        return response

    @app.get("/api/health")
    def health() -> tuple[dict, int]:
        return jsonify(status="ok", timestamp=utc_now()), 200

    @app.get("/")
    def home():
        return serve_project_file("index.html")

    @app.get("/<path:filename>")
    def project_files(filename: str):
        if filename.startswith("api/"):
            return jsonify(error="not found"), 404
        return serve_project_file(filename)

    @app.route("/api/clients/resolve", methods=["POST", "OPTIONS"])
    def resolve_client() -> tuple[dict, int]:
        if request.method == "OPTIONS":
            return jsonify(ok=True), 200

        payload = request.get_json(silent=True) or {}
        name = str(payload.get("name", "")).strip()
        company = str(payload.get("company", "")).strip()
        access_code = str(payload.get("access_code", "")).strip()

        if not name or not company or not access_code:
            return jsonify(error="name, company and access_code are required"), 400

        with get_connection() as connection:
            existing = connection.execute(
                "SELECT id, name, company, access_code, created_at, updated_at FROM clients WHERE access_code = ?",
                (access_code,),
            ).fetchone()

            if existing is not None:
                connection.execute(
                    """
                    UPDATE clients
                    SET name = ?, company = ?, updated_at = ?
                    WHERE id = ?
                    """,
                    (name, company, utc_now(), existing["id"]),
                )
                connection.commit()
                refreshed = connection.execute(
                    "SELECT id, name, company, access_code, created_at, updated_at FROM clients WHERE id = ?",
                    (existing["id"],),
                ).fetchone()
                return jsonify(client=dict(refreshed), created=False), 200

            cursor = connection.execute(
                """
                INSERT INTO clients (name, company, access_code, created_at, updated_at)
                VALUES (?, ?, ?, ?, ?)
                """,
                (name, company, access_code, utc_now(), utc_now()),
            )
            client_id = cursor.lastrowid
            connection.commit()

            created = connection.execute(
                "SELECT id, name, company, access_code, created_at, updated_at FROM clients WHERE id = ?",
                (client_id,),
            ).fetchone()

        return jsonify(client=dict(created), created=True), 201

    @app.post("/api/clients")
    def create_client() -> tuple[dict, int]:
        payload = request.get_json(silent=True) or {}
        name = str(payload.get("name", "")).strip()
        company = str(payload.get("company", "")).strip()
        access_code = str(payload.get("access_code", "")).strip()

        if not name or not company or not access_code:
            return jsonify(error="name, company and access_code are required"), 400

        with get_connection() as connection:
            cursor = connection.execute(
                """
                INSERT INTO clients (name, company, access_code, created_at, updated_at)
                VALUES (?, ?, ?, ?, ?)
                """,
                (name, company, access_code, utc_now(), utc_now()),
            )
            connection.commit()
            client_id = cursor.lastrowid

        return jsonify(
            name=name,
            company=company,
            access_code=access_code,
            id=client_id,
        ), 201

    @app.get("/api/clients/<int:client_id>")
    def get_client(client_id: int) -> tuple[dict, int]:
        with get_connection() as connection:
            client = connection.execute(
                "SELECT id, name, company, access_code, created_at, updated_at FROM clients WHERE id = ?",
                (client_id,),
            ).fetchone()

        if client is None:
            return jsonify(error="client not found"), 404

        return jsonify(dict(client)), 200

    @app.get("/api/clients")
    def list_clients() -> tuple[dict, int]:
        with get_connection() as connection:
            rows = connection.execute(
                "SELECT id, name, company, access_code, created_at, updated_at FROM clients ORDER BY created_at DESC"
            ).fetchall()

        return jsonify(clients=[dict(row) for row in rows]), 200

    @app.post("/api/sessions")
    def create_session() -> tuple[dict, int]:
        payload = request.get_json(silent=True) or {}
        client_id = payload.get("client_id")

        if not client_id:
            return jsonify(error="client_id is required"), 400

        with get_connection() as connection:
            client = connection.execute(
                "SELECT id FROM clients WHERE id = ?",
                (client_id,),
            ).fetchone()

            if client is None:
                return jsonify(error="client not found"), 404

            cursor = connection.execute(
                """
                INSERT INTO mentorship_sessions (client_id, status, started_at, updated_at)
                VALUES (?, ?, ?, ?)
                """,
                (client_id, "open", utc_now(), utc_now()),
            )
            session_id = cursor.lastrowid
            connection.commit()

        return jsonify(id=session_id, client_id=client_id, status="open"), 201

    @app.get("/api/clients/<int:client_id>/sessions/latest")
    def get_latest_session(client_id: int) -> tuple[dict, int]:
        with get_connection() as connection:
            session = connection.execute(
                """
                SELECT id, client_id, status, started_at, updated_at
                FROM mentorship_sessions
                WHERE client_id = ?
                ORDER BY datetime(updated_at) DESC, id DESC
                LIMIT 1
                """,
                (client_id,),
            ).fetchone()

        if session is None:
            return jsonify(session=None), 200

        return jsonify(session=dict(session)), 200

    @app.get("/api/clients/<int:client_id>/sessions")
    def list_client_sessions(client_id: int) -> tuple[dict, int]:
        with get_connection() as connection:
            client = connection.execute(
                "SELECT id FROM clients WHERE id = ?",
                (client_id,),
            ).fetchone()

            if client is None:
                return jsonify(error="client not found"), 404

            sessions = connection.execute(
                """
                SELECT s.id, s.client_id, s.status, s.started_at, s.updated_at,
                       COUNT(r.id) AS report_count,
                      MAX(r.generated_at) AS last_report_generated_at,
                      MAX(r.report_path) AS last_report_path
                FROM mentorship_sessions AS s
                LEFT JOIN final_reports AS r ON r.session_id = s.id
                WHERE s.client_id = ?
                GROUP BY s.id, s.client_id, s.status, s.started_at, s.updated_at
                ORDER BY datetime(s.updated_at) DESC, s.id DESC
                """,
                (client_id,),
            ).fetchall()

        return jsonify(sessions=[dict(row) for row in sessions]), 200

    @app.get("/api/sessions/<int:session_id>/history")
    def get_session_history(session_id: int) -> tuple[dict, int]:
        with get_connection() as connection:
            session = connection.execute(
                """
                SELECT s.id, s.client_id, s.status, s.started_at, s.updated_at,
                                             c.name AS client_name, c.company AS client_company, c.access_code AS client_access_code,
                                             COUNT(r.id) AS report_count,
                                             MAX(r.generated_at) AS last_report_generated_at,
                                             MAX(r.report_path) AS last_report_path
                FROM mentorship_sessions AS s
                JOIN clients AS c ON c.id = s.client_id
                                LEFT JOIN final_reports AS r ON r.session_id = s.id
                WHERE s.id = ?
                                GROUP BY s.id, s.client_id, s.status, s.started_at, s.updated_at,
                                                 c.name, c.company, c.access_code
                """,
                (session_id,),
            ).fetchone()

            if session is None:
                return jsonify(error="session not found"), 404

            answers = connection.execute(
                """
                SELECT step_key, field_key, answer, created_at, updated_at
                FROM step_answers
                WHERE session_id = ?
                ORDER BY id ASC
                """,
                (session_id,),
            ).fetchall()

            notes = connection.execute(
                """
                SELECT step_key, note, created_at, updated_at
                FROM mentor_notes
                WHERE session_id = ?
                ORDER BY id ASC
                """,
                (session_id,),
            ).fetchall()

            attachments = connection.execute(
                """
                SELECT id, session_id, step_key, field_key, original_name, stored_name, content_type, file_size, created_at
                FROM session_attachments
                WHERE session_id = ?
                ORDER BY id ASC
                """,
                (session_id,),
            ).fetchall()

        return jsonify(
            session=dict(session),
            answers=[dict(row) for row in answers],
            notes=[dict(row) for row in notes],
            attachments=[
                {
                    **dict(row),
                    "view_url": f"/api/attachments/{row['id']}",
                    "download_url": f"/api/attachments/{row['id']}/download",
                }
                for row in attachments
            ],
        ), 200

    @app.route("/api/sessions/<int:session_id>/attachments", methods=["POST", "OPTIONS"])
    def upload_session_attachments(session_id: int) -> tuple[dict, int]:
        if request.method == "OPTIONS":
            return jsonify(ok=True), 200

        step_key = str(request.form.get("step_key", "")).strip()
        field_key = str(request.form.get("field_key", "")).strip()
        uploaded_files = request.files.getlist("files") or request.files.getlist("file")

        if not step_key or not field_key:
            return jsonify(error="step_key and field_key are required"), 400

        if not uploaded_files:
            return jsonify(error="at least one file is required"), 400

        with get_connection() as connection:
            session = connection.execute(
                "SELECT id FROM mentorship_sessions WHERE id = ?",
                (session_id,),
            ).fetchone()

            if session is None:
                return jsonify(error="session not found"), 404

            session_dir = UPLOADS_DIR / f"session_{session_id}"
            session_dir.mkdir(parents=True, exist_ok=True)

            created = []
            for storage_file in uploaded_files:
                if storage_file is None:
                    continue

                original_name = sanitize_filename(storage_file.filename or "arquivo")
                suffix = Path(original_name).suffix.lower()
                unique_name = f"{uuid.uuid4().hex}{suffix}"
                destination = session_dir / unique_name
                storage_file.save(destination)

                file_size = destination.stat().st_size if destination.exists() else 0
                content_type = storage_file.mimetype or "application/octet-stream"

                cursor = connection.execute(
                    """
                    INSERT INTO session_attachments (
                        session_id, step_key, field_key, original_name, stored_name, content_type, file_size, created_at
                    )
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                    """,
                    (session_id, step_key, field_key, original_name, unique_name, content_type, file_size, utc_now()),
                )
                attachment_id = cursor.lastrowid
                created.append(
                    {
                        "id": attachment_id,
                        "session_id": session_id,
                        "step_key": step_key,
                        "field_key": field_key,
                        "original_name": original_name,
                        "stored_name": unique_name,
                        "content_type": content_type,
                        "file_size": file_size,
                        "created_at": utc_now(),
                        "view_url": f"/api/attachments/{attachment_id}",
                        "download_url": f"/api/attachments/{attachment_id}/download",
                    }
                )

            connection.execute(
                "UPDATE mentorship_sessions SET updated_at = ? WHERE id = ?",
                (utc_now(), session_id),
            )
            connection.commit()

        return jsonify(session_id=session_id, attachments=created), 201

    @app.get("/api/attachments/<int:attachment_id>")
    def view_attachment(attachment_id: int):
        with get_connection() as connection:
            attachment = connection.execute(
                """
                SELECT id, session_id, original_name, stored_name, content_type
                FROM session_attachments
                WHERE id = ?
                """,
                (attachment_id,),
            ).fetchone()

        if attachment is None:
            return jsonify(error="attachment not found"), 404

        file_path = UPLOADS_DIR / f"session_{attachment['session_id']}" / attachment["stored_name"]
        if not file_path.exists():
            return jsonify(error="attachment file not found"), 404

        return send_from_directory(
            file_path.parent,
            file_path.name,
            mimetype=attachment["content_type"] or "application/octet-stream",
            as_attachment=False,
        )

    @app.get("/api/attachments/<int:attachment_id>/download")
    def download_attachment(attachment_id: int):
        with get_connection() as connection:
            attachment = connection.execute(
                """
                SELECT id, session_id, original_name, stored_name, content_type
                FROM session_attachments
                WHERE id = ?
                """,
                (attachment_id,),
            ).fetchone()

        if attachment is None:
            return jsonify(error="attachment not found"), 404

        file_path = UPLOADS_DIR / f"session_{attachment['session_id']}" / attachment["stored_name"]
        if not file_path.exists():
            return jsonify(error="attachment file not found"), 404

        return send_from_directory(
            file_path.parent,
            file_path.name,
            mimetype=attachment["content_type"] or "application/octet-stream",
            as_attachment=True,
            download_name=attachment["original_name"],
        )

    @app.route("/api/sessions/<int:session_id>/answers", methods=["POST", "OPTIONS"])
    def upsert_step_answer(session_id: int) -> tuple[dict, int]:
        if request.method == "OPTIONS":
            return jsonify(ok=True), 200

        payload = request.get_json(silent=True) or {}
        step_key = str(payload.get("step_key", "")).strip()
        field_key = str(payload.get("field_key", "")).strip()
        answer = str(payload.get("answer", "")).strip()

        if not step_key or not field_key:
            return jsonify(error="step_key and field_key are required"), 400

        with get_connection() as connection:
            session = connection.execute(
                "SELECT id FROM mentorship_sessions WHERE id = ?",
                (session_id,),
            ).fetchone()

            if session is None:
                return jsonify(error="session not found"), 404

            connection.execute(
                """
                INSERT INTO step_answers (session_id, step_key, field_key, answer, created_at, updated_at)
                VALUES (?, ?, ?, ?, ?, ?)
                ON CONFLICT(session_id, step_key, field_key)
                DO UPDATE SET answer = excluded.answer, updated_at = excluded.updated_at
                """,
                (session_id, step_key, field_key, answer, utc_now(), utc_now()),
            )
            connection.commit()

        return jsonify(session_id=session_id, step_key=step_key, field_key=field_key, answer=answer), 200

    @app.route("/api/sessions/<int:session_id>/notes", methods=["POST", "OPTIONS"])
    def upsert_mentor_note(session_id: int) -> tuple[dict, int]:
        if request.method == "OPTIONS":
            return jsonify(ok=True), 200

        payload = request.get_json(silent=True) or {}
        step_key = str(payload.get("step_key", "")).strip()
        note = str(payload.get("note", "")).strip()

        if not step_key:
            return jsonify(error="step_key is required"), 400

        with get_connection() as connection:
            session = connection.execute(
                "SELECT id FROM mentorship_sessions WHERE id = ?",
                (session_id,),
            ).fetchone()

            if session is None:
                return jsonify(error="session not found"), 404

            connection.execute(
                """
                INSERT INTO mentor_notes (session_id, step_key, note, created_at, updated_at)
                VALUES (?, ?, ?, ?, ?)
                ON CONFLICT(session_id, step_key)
                DO UPDATE SET note = excluded.note, updated_at = excluded.updated_at
                """,
                (session_id, step_key, note, utc_now(), utc_now()),
            )
            connection.commit()

        return jsonify(session_id=session_id, step_key=step_key, note=note), 200

    @app.route("/api/sessions/<int:session_id>/reports", methods=["POST", "OPTIONS"])
    def create_final_report(session_id: int) -> tuple[dict, int]:
        if request.method == "OPTIONS":
            return jsonify(ok=True), 200

        with get_connection() as connection:
            session = connection.execute(
                """
                SELECT s.id, s.client_id, s.status, s.started_at, s.updated_at,
                       c.name AS client_name, c.company AS client_company
                FROM mentorship_sessions AS s
                JOIN clients AS c ON c.id = s.client_id
                WHERE s.id = ?
                """,
                (session_id,),
            ).fetchone()

            if session is None:
                return jsonify(error="session not found"), 404

            answers = connection.execute(
                """
                SELECT step_key, field_key, answer, created_at, updated_at
                FROM step_answers
                WHERE session_id = ?
                ORDER BY id ASC
                """,
                (session_id,),
            ).fetchall()

            notes = connection.execute(
                """
                SELECT step_key, note, created_at, updated_at
                FROM mentor_notes
                WHERE session_id = ?
                ORDER BY id ASC
                """,
                (session_id,),
            ).fetchall()

            file_name = report_file_name(session_id)
            file_path = REPORTS_DIR / file_name

            build_pdf_report(file_path, session, answers, notes)

            connection.execute(
                "UPDATE mentorship_sessions SET status = ?, updated_at = ? WHERE id = ?",
                ("closed", utc_now(), session_id),
            )
            connection.execute(
                "DELETE FROM final_reports WHERE session_id = ?",
                (session_id,),
            )
            connection.execute(
                """
                INSERT INTO final_reports (session_id, report_path, generated_at)
                VALUES (?, ?, ?)
                """,
                (session_id, file_name, utc_now()),
            )
            connection.commit()

        return jsonify(
            session_id=session_id,
            report_path=file_name,
            download_url=f"/api/reports/{file_name}",
            status="closed",
        ), 201

    @app.get("/api/reports/<path:report_name>")
    def get_report(report_name: str):
        report_path = REPORTS_DIR / report_name
        if not report_path.exists():
            return jsonify(error="report not found"), 404

        return send_from_directory(REPORTS_DIR, report_name, mimetype="application/pdf", as_attachment=False)

    @app.get("/api/reports/<path:report_name>/download")
    def download_report(report_name: str):
        report_path = REPORTS_DIR / report_name
        if not report_path.exists():
            return jsonify(error="report not found"), 404

        return send_from_directory(
            REPORTS_DIR,
            report_name,
            mimetype="application/pdf",
            as_attachment=True,
            download_name=report_name,
        )

    return app


app = create_app()


if __name__ == "__main__":
    ensure_db_initialized()
    port = int(os.environ.get("PORT", "5000"))
    debug = os.environ.get("FLASK_DEBUG", "0") == "1"
    app.run(host="0.0.0.0", port=port, debug=debug)