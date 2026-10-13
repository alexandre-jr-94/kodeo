import { test } from 'node:test';
import assert from 'node:assert/strict';
import { initialLessonState, lessonReducer } from '../src/lib/lesson-session';
import { learnerProgress, levelProgress, totalCompleted, trailProgress } from '../src/lib/progress';
import { trails } from '../src/lib/trails';
import { lesson } from '../src/lib/lesson';

const javascript = trails.find(trail => trail.id === 'javascript')!;
test('nível e barra mudam juntos nos limites, sem XP restante negativo', () => {
  assert.deepEqual(levelProgress(1499), { level: 5, next: 1500, remaining: 1, percent: 99.8 });
  assert.deepEqual(levelProgress(1500), { level: 6, next: 2100, remaining: 600, percent: 0 });
  assert.deepEqual(levelProgress(3000), { level: 8, next: null, remaining: 0, percent: 100 });
  assert.equal(levelProgress(-10).percent, 0);
});
test('dashboard e mapa derivam a mesma contagem antes e depois da lição', () => {
  let state = initialLessonState();
  assert.deepEqual(trailProgress(javascript, learnerProgress(state)), { completed: 5, total: 12, percent: 42 });
  assert.equal(totalCompleted(learnerProgress(state)), 13);
  state = lessonReducer(state, { type: 'start' });
  const answers = ['1', '1', 'booleano', 'let pontos=10;pontos+=5;', 'const nome="Kodeo";const ativo=true;'];
  const at = '2026-10-13T12:00:00Z';
  for (const [index, question] of lesson.questions.entries()) {
    state = lessonReducer(state, { type: 'draft', questionId: question.id, answer: answers[index] });
    state = lessonReducer(state, { type: 'submit', questionId: question.id, submittedAt: at });
    if (index === 0) {
      assert.equal(learnerProgress(state).xp, 1250);
      assert.equal(trailProgress(javascript, learnerProgress(state)).completed, 5);
    }
    state = lessonReducer(state, { type: 'next', at });
  }
  assert.equal(learnerProgress(state).xp, 1340);
  assert.deepEqual(trailProgress(javascript, learnerProgress(state)), { completed: 6, total: 12, percent: 50 });
  assert.equal(totalCompleted(learnerProgress(state)), 14);
  assert.deepEqual(learnerProgress(lessonReducer(state, { type: 'review' })), learnerProgress(state));
});
