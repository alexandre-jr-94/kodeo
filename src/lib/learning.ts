export const gamification = { questionXP: 10, lessonXP: 50, levelStart: 1000, nextLevel: 1500, initialXP: 1240 };
export const courses = [
  { id: 'javascript', title: 'Fundamentos de JavaScript', category: 'Programação', description: 'Dê vida às suas ideias, uma linha de código por vez.', progress: 42, completed: 5, total: 12, icon: 'code', tag: 'Em andamento', color: 'blue' },
  { id: 'security', title: 'Introdução à cibersegurança', category: 'Cibersegurança', description: 'Entenda as ameaças. Aprenda a construir defesas.', progress: 0, completed: 0, total: 10, icon: 'shield', tag: 'Para explorar', color: 'purple' },
  { id: 'logic', title: 'Lógica de programação', category: 'Programação', description: 'Construa uma base sólida para resolver problemas.', progress: 100, completed: 8, total: 8, icon: 'terminal', tag: 'Concluído', color: 'green' },
] as const;
