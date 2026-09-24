-- Categorias iniciais alinhadas às páginas atuais do site.
-- Idempotente: só insere se o (Module, Slug) ainda não existir.

MERGE DocumentCategory AS t
USING (VALUES
  -- Relatórios
  (N'relatorios', N'anuais',                N'Relatórios Anuais',                                      N'annual',    10),
  (N'relatorios', N'semestrais',            N'Relatórios Semestrais',                                  N'semestral', 20),
  (N'relatorios', N'balancetes',            N'Balancete de verificação mensal',                        N'monthly',   30),
  (N'relatorios', N'acao-social',           N'Relatório de Ação Social',                               N'annual',    40),
  (N'relatorios', N'ouvidoria',             N'Relatório de Ouvidoria',                                 N'annual',    50),
  (N'relatorios', N'canal-etica',           N'Relatório Canal de Ética',                               N'annual',    60),
  (N'relatorios', N'transparencia-salarial',N'Relatório de Transparência Salarial e Critérios Remuneratórios', N'annual', 70),

  -- Normativos
  (N'normativos', N'lista',                 N'Documentos Oficiais',                                    N'list',      10),

  -- Ética e Integridade
  (N'etica',      N'cards',                 N'Diretrizes e Documentos Oficiais',                       N'card',      10),

  -- Tabela de Tarifas
  (N'tarifas',    N'vigente',               N'Tabela de Tarifas',                                      N'list',      10),

  -- Assembleias
  (N'assembleia', N'documentos',            N'Documentos de Assembleia',                               N'list',      10)
) AS s (Module, Slug, Title, UiType, SortOrder)
ON t.Module = s.Module AND t.Slug = s.Slug
WHEN NOT MATCHED THEN
  INSERT (Module, Slug, Title, UiType, SortOrder, IsActive)
  VALUES (s.Module, s.Slug, s.Title, s.UiType, s.SortOrder, 1);
GO
