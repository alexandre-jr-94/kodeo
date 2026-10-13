# Fase 1 — interface com dados simulados

Escopo: uma experiência completa de aprendizagem na lição de variáveis. As seis trilhas demonstram a jornada; somente a lição de variáveis possui atividades completas. Supabase, login e persistência entre sessões pertencem às fases 2 e 3.

## Critérios de aceitação

| Prioridade | Entrega | Evidência |
| --- | --- | --- |
| P0 | Dashboard → trilha → lição → resposta → explicação → XP → conclusão | Teste E2E de fluxo completo em desktop e mobile |
| P0 | Explorar abre cibersegurança mesmo após escolher outra trilha | Dois cenários do PR #1, executados em desktop e mobile |
| P0 | Erros não concedem XP; cinco acertos + conclusão concedem 100 XP | Testes unitários e E2E; revisão continua com 1.340 XP totais |
| P0 | Sair e retomar preserva rascunhos e tentativas na mesma sessão | E2E de histórico, retorno e editor |
| P0 | Desktop, mobile e navegação por teclado | E2E em 1440 × 1000 e 390 × 844; menu e questão também em 320 × 740 |
| P1 | Dashboard, cartões e mapa exibem o mesmo progresso | `src/lib/progress.ts`, teste unitário e E2E: 6/12, 50%, 14 lições |
| P1 | Níveis e barra usam limites centralizados | Testes dos limites 1.499/1.500 XP e último nível da prévia |
| P1 | Estados aplicáveis orientam o aluno | Resposta vazia bloqueada, erros de sintaxe/critérios, dicas, etapas bloqueadas e conteúdos em preparação |
| P1 | Limites da demonstração ficam visíveis | Aviso de que recarregar reinicia XP/progresso; ajuda da lição e resumos das etapas |
| P1 | Verificações técnicas e registro | TypeScript, testes unitários, build e testes de navegador |

## Verificação em 13/10/2026

- TypeScript: aprovado.
- Testes unitários: 19 aprovados.
- Build de produção: aprovado.
- Navegador: 13 cenários aprovados; um cenário exclusivo de mobile omitido no projeto desktop. Nenhuma falha. Chromium 153 com executável local; testes contra build de produção.
- Inspeção visual: dashboard em 1440, 390 e 320 px; questão em 320 px.
- Não houve teste com participantes: os testes de usabilidade com 3–5 pessoas continuam na fase 5.

A suíte de navegador verifica alternativas com teclado, feedback com foco, erros e acertos, história de navegação, rascunho de código, desfazer, conclusão, conquista, desbloqueio, revisão, tema com armazenamento indisponível e comportamento após recarregar. O cenário exclusivo do menu mobile é omitido no projeto desktop.

## Revisão do PR #1

A mudança funcional direciona uma ação para a trilha `security`; também adiciona Playwright, configuração, lockfile e testes. O diff foi revisado antes da integração. Não foram identificados execução de entrada do aluno, acesso a credenciais, destinos externos de navegação ou scripts de instalação adicionais na alteração. Os testes originalmente pendentes foram executados junto à suíte da fase 1. Isso não constitui uma auditoria de segurança de toda a aplicação ou de suas dependências.

O PR é incorporado preservando seu commit como pai do commit de conclusão desta fase.

## Limitações intencionais

- Sem login, banco ou dados privados de usuários.
- XP, respostas corretas e desbloqueios são demonstrações locais; não são controles confiáveis de servidor.
- Rascunhos, tentativas e recompensas permanecem enquanto a aplicação está aberta; recarregar reinicia a demonstração.
- O tema é salvo quando o navegador permite armazenamento; bloquear armazenamento não impede estudar ou mudar o tema.
- Perfil, sequência semanal e conquistas iniciais são simulados.
- Não há operações de rede para respostas, portanto não são criados carregamentos artificiais. Loading e erros de conexão entram com a integração de dados.
- Os exercícios de código analisam sintaxe e critérios via Acorn; não executam programas.

## Próxima fase

Criar o projeto Supabase, definir tabelas e relacionamentos, integrar Auth e configurar RLS. Depois migrar tentativas, progresso, conquistas e eventos de XP, validando respostas e recompensas no servidor.
