
export function getQuestions() {
  return [
    {
      id: 'q0',
      label: 'Enter valid html containing title: Developer quizz',
      type: 'code',
      selected: '',
      answer: 'Developer quizz'
    },
    {
      id: 'q1',
      label: 'A programmer is to a computer as a teacher is to:',
      type: 'variants',
      variants: [
        {
          label: 'A desk',
          value: 'desk'
        },
        {
          label: 'A student',
          value: 'student'
        },
        {
          label: 'A library',
          value: 'library'
        },
        {
          label: 'A principal',
          value: 'principal'
        }
      ],
      selected: '',
      answer: 'student'
    },
    {
      id: 'q2',
      label: 'Imagine a car as a computer, and its engine as a program. Which of the following is an input for the engine program?',
      type: 'variants',
      variants: [
        {
          label: 'The gas pedal',
          value: 'pedal'
        },
        {
          label: 'The driver\'s seat',
          value: 'seat'
        },
        {
          label: 'The steering wheel',
          value: 'wheel'
        },
        {
          label: 'The windshield wipers',
          value: 'wipers'
        }
      ],
      selected: '',
      answer: 'pedal'
    },
    {
      id: 'q3',
      label: 'A good algorithm must be:',
      type: 'variants',
      variants: [
        {
          label: 'Detailed',
          value: 'detailed'
        },
        {
          label: 'Replaceable',
          value: 'replaceable'
        },
        {
          label: 'Simple',
          value: 'simple'
        },
        {
          label: 'Open-ended',
          value: 'open-ended'
        }
      ],
      selected: '',
      answer: 'detailed'
    }
  ];
}
