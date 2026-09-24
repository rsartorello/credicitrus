# SQL Server — Credicitrus CMS

Banco **separado** do código. Um banco por ambiente (Dev / Prod).

## Estrutura das tabelas (visão para TI)

| Tabela | Função |
|--------|--------|
| `DocumentCategory` | Categorias por módulo (`relatorios`, `normativos`, `etica`, `tarifas`, `assembleia`) |
| `Document` | Documentos/PDFs/links publicados no site |
| `HeroCampaign` | Banners da home (desktop/mobile + CTA) |
| `CmsUser` | Usuários do painel `/admin` |
| `CmsUserPermission` | Permissão por módulo (`none` \| `view` \| `edit` \| `publish`) — não usada para super-admin |
| `CmsAuditLog` | Auditoria de ações do CMS |

Coluna importante de segurança: `CmsUser.SessionVersion` — incrementada ao trocar senha; invalida sessões antigas.

Coluna `CmsUser.MustChangePassword` — quando `1`, o painel redireciona para `/admin/trocar-senha` e as APIs do CMS ficam bloqueadas até a troca.

## Ordem de execução

1. Criar o database (`CredicitrusCms` ou nome definido em `DATABASE_NAME`)
2. `001_schema.sql` — tabelas de conteúdo + audit
3. `002_seed_categories.sql` — categorias iniciais
4. `003_users.sql` — tabelas de usuários/permissões
5. `004_session_version.sql` — coluna `SessionVersion`
6. `006_must_change_password.sql` — coluna `MustChangePassword` (+ marca o seed antigo se a senha nunca foi trocada)
7. `005_seed_admin_suave.sql` — usuário inicial super-admin (`MustChangePassword=1`)

Scripts 001–006 são seguros para reexecução (IF NOT EXISTS / MERGE / checagem de Username / COL_LENGTH).

## Usuário inicial (entregue à TI)

| Campo | Valor |
|-------|--------|
| URL do painel | `/admin/login` |
| Login (Username) | `suave@suave.ppg.br` |
| Nome de exibição | `Suave` |
| Perfil | Super-admin (acesso total) |
| Senha inicial | **Não versionada neste README** — consta apenas nos PDFs de handoff em `docs/ti/` (envio por canal seguro) |

**Obrigatório no primeiro login:** o sistema redireciona para `/admin/trocar-senha` e bloqueia o restante do painel até a nova senha ser definida. Usuários novos e resets de senha feitos por admin também exigem troca no próximo acesso.

O CMS autentica por **Username** (não há coluna de e-mail). O endereço `suave@suave.ppg.br` foi cadastrado como login.

Passo a passo de deploy Azure e devolutiva de variáveis: `docs/ti/Credicitrus-CMS-Orientacao-TI.pdf`.

## Variáveis de ambiente relacionadas

Ver `.env.example` na raiz do projeto (`DATABASE_*`, `CMS_UPLOAD_PATH`, `ADMIN_AUTH_SECRET`, etc.).

Em **production**, o bootstrap via `ADMIN_USERNAME` / `ADMIN_PASSWORD` do `.env` está **desligado**. Use apenas usuários da tabela `CmsUser`.

## Seed do conteúdo estático (local/Dev)

```bash
npm run cms:seed
```

Cadastra Ética, Normativos, Relatórios e Tarifa vigente a partir dos fallbacks (`src/data/*-fallback.ts`). Idempotente.

## Pastas de upload (TI)

Criar fora do path de deploy, com permissão de escrita para o processo Node:

```
{CMS_UPLOAD_PATH}/
  relatorios/
  normativos/
  etica/
  tarifas/
  assembleia/
  banners/
```

Essas pastas **não** devem ser sobrescritas no deploy.
