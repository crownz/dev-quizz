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

export function updateAnswer(name, id, value, valid) {
  const question = progress[name].find(questions => questions.id === id);
  question.selected = value;
  question.valid = valid;
  return Object.assign({}, question);
}

export function calculateResult(name) {
  let total = 0;
  let correct = 0;
  const questions = getQuestions();
  const answers = progress[name] || [];
  answers.forEach(answer => {
    total++;
    const correctAnswer = questions.find(q => q.id === answer.id).answer;
    correct = checkIfCorrect(answer, correctAnswer) ? correct + 1 : correct;
  });

  return { total, correct };
}

function checkIfCorrect(answer, correctAnswer) {
  const { type, valid, selected } = answer;

  if (type === 'code') {
    return valid && selected.includes(correctAnswer);
  } else if (type === 'variants') {
    return selected === correctAnswer;
  }

  return false;
}
