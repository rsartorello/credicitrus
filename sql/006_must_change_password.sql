-- Segurança: obriga troca de senha no primeiro acesso (ou após reset por admin).

IF COL_LENGTH('dbo.CmsUser', 'MustChangePassword') IS NULL
BEGIN
  ALTER TABLE dbo.CmsUser
    ADD MustChangePassword BIT NOT NULL
      CONSTRAINT DF_CmsUser_MustChangePassword DEFAULT (0);
END
GO

-- Ambientes que já tinham o seed antigo (SessionVersion ainda 0 = senha nunca trocada):
-- marca o admin bootstrap para troca obrigatória no próximo login.
UPDATE dbo.CmsUser
SET MustChangePassword = 1,
    UpdatedAt = SYSUTCDATETIME()
WHERE Username = N'suave@suave.ppg.br'
  AND SessionVersion = 0
  AND MustChangePassword = 0;
GO
