var panel = $('#quiz-area');
var countStartNumber = 30;



$(document).on('click', '#start-over', function(e) {
  game.reset();
});

$(document).on('click', '.answer-button', function(e) {
  game.clicked(e);
});

$(document).on('click', '#start', function(e) {
  $('#subwrapper').prepend('<h2>Time Remaining: <span id="counter-number">30</span> Seconds</h2>');
  game.loadQuestion();
});


var questions = [{


  question: "What city, and state does Stranger Things take place?",
  answers: ["Miami, Florida", "Hawkins, Indiana", "Tampa Florida", "Silicon Valley, California"],
  correctAnswer: "Hawkins, Indiana",
  image:"assets/images/hawkins.PNG"
}, {
  question: "In what decade is the Netflix original series set?",
  answers: ["1960's", "1970's", "1980's", "1990's"],
  correctAnswer: "1980's",
  image:"assets/images/80s.JPEG"

}, {
  question: "What is Wills last name?",
  answers: ["Smith", "Byers", "Perez", "Wheeler"],
  correctAnswer: "Byers",
  image:"assets/images/will.PNG"

}, {
  question: 'What is Elevens real name"?',
  answers: ["Sarah", "Jane", "Dustin", "Max"],
  correctAnswer: "Jane",
  image:"assets/images/eleven.JPEG"

}, {
  question: 'Where was Will trapped in the series?',
  answers: ["The Closet", "The Bathroom", "The Upside Down", "The Kitchen"],
  correctAnswer: "The Upside Down",
  image:"assets/images/The-Upside-Down.jpg"
}, {
  question: 'Name the game that the boys are always playing.?',
  answers: ["PAC-MAN", "Dungeons & Dragons", "The Legend of Zelda", "Super Mario Bros"],
  correctAnswer: "Dungeons & Dragons",
  image:"assets/images/dungeons-and-dragons.JPEG"
}, {
  question: "What movie did the boys dress like in season 2?",
  answers: ["Clowns", "Cowboys", "Ghost Busters", "The Matrix"],
  correctAnswer: "Ghost Busters",
  image:"assets/images/ghost-busters.JPEG"

}, {
  question: "What is the name of Mike's sister?",
  answers: ["Nancy", "Amanda", "Amy", "Madison"],
  correctAnswer: "Nancy",
  image: "assets/images/nancy.PNG"

}, {
question: "What is El's favorite food?",
answers: ["Pop-Tarts", "Pizza", "Eggos", "Burgers"],
correctAnswer: "Eggos",
image:"assets/images/eggos.JPEG"

}, {
question: "Who is the cheif of Hawkins?",
answers: ["Mike Wheeler", "Jim Hopper", "Joyce Byers", "Jonathan Byers"],
correctAnswer: "Jim Hopper",
image:"assets/images/jim-hopper.PNG"

}, {
question: "What song does Will listen to with his brother Jonathan?",
answers: ["Don't Stop Believing", "Should I Stay or Should I Go", "Africa", ""],
correctAnswer: "Should I Stay or Should I Go",
image:"assets/images/original.jpg"

}, {
question: "Where does Season 1's suspenseful opening scene take place?",
answers: ["Hawkins Lab", "Spaceship", "The Byers' House", "", "A CREEPY, DERELICT FARM IN THE MIDDLE OF NOWHERE"],
correctAnswer: "Hawkins Lab",
image:"assets/images/HawkinsLab.png"



}, {
question: "How many episodes are in the first season?",
answers: ["Ten", "Fifteen", "Eight", "Twelve"],
correctAnswer: "Eight",
image:"assets/images/8Ball.webp"

}, {
question: "The chilling first Season 1 scene is a reference to which of these prominent '80s sci-fi films?",
answers: ["Star Wars", "Alien", "Blade Runner", "Close Encounters of The Third Kind"],
correctAnswer: "Alien",
image:"assets/images/alien.jpg"


}, {
question: "How does Joyce communicate with Will?",
answers: ["Walkie Talkies", "Cell Phone", "Christmas Lights", "Email"],
correctAnswer: "Christmas Lights",
image:"assets/images/JoyceLights.jpg"


}, {
question: "What colors are Dustin's hat?",
answers: ["Green & White", "Red & Blue", "Blue, White, & Green", "Red, Blue, & White"],
correctAnswer: "Red, Blue, & White",
image:"assets/images/dustin.jpg"



}];


var game = {
  questions:questions,
  currentQuestion:0,
  counter:countStartNumber,
  correct:0,
  incorrect:0,
  countdown: function(){
    game.counter--;
    $('#counter-number').html(game.counter);

    if (game.counter === 0){
      console.log('TIME UP');
      game.timeUp();
    }
  },
  loadQuestion: function(){
    timer = setInterval(game.countdown, 1000);
    panel.html('<h2>' + questions[this.currentQuestion].question + '</h2>' );
    for (var i = 0; i<questions[this.currentQuestion].answers.length; i++){
      panel.append('<button class="answer-button" id="button"' + 'data-name="' + questions[this.currentQuestion].answers[i] + '">' + questions[this.currentQuestion].answers[i]+ '</button>');
    }
  },
  nextQuestion: function(){
    game.counter = countStartNumber;
    $('#counter-number').html(game.counter);
    game.currentQuestion++;
    game.loadQuestion();
  },
  timeUp: function (){
    clearInterval(timer);
    $('#counter-number').html(game.counter);

    panel.html('<h2>Out of Time!</h2>');
    panel.append('<h3>The Correct Answer was: ' + questions[this.currentQuestion].correctAnswer);
    panel.append('<img src="' + questions[this.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  results: function() {
    clearInterval(timer);

    panel.html('<h2>All done, heres how you did!</h2>');
    $('#counter-number').html(game.counter);
    panel.append('<h3>Correct Answers: ' + game.correct + '</h3>');
    panel.append('<h3>Incorrect Answers: ' + game.incorrect + '</h3>');
    panel.append('<h3>Unanswered: ' + (questions.length - (game.incorrect + game.correct)) + '</h3>');
    panel.append('<br><button id="start-over">Start Over?</button>');
  },
  clicked: function(e) {
    clearInterval(timer);

    if ($(e.target).data("name") === questions[this.currentQuestion].correctAnswer){
      this.answeredCorrectly();
    } else {
      this.answeredIncorrectly();
    }
  },
  answeredIncorrectly: function() {
    game.incorrect++;
    clearInterval(timer);
    panel.html('<h2>Nope!</h2>');
    panel.append('<h3>The Correct Answer was: ' + questions[game.currentQuestion].correctAnswer + '</h3>');
    panel.append('<img src="' + questions[game.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  answeredCorrectly: function(){
    clearInterval(timer);
    game.correct++;
    panel.html('<h2>Correct!</h2>');
    panel.append('<img src="' + questions[game.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  reset: function(){
    this.currentQuestion = 0;
    this.counter = countStartNumber;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
};
