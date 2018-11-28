// Array of arrays; each sub-array holds the question first, and the 4 multiple choice answers
var qAndA = [
    ["What your  favorite movie that I hate", "Dark Knight", "Gods Of Egpyt", "Lion King 1/2", "7"],
    ["Who is tired", "Me", "You", "Sarah", "Me Again"],
    ["Who is your father", "Donald Trump", "Tola Kasali", "A black Guy Name Tola", "Your Father real"],
    ["Name the Best Chicken", "churches", "Denver Biscuit Company", "city o'city", "KFC"],
    ["Today Is A Good Day ToDo", "netflix and chill", "Hiking", "Study", "Please Dont Select Study"],
];
// Global variables
var correct = 0;
var wrong = 0;
var count = 0;
var timeRemaining = 20;
var answers = ["3", "1", "3", "3", "3",];
var answered = [];

// Creates question and answer text, as well as resets timeRemaining variable
function createQAndA() {
    $('#question').html("<h3>" + qAndA[count][0] + "</h3>");
    $('#1').html("<p>" + qAndA[count][1] + "</p>");
    $('#2').html("<p>" + qAndA[count][2] + "</p>");
    $('#3').html("<p>" + qAndA[count][3] + "</p>");
    $('#4').html("<p>" + qAndA[count][4] + "</p>");
    timeRemaining = 20;
    $('#timeCount').text(timeRemaining);
    count++;
};
createQAndA();

// Starts countDown function and runs it every second
var time = setInterval(countDown, 1000);

// Reduces timeRemaining variable by a second every time it is ran. If the timer hits 0 and all the questions are done, it sends the game to the final screen. If just the timer hits 0, sends game to the loading screen. Clears the timer if it has hit 0 (prevents negative number time). If user does not answer, it pushes "0" into the user answers array.
function countDown() {
    timeRemaining--;
    $('#timeCount').text(timeRemaining);
    if (timeRemaining <= 0 && count === 10) {
        clearInterval(time);
        answered.push("0")
        finalScreen();
    } else if (timeRemaining <= 0) {
        clearInterval(time);
        answered.push("0");
        loadingScreen();
    }
}

// Stops the timer if an answer is chosen. If answer is chosen and all the questions are done, it sends the game to the final screen. If just the answer is made, sends game to the loading screen. Clears the timer since user has answered (prevents negative number time). Pushes user answer into answers array
$('.button').on("click", function (event) {
    answered.push(event.currentTarget.id);
    clearInterval(time);
    if (count === 10) {
        finalScreen();
    } else {
        loadingScreen();
    }
})
// Screen loaded when user has answered a question or run out of time - only if not all questions have been answered. Determines if the user answered the question correctly or not, then displays screen accordingly. Goes to next question and restarts time after 3 seconds.
function loadingScreen() {
    $('.answers > div').html("");
    if (answered[count - 1] == answers[count - 1]) {
        $('#question').html("<h3>You answered correctly!!!</h3>");
        correct++;
    } else {
        $('#question').html("<h3>You answered incorrectly</h3>");
        wrong++;
    }
    setTimeout(createQAndA, 3000);
    setTimeout(restartTime, 3000);
}

// Restarts time countDown when called upon
function restartTime() {
    time = setInterval(countDown, 1000);
}

// The screen that loads when the user has either answered or ran out of time on all questions. Determines the results of the final, 10th question, then iterates the corresponding variable. Displays to the user how many questions were answered correctly. Restarts game vars in 9 seconds (to ensure the count is reset before the next question asked), then calls on the restartTime and createQAndA function 1 second later.
function finalScreen() {
    $('.answers > div').html("");
    if (answered[count - 1] === answers[count - 1]) {
        correct++;
    } else {
        wrong++;
    }
    $('#question').html("<h3>" + "Correctly answered: " + correct + "</br>" + "Incorrectly answered: " + wrong + "</br>" + "Game will restart in ten seconds" + "</h3>");
    setTimeout(restartGame, 9000);
    setTimeout(createQAndA, 10000);
    setTimeout(restartTime, 10000);
}
// Resets variables to the game.
function restartGame() {
    count = 0;
    correct = 0;
    wrong = 0;
    answered.length = 0;
}





