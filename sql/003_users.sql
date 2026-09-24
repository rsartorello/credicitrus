-- Usuários do CMS e permissões por módulo.
-- Níveis: none | view | edit | publish

IF NOT EXISTS (SELECT 1 FROM sys.tables WHERE name = 'CmsUser')
BEGIN
  CREATE TABLE CmsUser (
    Id            INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    Username      NVARCHAR(80)  NOT NULL,
    DisplayName   NVARCHAR(160) NOT NULL,
    PasswordHash  NVARCHAR(256) NOT NULL,
    IsSuperAdmin  BIT NOT NULL CONSTRAINT DF_CmsUser_IsSuperAdmin DEFAULT (0),
    IsActive      BIT NOT NULL CONSTRAINT DF_CmsUser_IsActive DEFAULT (1),
    MustChangePassword BIT NOT NULL CONSTRAINT DF_CmsUser_MustChangePassword DEFAULT (0),
    CreatedAt     DATETIME2 NOT NULL CONSTRAINT DF_CmsUser_CreatedAt DEFAULT (SYSUTCDATETIME()),
    UpdatedAt     DATETIME2 NOT NULL CONSTRAINT DF_CmsUser_UpdatedAt DEFAULT (SYSUTCDATETIME()),
    CONSTRAINT UQ_CmsUser_Username UNIQUE (Username)
  );
END
GO

IF NOT EXISTS (SELECT 1 FROM sys.tables WHERE name = 'CmsUserPermission')
BEGIN
  CREATE TABLE CmsUserPermission (
    UserId        INT NOT NULL,
    Module        NVARCHAR(50) NOT NULL,
    AccessLevel   NVARCHAR(20) NOT NULL CONSTRAINT DF_CmsUserPermission_AccessLevel DEFAULT (N'none'),
    CONSTRAINT PK_CmsUserPermission PRIMARY KEY (UserId, Module),
    CONSTRAINT FK_CmsUserPermission_User FOREIGN KEY (UserId) REFERENCES CmsUser(Id) ON DELETE CASCADE,
    CONSTRAINT CK_CmsUserPermission_Level CHECK (AccessLevel IN (N'none', N'view', N'edit', N'publish'))
  );

  CREATE INDEX IX_CmsUserPermission_Module ON CmsUserPermission (Module);
END
GO
