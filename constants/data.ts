export const mockQuestions: Question[] = [
  {
    id: 1,
    question: "What is the primary purpose of React?",
    answer_type: "choice",
    choices: [
      {
        id: 0,
        is_correct: true,
        text: "A library for building user interfaces",
      },
      {
        id: 1,
        is_correct: false,
        text: "A programming language",
      },
      {
        id: 2,
        is_correct: false,
        text: "A database management system",
      },
      {
        id: 3,
        is_correct: false,
        text: "An operating system",
      },
    ],
  },
  {
    id: 2,
    question:
      "Which of these are JavaScript frameworks? (Select all that apply)",
    answer_type: "choice",
    choices: [
      {
        id: 0,
        is_correct: true,
        text: "React",
      },
      {
        id: 1,
        is_correct: true,
        text: "Vue",
      },
      {
        id: 2,
        is_correct: false,
        text: "Django",
      },
      {
        id: 3,
        is_correct: true,
        text: "Angular",
      },
    ],
  },
  {
    id: 3,
    question: "TypeScript is a superset of JavaScript.",
    answer_type: "true-false",
    // Note: For true-false questions, we don't need choices array
    // The UI will automatically show True/False buttons
  },
  {
    id: 4,
    question: "Explain the concept of virtual DOM in your own words.",
    answer_type: "text",
    // Text questions don't need choices
  },
  {
    id: 5,
    question: "What are hooks in React?",
    answer_type: "choice",
    choices: [
      {
        id: 0,
        is_correct: true,
        text: "Functions that let you use state and other React features",
      },
      {
        id: 1,
        is_correct: false,
        text: "Special HTML elements",
      },
      {
        id: 2,
        is_correct: false,
        text: "CSS styling components",
      },
      {
        id: 3,
        is_correct: false,
        text: "Database connection tools",
      },
    ],
  },
];
