import { getQuestions } from './mock-data';

const progress = { };

export function getProgressIfExists(name) {
  let result = progress[name];
  if (!result) {
    result = getQuestions();
    result.forEach(question => delete question.answer);
    progress[name] = result.slice();
  }

  return result;
}

export function updateAnswer(name, id, value) {
  const question = progress[name].find(questions => questions.id === id);
  question.selected = value;
  return Object.assign({}, question);
}
