-- Seed: usuário inicial super-admin para TI / go-live.
-- Login no CMS: suave@suave.ppg.br
-- Senha em texto: ver sql/README.md (seção "Usuário inicial") — trocar após o primeiro acesso.
-- Hash: scrypt (salt:hex) — mesmo formato de src/lib/cms/password.ts
-- Idempotente: só cria se o Username ainda não existir.

SET NOCOUNT ON;

DECLARE @Username NVARCHAR(80) = N'suave@suave.ppg.br';
DECLARE @DisplayName NVARCHAR(160) = N'Suave';
DECLARE @PasswordHash NVARCHAR(256) = N'd4b51a1f89c40f977f639ae65e6569c0:51953adaaa91e6ff3f77b6b758dff07f69c0515be3748176e01079135cc4277527ae99fc77f5b92f00d850c5e354b6b7347ac7022cc18b4b553b693b431970da';
DECLARE @UserId INT;

IF NOT EXISTS (SELECT 1 FROM dbo.CmsUser WHERE Username = @Username)
BEGIN
  INSERT INTO dbo.CmsUser (Username, DisplayName, PasswordHash, IsSuperAdmin, IsActive, SessionVersion)
  VALUES (@Username, @DisplayName, @PasswordHash, 1, 1, 0);

  SET @UserId = SCOPE_IDENTITY();
  PRINT N'Usuário criado: ' + @Username + N' (Id=' + CAST(@UserId AS NVARCHAR(20)) + N')';
END
ELSE
BEGIN
  SELECT @UserId = Id FROM dbo.CmsUser WHERE Username = @Username;
  PRINT N'Usuário já existia: ' + @Username + N' (Id=' + CAST(@UserId AS NVARCHAR(20)) + N') — nenhuma alteração.';
END
GO
