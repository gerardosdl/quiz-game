/*----- constants -----*/
const maxScore = 10;

/*----- state variables -----*/
let questions;
let questionIdx;
let score;
let elapsedTime;
let isTicking;

// 1) Initialize all state, then call render().
// 2) render() will render one of the following:
//   2.1) When questionIdx is < questions.length, render the 
//        current question and its list of possible answers
//   2.2) When questionIdx === questions.length, quiz is done
//        so render a message based upon
//        the results state:
//        "You are done! Your score is ${score}!"
//   2.3) If score >= maxScore, render message:
//         "Outstanding! You've got the max score!"
// 3) When a player clicks their answer to a question:
//   3.1) Update the current question object's answer to the
//        index of the answer.
//   3.2) Call render().  Since an answer has been selected, render their
//        selected answer differently (different styling).
// 4) When a player clicks the "Submit" button:
//   4.1) Increment questionIdx
//   4.2) If questionIdx === questions.length, all questions have been 
//        answered - so update the results state
//   4.3) Call render()
// 5) Render score board in order to show current score. 
// 6) 6) Set timer countdown to decrease by 1 second and update display. 


/*----- cached elements  -----*/
const questionEl = document.querySelector(".question");
const answerEls = document.querySelectorAll(".answer");
const messageEl = document.querySelector("h3");
const scoreEl = document.querySelector("#score");
const timeEl = document.querySelector("#timer");
const gameBtns = document.querySelectorAll(".answer, #submit")
/*----- event listeners -----*/
document.querySelector(".answers").addEventListener("click", handleAnswer);
document.querySelector("#submit").addEventListener("click", handleSubmit);
document.querySelector("#restart").addEventListener("click", init);
/*----- functions -----*/
init();


function init() {

  questions = [
    {
      question: "What has a head, a tail, is brown, and has no legs?",
      answers: ["A worm", "A snake", "A penny", "A dog toy"],
      rightAnswer: 2,
      chosenAnswer: null
    },
    {
      question: "I have a little house in which I live all alone. It has no doors or windows, and if I want to go out I must break through the wall. What am I? ",
      answers: ["A peanut", "A seed", "An egg", "A seashell"],
      rightAnswer: 2,
      chosenAnswer: null
    },
    {
      question: "The more you take, the more you leave behind. What am I?",
      answers: ["Sand", "Footsteps", "Time", "Memories"],
      rightAnswer: 1,
      chosenAnswer: null
    },
    {
      question: "I have no mouth, so I cannot lie. I see the truth, without use of eyes. If you feel ready, then think carefully: What is it you see, when you look at me?",
      answers: ["A dream", "A memory", "A painting", "A mirror"],
      rightAnswer: 3,
      chosenAnswer: null
    },
    {
      question: "I am not your boss but I guide your decisions, I am not your trainer, but I dictate your pace, I am not a Judge but I measure your success. Who am I?",
      answers: ["A goal", " A coach", "A clock", "A leader"],
      rightAnswer: 0,
      chosenAnswer: null
    },
    {
      question: "I have a single waving hand I'm present in places across the land. On fairer days, I depart I shorten with a broken heart. What am I?",
      answers: ["A leaf", "A kite", "A windsock", " A flag"],
      rightAnswer: 3,
      chosenAnswer: null
    },
    {
      question: "What 8 letter word can have a letter taken away and it still makes a word. Take another letter away and it still makes a word. Keep on doing that until you have one letter left. What is the word?",
      answers: ["Smashing", "Starting", "Standing", "Shooting"],
      rightAnswer: 1,
      chosenAnswer: null
    },
    {
      question: "What runs, but never walks. Murmurs, but never talks. Has a bed, but never sleeps. And has a mouth, but never eats?",
      answers: ["A breeze", "A clock", "A road", "A river"],
      rightAnswer: 3,
      chosenAnswer: null
    },
    {
      question: "Until I am measured, I am not known. Yet how you miss me when I have flown. What am I?",
      answers: ["Sound", "Light", "Time", "Wind"],
      rightAnswer: 2,
      chosenAnswer: null
    },
    {
      question: "Which month has 28 days?",
      answers: ["Only February", "February and March", "Every month", "None of the above"],
      rightAnswer: 2,
      chosenAnswer: null
    },
  ];
  // riddle questions's sources: https://www.riddles.com/ https://www.rd.com/article/riddles-for-adults/
  questionIdx = 0;
  score = 0;
  messageEl.textContent = ""; //delete message after restart button is pressed
  elapsedTime = 300;
  isTicking = true;
  render();
}

function handleAnswer(evt) {
  if (evt.target.id === "first") {
    questions[questionIdx].chosenAnswer = 0;
  } else if (evt.target.id === "second") {
    questions[questionIdx].chosenAnswer = 1;
  } else if (evt.target.id === "third") {
    questions[questionIdx].chosenAnswer = 2;
  } else if (evt.target.id === "fourth") {
    questions[questionIdx].chosenAnswer = 3;
  }
  render();
}
// 3) When a player clicks their answer to a question:
//   3.1) Update the current question object's answer to the
//        index of the answer.



function handleSubmit(evt) {
  if (!isTicking) return;

  if (questions[questionIdx].chosenAnswer === questions[questionIdx].rightAnswer) {
    score = score + 1;
  }
  questionIdx = questionIdx + 1;
  if (questionIdx >= questions.length) isTicking = false;

  render();
}
// 4) When a player clicks the "Submit" button:
//   4.1) Increment questionIdx
//   4.2) If questionIdx === questions.length, all questions have been 
//        answered - so update the results state
//   4.3) Call render()

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return `${mins}:${sec}`;// elapsed time to display as mm:ss 
}
// source: https://stackoverflow.com/questions/1322732/convert-seconds-to-hh-mm-ss-with-javascript

setInterval(() => {
  if (!isTicking && score <= 3) return timeEl.textContent = `Nice attempt!`;
  else if (!isTicking && score > 3) return timeEl.textContent = `Great attempt!`;
  elapsedTime--;
  timeEl.textContent = `You have ${formatTime(elapsedTime)} seconds`; // Update the DOM element that is displaying the
  // elapsed time.
  if (elapsedTime === 0) isTicking = false;
  render();
}, 1000);
// 6) Set timer countdown to decrease by 1 second and update display. 


function render() {
  renderQuestions();
  renderMessage();
  renderScoreBoard();
  renderCursor();
}


function renderQuestions() {
  if (!isTicking) return;
  if (questionIdx < questions.length) {
    questionEl.textContent = questions[questionIdx].question;
    // When questionIdx is < questions.length, render the 
    //        current question and its list of possible answers
    questions[questionIdx].answers.forEach(function (answer, idx) {
      answerEls[idx].textContent = answer;
      //   3.2) Call render().  Since an answer has been selected, render their
      //        selected answer differently (different styling). 
      if (questions[questionIdx].chosenAnswer === idx) {
        answerEls[idx].style.backgroundColor = "grey";
      } else {
        answerEls[idx].style.backgroundColor = "";
      }
    })
  }
}
function renderMessage() {
  if ((!isTicking) && (score === maxScore)) {
    return messageEl.textContent = `Outstanding! You've got the max score of ${score}/${maxScore}!`;
  } else if ((!isTicking) && (score === score)) {
    return messageEl.textContent = `You are done! Your score is ${score}/${maxScore}`;
  }
}



//  2.2) When questionIdx === questions.length, quiz is done
//        so render a message based upon
//        the results state:
//        "You are done! Your score is ${score}!"
//   2.3) If score >= maxScore, render message:
//         "Outstanding! You've got the max score!"

function renderScoreBoard() {
  scoreEl.textContent = `Score: ${score}`;
}

function renderCursor() {
  gameBtns.forEach(function (btn, idx) {
    if (!isTicking) {
      btn.style.cursor = "default";
    } else {
      btn.style.cursor = "pointer";
    }
  });
}