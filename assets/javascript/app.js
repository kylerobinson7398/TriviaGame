var trivia = {
  initialScreen: '',
  correctCounter: 0,
  inCorrectCounter: 0,
  unAnsweredCounter: 0,
  clickSound: new Audio('assets/sounds/button-click.mp3'),
  gameHTML: '',
  questionsArray: [
    'How many points does the maple leaf on the Canadian flag have?',
    'Which city is home to North Americas largest mall?',
    'Which Canadian chain first opened in Hamilton in 1964?',
    'Which city hosts North Americas largest single day parade?',
    "Which is Canada's national sport?"
  ],
  answerArray: [
    ['6', '8', '11', '13'],
    ['Toronto', 'Edmonton', 'Calgary', 'Vancouver'],
    ['A&W', 'Boston Pizza', "Harvey's", 'Tim Hortons'],
    ['Toronto', 'Niagara Falls', 'Winnapeg', 'Vancouver'],
    ['Hockey', 'Lacrosse', 'Basketball', 'Hockey and Lacrosse']
  ],
  correctAnswers: [
    'C. 11',
    'B. Edmonton',
    'D. Tim Hortons',
    'A. Toronto',
    'D. Hockey and Lacrosse'
  ],
  clock: '',
  questionCounter: 0,
  timeCounter: 20
};

function startScreen() {
  trivia.initialScreen =
    "<p class='text-center main-button'><a class='btn btn-primary btn-lg start-button text-center' href='#'>Start!</a></p>";
  $('.main-area').html(trivia.initialScreen);
}

function timer() {
  trivia.clock = setInterval(twentySeconds, 1000);
  function twentySeconds() {
    if (trivia.timeCounter === 0) {
      timeOutLoss();
      clearInterval(trivia.clock);
    }
    if (trivia.timeCounter > 0) {
      trivia.timeCounter--;
    }
    $('.timer').html(trivia.timeCounter);
  }
}

function wait() {
  if (trivia.questionCounter < 4) {
    trivia.questionCounter++;
    generateHTML();
    trivia.timeCounter = 20;
    timer();
  } else {
    finalScreen();
  }
}

function win() {
  trivia.correctCounter++;
  trivia.gameHTML =
    "<p class='text-center'> Time Remaining: <span class='timer'>" +
    trivia.timeCounter +
    '</span></p>' +
    "<p class='text-center'>Correct! The answer is: " +
    trivia.correctAnswers[trivia.questionCounter] +
    '</p>';
  $('.main-area').html(trivia.gameHTML);
  setTimeout(wait, 4000);
}

function loss() {
  trivia.inCorrectCounter++;
  trivia.gameHTML =
    "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" +
    trivia.timeCounter +
    '</span></p>' +
    "<p class='text-center'>Wrong! The correct answer is: " +
    trivia.correctAnswers[trivia.questionCounter] +
    '</p>';
  $('.main-area').html(trivia.gameHTML);
  setTimeout(wait, 4000);
}

function timeOutLoss() {
  trivia.unAnsweredCounter++;
  trivia.gameHTML =
    "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" +
    trivia.timeCounter +
    '</span></p>' +
    "<p class='text-center'>You ran out of time!  The correct answer was: " +
    trivia.correctAnswers[trivia.questionCounter] +
    '</p>';
  $('.main-area').html(trivia.gameHTML);
  setTimeout(wait, 4000);
}

function finalScreen() {
  trivia.gameHTML =
    "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" +
    trivia.timeCounter +
    '</span></p>' +
    "<p class='text-center'>All done, here's how you did!" +
    '</p>' +
    "<p class='summary-correct'>Correct Answers: " +
    trivia.correctCounter +
    '</p>' +
    '<p>Wrong Answers: ' +
    trivia.inCorrectCounter +
    '</p>' +
    '<p>Unanswered: ' +
    trivia.unAnsweredCounter +
    '</p>' +
    "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
  $('.main-area').html(trivia.gameHTML);
}

function resetGame() {
  trivia.questionCounter = 0;
  trivia.correctCounter = 0;
  trivia.inCorrectCounter = 0;
  trivia.unAnsweredCounter = 0;
  trivia.timeCounter = 20;
  generateHTML();
  timer();
}

function generateHTML() {
  trivia.gameHTML =
    "<p class='text-center timer-p'>Time Remaining: <span class='timer'>20</span></p><p class='text-center'>" +
    trivia.questionsArray[trivia.questionCounter] +
    "</p><button class='first-answer answer'>A. " +
    trivia.answerArray[trivia.questionCounter][0] +
    "</button><br><button class='answer'>B. " +
    trivia.answerArray[trivia.questionCounter][1] +
    "</button><br><button class='answer'>C. " +
    trivia.answerArray[trivia.questionCounter][2] +
    "</button><br><button class='answer'>D. " +
    trivia.answerArray[trivia.questionCounter][3] +
    '</button>';
  $('.main-area').html(trivia.gameHTML);
}

startScreen();

$('body').on('click', '.start-button', function(event) {
  event.preventDefault();
  trivia.clickSound.play();
  generateHTML();

  timer();
});

$('body').on('click', '.answer', function(event) {
  trivia.clickSound.play();
  selectedAnswer = $(this).text();
  if (selectedAnswer === trivia.correctAnswers[trivia.questionCounter]) {
    clearInterval(trivia.clock);
    win();
  } else {
    clearInterval(trivia.clock);
    loss();
  }
});

$('body').on('click', '.reset-button', function(event) {
  trivia.clickSound.play();
  resetGame();
});
