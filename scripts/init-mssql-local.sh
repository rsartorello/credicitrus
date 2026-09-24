#!/usr/bin/env bash
set -euo pipefail

if [ -f .env.local ]; then
  # Carrega variáveis para manter DATABASE_* e CMS_* consistentes
  set -a
  # shellcheck disable=SC1091
  source .env.local
  set +a
fi

CONTAINER_NAME="${MSSQL_CONTAINER_NAME:-credicitrus-mssql-local}"
DB_NAME="${DATABASE_NAME:-CredicitrusCms}"
SA_USER="${DATABASE_USER:-sa}"
SA_PASSWORD="${DATABASE_PASSWORD:-LocalMssql123!}"

SQLCMD_PATH="/opt/mssql-tools18/bin/sqlcmd"
SQLCMD_TRUST="-C"

if ! docker ps --format '{{.Names}}' | grep -qx "${CONTAINER_NAME}"; then
  echo "Docker container '${CONTAINER_NAME}' não está rodando."
  echo "Suba com:"
  echo "  docker compose -f docker-compose.mssql.local.yml up -d"
  exit 1
fi

echo "Criando banco/seed no SQL Server local: ${DB_NAME}"

# Copia scripts para dentro do container (para sqlcmd processar GO corretamente)
docker cp sql/001_schema.sql "${CONTAINER_NAME}:/tmp/credicitrus-001_schema.sql" >/dev/null
docker cp sql/002_seed_categories.sql "${CONTAINER_NAME}:/tmp/credicitrus-002_seed_categories.sql" >/dev/null
docker cp sql/003_users.sql "${CONTAINER_NAME}:/tmp/credicitrus-003_users.sql" >/dev/null
docker cp sql/004_session_version.sql "${CONTAINER_NAME}:/tmp/credicitrus-004_session_version.sql" >/dev/null

# Cria DB se não existir
docker exec "${CONTAINER_NAME}" ${SQLCMD_PATH} ${SQLCMD_TRUST} \
  -S localhost \
  -U "${SA_USER}" \
  -P "${SA_PASSWORD}" \
  -Q "IF DB_ID('${DB_NAME}') IS NULL CREATE DATABASE [${DB_NAME}];"

# Executa schema + seed
docker exec "${CONTAINER_NAME}" ${SQLCMD_PATH} ${SQLCMD_TRUST} \
  -S localhost \
  -U "${SA_USER}" \
  -P "${SA_PASSWORD}" \
  -d "${DB_NAME}" \
  -i /tmp/credicitrus-001_schema.sql

docker exec "${CONTAINER_NAME}" ${SQLCMD_PATH} ${SQLCMD_TRUST} \
  -S localhost \
  -U "${SA_USER}" \
  -P "${SA_PASSWORD}" \
  -d "${DB_NAME}" \
  -i /tmp/credicitrus-002_seed_categories.sql

docker exec "${CONTAINER_NAME}" ${SQLCMD_PATH} ${SQLCMD_TRUST} \
  -S localhost \
  -U "${SA_USER}" \
  -P "${SA_PASSWORD}" \
  -d "${DB_NAME}" \
  -i /tmp/credicitrus-003_users.sql

docker exec "${CONTAINER_NAME}" ${SQLCMD_PATH} ${SQLCMD_TRUST} \
  -S localhost \
  -U "${SA_USER}" \
  -P "${SA_PASSWORD}" \
  -d "${DB_NAME}" \
  -i /tmp/credicitrus-004_session_version.sql

echo "OK: banco ${DB_NAME} inicializado."

