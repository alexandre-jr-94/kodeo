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
pnpm build
```

## Primeira etapa

Dashboard sem login, com perfil demonstrativo, tarefas, trilhas, XP, níveis, sequência de estudos e conquistas. Inclui modos claro e escuro com preferência salva no navegador e uma lição interativa de JavaScript com três questões e explicações.

Os dados são simulados. XP e progresso vivem apenas na sessão e reiniciam ao recarregar a página. Recompensas de questões e conclusão não são duplicadas na mesma sessão. As trilhas de cibersegurança e lógica apresentam informações demonstrativas; seus conteúdos serão implementados posteriormente.

## Organização

- `src/app`: layout, dashboard e estilos responsivos.
- `src/components/theme.tsx`: tema Material UI nos dois modos.
- `src/lib/learning.ts`: cursos, questões e configuração inicial de recompensas.

Base cromática: `hsl(210 60% 20%)`, com superfícies neutras e azuis mais claros para o tema escuro.

Stack: Next.js App Router, React, TypeScript, Material UI e Lucide.

## Próximas etapas

Separar os componentes do dashboard conforme o fluxo crescer; expandir as lições e a jornada; integrar Supabase Auth, PostgreSQL e RLS. Após a integração, validar XP, respostas e progresso no servidor. Nenhuma credencial do Supabase é necessária nesta etapa.
