import { test } from 'node:test';
import assert from 'node:assert/strict';
import { accessReasons, completedCount, getLevel, stepReasons, stepStatus, trails, trailStatus } from '../src/lib/trails';
import type { LearnerProgress, TrailId } from '../src/lib/trails';
const find = (id: TrailId) => trails.find(trail => trail.id === id)!;
const learner = (xp = 1240, completed: LearnerProgress['completed'] = {}): LearnerProgress => ({ xp, completed });

test('níveis respeitam os limites de XP', () => {
  assert.equal(getLevel(999), 4);
  assert.equal(getLevel(1000), 5);
  assert.equal(getLevel(1499), 5);
  assert.equal(getLevel(1500), 6);
  assert.equal(getLevel(2100), 7);
});
test('o perfil inicial distingue trilhas atuais, disponíveis, concluídas e bloqueadas', () => {
  assert.equal(trailStatus(find('javascript'), learner()), 'current');
  assert.equal(trailStatus(find('security'), learner()), 'available');
  assert.equal(trailStatus(find('logic'), learner()), 'completed');
  assert.equal(trailStatus(find('web'), learner()), 'locked');
  assert.equal(trailStatus(find('defense'), learner()), 'locked');
});
test('requisitos de nível e XP desbloqueiam exatamente no limite sem gastar XP', () => {
  assert.equal(trailStatus(find('web'), learner(1499)), 'locked');
  assert.equal(trailStatus(find('web'), learner(1500)), 'available');
  assert.equal(trailStatus(find('defense'), learner(1799)), 'locked');
  const progress = learner(1800);
  assert.equal(trailStatus(find('defense'), progress), 'available');
  assert.equal(progress.xp, 1800);
});
test('todos os requisitos de uma trilha devem ser atendidos', () => {
  const requirements = find('pentest').requirements;
  assert.equal(accessReasons(requirements, learner()).length, 3);
  assert.equal(accessReasons(requirements, learner(2300)).length, 1);
  assert.equal(trailStatus(find('pentest'), learner(2300, { security: 10 })), 'available');
  assert.equal(trailStatus(find('pentest'), learner(2299, { security: 10 })), 'locked');
});
test('XP suficiente não permite pular etapas anteriores', () => {
  assert.equal(stepStatus(find('javascript'), 5, learner(3000)), 'current');
  assert.equal(stepStatus(find('javascript'), 6, learner(3000)), 'locked');
  assert.match(stepReasons(find('javascript'), 6, learner(3000))[0], /etapa anterior/);
});
test('concluir variáveis atualiza o mapa e libera operadores', () => {
  const progress = learner(1320, { javascript: 6 });
  assert.equal(completedCount(find('javascript'), progress), 6);
  assert.equal(stepStatus(find('javascript'), 5, progress), 'completed');
  assert.equal(stepStatus(find('javascript'), 6, progress), 'current');
  assert.equal(stepStatus(find('javascript'), 7, progress), 'locked');
});
test('o requisito de nível ainda bloqueia a próxima lição após concluir sua predecessora', () => {
  assert.equal(stepStatus(find('javascript'), 8, learner(1499, { javascript: 8 })), 'locked');
  assert.equal(stepStatus(find('javascript'), 8, learner(1500, { javascript: 8 })), 'current');
});
test('as lições de uma trilha bloqueada mostram o requisito da própria trilha', () => {
  assert.equal(stepStatus(find('web'), 0, learner()), 'locked');
  assert.match(stepReasons(find('web'), 0, learner())[0], /nível 6/);
  assert.equal(stepStatus(find('logic'), 7, learner()), 'completed');
});
