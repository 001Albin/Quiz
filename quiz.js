const startBtn = document.querySelector(`.start-btn`);
const popupInfo = document.querySelector(`.popup-info`);
const exitBtn = document.querySelector(`.exit-btn`);
const main = document.querySelector(`.main`);
const continueBtn = document.querySelector(`.continue-btn`);
const quizSection = document.querySelector(`.Quiz-section`);
const quizBox = document.querySelector(`.quiz-box`);
const resultBox = document.querySelector(`.result-box`);
const tryAgainBtn = document.querySelector(`.tryAgain-btn`);
const goHomeBtn = document.querySelector(`.goHome-btn`);
const nextBtn = document.querySelector(`.next-btn`);
const optionList = document.querySelector(`.option-list`);

let questions = [
  {
    numb: 1,
    question: "Which of the following is a JavaScript framework?",
    answer: "c. React",
    options: [
      `a. Laravel`,
      `b. Django`,
      `c. React`,
      `d. Ruby on Rails`,
    ],
  },
  {
    numb: 2,
    question: "What is the correct syntax for referring to an external JavaScript file?",
    answer: "b. <script src='filename.js'></script>",
    options: [
      `a. <script href='filename.js'></script>`,
      `b. <script src='filename.js'></script>`,
      `c. <script link='filename.js'></script>`,
      `d. <script name='filename.js'></script>`,
    ],
  },
  {
    numb: 3,
    question: "Which data structure uses LIFO (Last In, First Out)?",
    answer: "d. Stack",
    options: [
      `a. Queue`,
      `b. Tree`,
      `c. Graph`,
      `d. Stack`,
    ],
  },
  {
    numb: 4,
    question: "What is the time complexity of binary search?",
    answer: "c. O(log n)",
    options: [
      `a. O(n)`,
      `b. O(n^2)`,
      `c. O(log n)`,
      `d. O(1)`,
    ],
  },
  {
    numb: 5,
    question: "Which of the following is not a primitive data type in JavaScript?",
    answer: "d. Object",
    options: [
      `a. String`,
      `b. Boolean`,
      `c. Number`,
      `d. Object`,
    ],
  },
  {
    numb: 6,
    question: "Which method is used to add an element to the end of an array in JavaScript?",
    answer: "a. push()",
    options: [
      `a. push()`,
      `b. pop()`,
      `c. shift()`,
      `d. unshift()`,
    ],
  },
  {
    numb: 7,
    question: "What is the output of the following code: console.log(1 + '1');",
    answer: "c. '11'",
    options: [
      `a. 2`,
      `b. NaN`,
      `c. '11'`,
      `d. SyntaxError`,
    ],
  },
  {
    numb: 8,
    question: "Which of the following is used for error handling in JavaScript?",
    answer: "b. try...catch",
    options: [
      `a. if...else`,
      `b. try...catch`,
      `c. for...loop`,
      `d. while...loop`,
    ],
  },
  {
    numb: 9,
    question: "What is the purpose of the 'this' keyword in JavaScript?",
    answer: "c. It refers to the object from which it was called",
    options: [
      `a. It refers to the global object`,
      `b. It refers to a local variable`,
      `c. It refers to the object from which it was called`,
      `d. It refers to a class`,
    ],
  },
  {
    numb: 10,
    question: "Which HTML attribute is used to reference a JavaScript file?",
    answer: "b. src",
    options: [
      `a. href`,
      `b. src`,
      `c. rel`,
      `d. link`,
    ],
  },
];


let questionCount = 0;
let questionNumb = 1;
let userScore = 0;

// Function Definitions
startBtn.onclick = () => {
  popupInfo.classList.add(`active`);
  main.classList.add(`active`);
};

exitBtn.onclick = () => {
  popupInfo.classList.remove(`active`);
  main.classList.remove(`active`);
};

continueBtn.onclick = () => {
  quizSection.classList.add(`active`);
  popupInfo.classList.remove(`active`);
  main.classList.remove(`active`);
  quizBox.classList.add(`active`);
  showQuestiions(0);
  questionCounter(1);
  headerScore();
};

tryAgainBtn.onclick = () => {
  quizBox.classList.add(`active`);
  resultBox.classList.remove(`active`);
  nextBtn.classList.remove(`active`);
  questionCount = 0;
  questionNumb = 1;
  userScore = 0;

  showQuestiions(questionCount);
  questionCounter(questionNumb);
  headerScore();
};

goHomeBtn.onclick = () => {
  quizSection.classList.remove(`active`);
  resultBox.classList.remove(`active`);
  nextBtn.classList.remove(`active`);
  questionCount = 0;
  questionNumb = 1;
  userScore = 0;
};

nextBtn.onclick = () => {
  if (questionCount < questions.length - 1) {
    questionCount++;
    showQuestiions(questionCount);
    questionNumb++;
    questionCounter(questionNumb);
    nextBtn.classList.remove(`active`);
  } else {
    showResultBox();
  }
};

function showQuestiions(index) {
  const questionText = document.querySelector(`.question-text`);
  questionText.textContent = `${questions[index].numb}. ${questions[index].question}`;
  let optionTag = questions[index].options.map(option => 
    `<div class="option"><span>${option}</span></div>`
  ).join('');
  
  optionList.innerHTML = optionTag;

  const option = document.querySelectorAll(`.option`);
  for (let i = 0; i < option.length; i++) {
    option[i].setAttribute(`onclick`, `optionSelected(this)`);
  }
}

function optionSelected(answer) {
  let userAnswer = answer.textContent;
  let correctAnswer = questions[questionCount].answer;
  let allOptions = optionList.children.length;
  
  if (userAnswer === correctAnswer) {
    answer.classList.add(`correct`);
    userScore++;
    headerScore();
  } else {
    answer.classList.add(`incorrect`);

    // Correct option
    for (let i = 0; i < allOptions; i++) {
      if (optionList.children[i].textContent === correctAnswer) {
        optionList.children[i].setAttribute(`class`, `option correct`);
      }
    }
  }

  // To choose only one option
  for (let i = 0; i < allOptions; i++) {
    optionList.children[i].classList.add(`disabled`);
  }
  nextBtn.classList.add(`active`);
}

function questionCounter(index) {
  const questionTotal = document.querySelector(`.question-total`);
  questionTotal.textContent = `${index} of ${questions.length} questions`;
}

function headerScore() {
  const headerScoreText = document.querySelector(`.header-score`);
  headerScoreText.textContent = `Score: ${userScore} / ${questions.length}`;
}

function showResultBox() {
  quizBox.classList.remove(`active`);
  resultBox.classList.add(`active`);

  const scoreText = document.querySelector(`.score-text`);
  scoreText.textContent = `Your Score is ${userScore} out of ${questions.length}`;

  const circularProgress = document.querySelector(`.circular-progress`);
  const progressValue = document.querySelector(`.progress-value`);

  let progressStartVal = -1;
  let progressEndVal = Math.floor((userScore / questions.length) * 100);
  let speed = 20;

  let progress = setInterval(() => {
    progressStartVal++;
    progressValue.textContent = `${progressStartVal}%`;
    circularProgress.style.background = `conic-gradient(#0d33ee ${progressStartVal * 3.6}deg, rgba(255, 255, 255, .1) 0deg)`;

    if (progressStartVal === progressEndVal) {
      clearInterval(progress);
    }
  }, speed);
}
