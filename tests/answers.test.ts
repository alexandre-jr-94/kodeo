import { test } from 'node:test';
import assert from 'node:assert/strict';
import { evaluateAnswer } from '../src/lib/answer-validation';
import { lesson } from '../src/lib/lesson';
import { initialLessonState, lessonReducer, lessonXP } from '../src/lib/lesson-session';
import type { LessonState } from '../src/lib/lesson-session';
const at = '2026-10-13T03:00:00Z';
const points = lesson.questions[3];
const profile = lesson.questions[4];

test('analisa sintaxe real e aceita formas equivalentes de reatribuição', () => {
  for (const answer of ['let pontos = 10; pontos = pontos + 5;', 'let pontos=10\npontos += 5', '/* início */ let pontos = 0xa; pontos = 5 + pontos;', 'let pontos = (10); pontos = (pontos + 5);']) assert.equal(evaluateAnswer(points, answer).correct, true, answer);
});
test('rejeita respostas que apenas imitam código nos comentários ou em strings', () => {
  assert.equal(evaluateAnswer(points, '// let pontos = 10; pontos += 5;').kind, 'empty');
  assert.equal(evaluateAnswer(points, '"let pontos = 10; pontos += 5;";').correct, false);
  assert.equal(evaluateAnswer(points, 'let pontos = 10; pontos = 15;').correct, false);
  assert.equal(evaluateAnswer(points, 'const pontos = 10; pontos += 5;').correct, false);
  assert.equal(evaluateAnswer(points, 'let pontos = 10; pontos += 6;').correct, false);
});
test('retorna feedback de sintaxe e impede instruções fora do escopo', () => {
  assert.equal(evaluateAnswer(points, 'let pontos = ;').kind, 'syntax');
  assert.equal(evaluateAnswer(points, 'let pontos = 10; fetch("https://example.com"); pontos += 5;').kind, 'unsupported');
  assert.equal(evaluateAnswer(points, 'while(true) {}').kind, 'unsupported');
  assert.equal(evaluateAnswer(points, 'let pontos = 10; pontos += 5; pontos += 5;').correct, false);
});
test('distingue strings e booleanos sem executar expressões ou chamadas', () => {
  for (const answer of ['const nome="Kodeo"; const ativo=true;', "const ativo = true; const nome = 'Kodeo';", 'const nome = "Kodeo", ativo = true;']) assert.equal(evaluateAnswer(profile, answer).correct, true);
  assert.equal(evaluateAnswer(profile, 'const nome="Kodeo"; const ativo="true";').correct, false);
  assert.equal(evaluateAnswer(profile, 'const nome="Kodeo"; const ativo=Boolean(1);').correct, false);
  assert.equal(evaluateAnswer(profile, 'let nome="Kodeo"; const ativo=true;').correct, false);
});
test('valida respostas escritas, vazio e limite de tamanho', () => {
  assert.equal(evaluateAnswer(lesson.questions[2], '  BOOLEANO. ').correct, true);
  assert.equal(evaluateAnswer(lesson.questions[2], 'string').correct, false);
  assert.equal(evaluateAnswer(lesson.questions[0], '').kind, 'empty');
  assert.equal(evaluateAnswer(points, ' '.repeat(2001) + 'x').kind, 'too-long');
});
test('impede avanço sem acerto e não concede XP por erro ou envio duplicado', () => {
  let state = lessonReducer(initialLessonState(), {type:'start'});
  assert.equal(lessonReducer(state, {type:'next',at}).index, 0);
  state = lessonReducer(state, {type:'draft',questionId:'declarations',answer:'0'});
  state = lessonReducer(state, {type:'submit',questionId:'declarations',submittedAt:at});
  assert.equal(lessonXP(state), 0);
  assert.equal(state.attempts[0].correct, false);
  assert.equal(lessonReducer(state, {type:'submit',questionId:'declarations',submittedAt:at}).attempts.length, 1);
  state = lessonReducer(state, {type:'draft',questionId:'declarations',answer:'1'});
  state = lessonReducer(state, {type:'submit',questionId:'declarations',submittedAt:at});
  const duplicate = lessonReducer(state, {type:'submit',questionId:'declarations',submittedAt:at});
  assert.equal(lessonXP(duplicate), 10);
  assert.equal(duplicate.attempts.length, 2);
  assert.equal(duplicate.attempts[1].number, 2);
});
function complete(state: LessonState): LessonState {
  const answers = ['1', '1', 'booleano', 'let pontos=10;pontos+=5;', 'const nome="Kodeo";const ativo=true;'];
  state = lessonReducer(state,{type:'start'});
  for (let index = 0; index < lesson.questions.length; index++) {
    const questionId = lesson.questions[index].id;
    state=lessonReducer(state,{type:'draft',questionId,answer:answers[index]});
    state=lessonReducer(state,{type:'submit',questionId,submittedAt:at});
    state=lessonReducer(state,{type:'next',at});
  }
  return state;
}
test('conclusão e revisão mantêm recompensas idempotentes e registram tentativas', () => {
  const completed = complete(initialLessonState());
  assert.equal(completed.completed,true);
  assert.equal(completed.phase,'summary');
  assert.equal(lessonXP(completed),100);
  assert.equal(completed.xpEvents.length,6);
  const replayed = complete(lessonReducer(completed,{type:'review'}));
  assert.equal(lessonXP(replayed),100);
  assert.equal(replayed.attempts.length,10);
  assert.equal(replayed.attempts.slice(5).every(attempt=>attempt.review && attempt.xpAwarded===0),true);
  assert.equal(lessonReducer(replayed,{type:'next',at}).xpEvents.length,6);
});
test('rascunhos, respostas e tentativas permanecem ao retomar a sessão', () => {
  let state=lessonReducer(initialLessonState(),{type:'start'});
  state=lessonReducer(state,{type:'draft',questionId:'declarations',answer:'0'});
  state=lessonReducer(state,{type:'submit',questionId:'declarations',submittedAt:at});
  const resumed=lessonReducer(state,{type:'start'});
  assert.equal(resumed.drafts.declarations,'0');
  assert.equal(resumed.attempts.length,1);
  assert.equal(resumed.results.declarations?.correct,false);
  assert.equal(lessonReducer(resumed,{type:'submit',questionId:'profile',submittedAt:at}).attempts.length,1);
});

test('voltar a uma questão mantém sua resposta e não duplica recompensas', () => {
  let state=lessonReducer(initialLessonState(),{type:'start'});
  assert.equal(lessonReducer(state,{type:'previous'}).index,0);
  state=lessonReducer(state,{type:'draft',questionId:'declarations',answer:'1'});
  state=lessonReducer(state,{type:'submit',questionId:'declarations',submittedAt:at});
  state=lessonReducer(state,{type:'next',at});
  state=lessonReducer(state,{type:'previous'});
  assert.equal(state.index,0);
  assert.equal(state.drafts.declarations,'1');
  assert.equal(state.results.declarations?.correct,true);
  assert.equal(lessonXP(lessonReducer(state,{type:'submit',questionId:'declarations',submittedAt:at})),10);
  assert.equal(lessonReducer(state,{type:'next',at}).index,1);
});
