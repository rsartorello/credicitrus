-- Segurança: versão de sessão para invalidar cookies após troca de senha.

IF COL_LENGTH('dbo.CmsUser', 'SessionVersion') IS NULL
BEGIN
  ALTER TABLE dbo.CmsUser
    ADD SessionVersion INT NOT NULL
      CONSTRAINT DF_CmsUser_SessionVersion DEFAULT (0);
END
GO
