-- Credicitrus CMS — schema inicial (SQL Server)
-- Executar uma vez por ambiente (Dev / Prod), banco isolado.

IF NOT EXISTS (SELECT 1 FROM sys.tables WHERE name = 'DocumentCategory')
BEGIN
  CREATE TABLE DocumentCategory (
    Id            INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    Module        NVARCHAR(50)  NOT NULL,  -- relatorios | normativos | etica | tarifas | assembleia
    Slug          NVARCHAR(100) NOT NULL,
    Title         NVARCHAR(200) NOT NULL,
    UiType        NVARCHAR(30)  NULL,      -- annual | semestral | monthly | quarterly | list | card
    SortOrder     INT NOT NULL CONSTRAINT DF_DocumentCategory_SortOrder DEFAULT (0),
    IsActive      BIT NOT NULL CONSTRAINT DF_DocumentCategory_IsActive DEFAULT (1),
    CreatedAt     DATETIME2 NOT NULL CONSTRAINT DF_DocumentCategory_CreatedAt DEFAULT (SYSUTCDATETIME()),
    UpdatedAt     DATETIME2 NOT NULL CONSTRAINT DF_DocumentCategory_UpdatedAt DEFAULT (SYSUTCDATETIME()),
    CONSTRAINT UQ_DocumentCategory_Module_Slug UNIQUE (Module, Slug)
  );
END
GO

IF NOT EXISTS (SELECT 1 FROM sys.tables WHERE name = 'Document')
BEGIN
  CREATE TABLE Document (
    Id            INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    CategoryId    INT NOT NULL,
    Title         NVARCHAR(300) NOT NULL,
    Label         NVARCHAR(100) NULL,
    Description   NVARCHAR(1000) NULL,
    Year          NVARCHAR(4) NULL,
    Month         NVARCHAR(2) NULL,       -- 01..12
    Semester      NVARCHAR(2) NULL,       -- 1S | 2S
    Quarter       NVARCHAR(2) NULL,       -- 1T..4T
    FilePath      NVARCHAR(500) NULL,     -- relativo a CMS_UPLOAD_PATH
    ExternalUrl   NVARCHAR(1000) NULL,
    IsPublished   BIT NOT NULL CONSTRAINT DF_Document_IsPublished DEFAULT (0),
    IsCurrent     BIT NOT NULL CONSTRAINT DF_Document_IsCurrent DEFAULT (0), -- ex.: tarifa vigente
    SortOrder     INT NOT NULL CONSTRAINT DF_Document_SortOrder DEFAULT (0),
    PublishedAt   DATETIME2 NULL,
    CreatedAt     DATETIME2 NOT NULL CONSTRAINT DF_Document_CreatedAt DEFAULT (SYSUTCDATETIME()),
    UpdatedAt     DATETIME2 NOT NULL CONSTRAINT DF_Document_UpdatedAt DEFAULT (SYSUTCDATETIME()),
    CONSTRAINT FK_Document_Category FOREIGN KEY (CategoryId) REFERENCES DocumentCategory(Id)
  );

  CREATE INDEX IX_Document_CategoryId ON Document (CategoryId);
  CREATE INDEX IX_Document_Published ON Document (IsPublished, CategoryId);
END
GO

IF NOT EXISTS (SELECT 1 FROM sys.tables WHERE name = 'HeroCampaign')
BEGIN
  CREATE TABLE HeroCampaign (
    Id                 INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    Title              NVARCHAR(200) NOT NULL,
    ImageDesktopPath   NVARCHAR(500) NOT NULL,
    ImageMobilePath    NVARCHAR(500) NULL,
    CtaLabel           NVARCHAR(100) NULL,
    CtaHref            NVARCHAR(500) NULL,
    CtaVariant         NVARCHAR(30) NULL, -- primary | secondary | outline | verde
    SortOrder          INT NOT NULL CONSTRAINT DF_HeroCampaign_SortOrder DEFAULT (0),
    StartsAt           DATETIME2 NULL,
    EndsAt             DATETIME2 NULL,
    IsPublished        BIT NOT NULL CONSTRAINT DF_HeroCampaign_IsPublished DEFAULT (0),
    CreatedAt          DATETIME2 NOT NULL CONSTRAINT DF_HeroCampaign_CreatedAt DEFAULT (SYSUTCDATETIME()),
    UpdatedAt          DATETIME2 NOT NULL CONSTRAINT DF_HeroCampaign_UpdatedAt DEFAULT (SYSUTCDATETIME())
  );

  CREATE INDEX IX_HeroCampaign_Published ON HeroCampaign (IsPublished, SortOrder);
END
GO

IF NOT EXISTS (SELECT 1 FROM sys.tables WHERE name = 'CmsAuditLog')
BEGIN
  CREATE TABLE CmsAuditLog (
    Id            BIGINT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    Actor         NVARCHAR(100) NOT NULL,
    Action        NVARCHAR(50)  NOT NULL,
    EntityType    NVARCHAR(50)  NOT NULL,
    EntityId      INT NULL,
    Details       NVARCHAR(MAX) NULL,
    CreatedAt     DATETIME2 NOT NULL CONSTRAINT DF_CmsAuditLog_CreatedAt DEFAULT (SYSUTCDATETIME())
  );
END
GO
