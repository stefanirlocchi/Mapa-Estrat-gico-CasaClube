# Mapa Estratégico Casa Clube®

Portal de mentoria com frontend em HTML/CSS/JavaScript e backend em Flask.

## Como rodar localmente

1. Entre na pasta `backend`.
2. Instale as dependências com `pip install -r requirements.txt`.
3. Inicie o servidor com `python app.py`.
4. Abra o navegador em `http://127.0.0.1:5000`.

## O que a versão atual faz

- Mostra o Mapa Estratégico Casa Clube® em etapas.
- Salva respostas e notas.
- Gera relatório em PDF pelo backend.
- Mantém histórico de sessões por cliente.
- Serve o portal e a API pelo mesmo domínio quando publicado.

## Publicação

Para publicar em Render, Railway ou outro host similar:

1. Use o diretório `backend` como raiz do serviço.
2. Instale as dependências com `pip install -r requirements.txt`.
3. Inicie com `gunicorn app:app`.
4. O app usa a variável `PORT` fornecida pelo host.

### Persistência no Render (essencial)

Para não perder histórico em novo deploy:

1. Crie um **Persistent Disk** no serviço Render.
2. Monte em um caminho como `/var/data`.
3. Em Environment Variables, defina `DATABASE_PATH=/var/data/mentoria.db`.
4. Faça novo deploy.

## Observação

O banco atual é SQLite. Para uso contínuo com múltiplas clientes, o ideal é migrar para um banco com persistência garantida, como PostgreSQL.
