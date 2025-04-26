/*----- constants -----*/


/*----- state variables -----*/
let questions;
let questionIdx;
let answers;
let chosenAnswer;
let rightAnswer;
let timer;
let score;
let maxScore;

// 1) Initialize all state, then call render() if timer clicked === true.
//    1.1) begin timer when clicked.
// 2) render() will render one of the following:
//   2.1) When questionIdx is < questions.length, render the 
//        current question and its list of possible answers
//   2.2) When questionIdx === questions.length || timer === 0, quiz is done
//        so render a message based upon
//        the results state:
//        "You are done! Your score is ${score}!"
//   2.3) If score >= maxScore, render message, and update max score and save it:
//         "Outstanding! You've got the new max score!"
// 3) When a player clicks their answer to a question:
//   3.1) Update the current question object's chosenAnswer to the
//        index of the answer.
//   3.2) Call render().  Since an answer has been selected, render their
//        selected answer differently (different styling).
// 4) When a player clicks the "Submit" button:
//   4.1) Increment questionIdx
//   4.2) If questionIdx === questions.length, all questions have been 
//        answered - so update the results state
//   4.3) Call render()


/*----- cached elements  -----*/


/*----- event listeners -----*/


/*----- functions -----*/
init();

function init(){
  
  render();
  }

function render(){
  
}  