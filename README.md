# Kodeo

Protótipo de uma plataforma de aprendizado gamificado de programação e cibersegurança.

## Executar localmente

Requisitos: Node.js 20.9 ou superior e pnpm.

```sh
pnpm install
pnpm dev
```

Abra http://localhost:3000.

```sh
pnpm typecheck
pnpm test
pnpm build
```

## Primeira etapa

Dashboard sem login, com perfil demonstrativo, tarefas, trilhas, XP, níveis, sequência de estudos e conquistas. Inclui modos claro e escuro com preferência salva no navegador e uma lição interativa de JavaScript com três questões e explicações.

Os dados são simulados. XP e progresso vivem apenas na sessão e reiniciam ao recarregar a página. Recompensas de questões e conclusão não são duplicadas na mesma sessão. As trilhas de cibersegurança e lógica apresentam informações demonstrativas; seus conteúdos serão implementados posteriormente.

## Mapa de trilhas

Acesse `/trilhas` ou selecione Minhas trilhas no menu. São seis trilhas demonstrativas, com filtros por status, seleção em blocos, caminho pontilhado em formato de tabuleiro e visualização alternativa em lista.

As etapas concluídas, atuais e bloqueadas têm rótulos e ícones. Etapas bloqueadas continuam selecionáveis para explicar todos os requisitos: etapa anterior, nível, XP acumulado e/ou conclusão de outra trilha. XP não é gasto. A lição de variáveis é a atividade interativa disponível nesta etapa; sua conclusão libera Operadores no mapa. Os outros conteúdos apresentam resumos e informam que a atividade interativa será adicionada posteriormente.

As regras estão centralizadas em `src/lib/trails.ts`. Os testes cobrem limites de nível/XP, requisitos combinados, prevenção de saltos no percurso e atualização após concluir a lição.

## Organização

- `src/app`: layout, rotas do dashboard e das trilhas e estilos globais.
- `src/components/KodeoApp.tsx`: interface compartilhada e estado da sessão.
- `src/components/TrailExplorer.tsx`: biblioteca, tabuleiro, lista e detalhes de etapas.
- `src/lib/trails.ts`: percursos e regras de acesso.
- `src/components/theme.tsx`: tema Material UI nos dois modos.
- `src/lib/learning.ts`: cursos, questões e configuração inicial de recompensas.

Base cromática: `hsl(210 60% 20%)`, com superfícies neutras e azuis mais claros para o tema escuro.

Stack: Next.js App Router, React, TypeScript, Material UI e Lucide.

## Próximas etapas

Separar os componentes do dashboard conforme o fluxo crescer; expandir as lições e a jornada; integrar Supabase Auth, PostgreSQL e RLS. Após a integração, validar XP, respostas e progresso no servidor. Nenhuma credencial do Supabase é necessária nesta etapa.
