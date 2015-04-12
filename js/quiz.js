$(document).ready(function(){
     /*--Initiate the quiz--*/
    $('.start').click(function(){
        $('.welcomepg').hide(1000);
        $('.flashcard-container').show(1000);
    });
    
    /*--set of questions--*/
    var quizData=[ 
    {
    questionText: "UAE",
    answers: ["Abudhabi", "Sharjah", "Dubai", "Ajman"],
    correctAnswer: "Abudhabi",
    fact:"The capital of UAE is Abudhabi.",
    src: "images/UAE.png"
    },

    {
    questionText: "Azerbaijan",
    answers: ["Ganja", "Baku", "Julfa", "Fuzuli"],
    correctAnswer: "Baku",
    fact: "The capital of Azerbaijan is Baku.",
    src: "images/Azerbaijan.png"
    },

    {
    questionText: "Netherlands",
    answers: ["Rotterdam", "Zaanstad", "Amsterdam","Harlem"],
    correctAnswer: "Amsterdam",
    fact:"The capital of Netherlands is Amsterdam.",
    src: "images/Netherlands.png"
    },

    {
    questionText: "Greece",
    answers: ["Athens", "Heraklion", "Lamia", "Komotini"],
    correctAnswer: "Athens",
    fact:"The capital of Greece is Athens.",
    src: "images/Greece.png"
    },

    {
    questionText: "Bangladesh",
    answers: ["Dhaka", "Chittagong", "Sylhet", "Khulna"],
    correctAnswer: "Dhaka",
    fact:"The capital of Bangladesh  is Dhaka.",
    src: "images/Bangladesh.png"
    },

    {
    questionText: "Egypt",
    answers: ["Giza", "Suez", "Cairo", "Alexandria"],
    correctAnswer: "Cairo",
    fact:"The capital of Egypt is Cairo.",
    src: "images/Egypt.png"
    },

    {
    questionText: "Somalia",
    answers: ["Hargesia", "Bosaso", "Galkayo", "Mogadishu"],
    correctAnswer: "Mogadishu", 
    fact:"The capital of Somalia is Mogadishu.",
    src: "images/Somalia.png"
    },

    {     
    questionText: "Canada",    
     answers: ["Toranto","Montreal", "Vancouver", "Ottawa"], 
    correctAnswer: "Ottawa",
    fact:"The capital of Canada is Ottawa.",
    src: "images/Canada.png"
    },

    {
    questionText: "Brazil",
    answers: ["Brasilia", "Salvador","Rio-de-Janerio","Porto Alegre"],
    correctAnswer: "Brasilia",
    fact:"The capital of Brazil is Brasilia.",
    src: "images/Brazil.png"
    },

    {
    questionText: "Australia",
    answers: ["Sydney", "Brisbane", "Canberra", "Melbourne"],
    correctAnswer: "Canberra",
    fact:"The capital of Australia is Canberra.",
    src: "images/Australia.png"
    }
    ]
  
/*--Print questions--*/ 
    function insertQuestion(q) {
        updateFlag(0);
    $("#questioN").text(quizData[q].questionText);
    $("#answers").empty();
    for (var i = 0; i < quizData[q].answers.length; i++)
     {
        var answerLI = quizData[q].answers[i];
        var alphabet = ["a", "b", "c", "d"];
        var letterLI = alphabet[i];
        $("#answers").append("<li><span class='number'>" + letterLI + "</span>" + answerLI + "</li>");
    }
}
$(document).ready(function() {
    insertQuestion(0);
    
})

/*--selecting the answer--*/
$("#answers").on("click", "li", function () {
    $("li").removeClass("selected");
    $(this).addClass("selected");
    $("#next").addClass("selected");
    $("#prev").addClass("selected");
});
/*--moving to next question--*/
var qNum=0;
$("#next").on("click", function () {
    if ($(this).hasClass("selected")) {
        updateScore();
        updateMessage();
        updateProgress();
        toFinish();
        qNum++;
        increaseqNum();
        if (qNum < quizData.length) {
            insertQuestion(qNum);
            $("#next").removeClass("selected");
        } else {
            moveQuestion();
           console.log("That's it we are done");
            return;
        };      
    } else {
        alert("Please make a selection");
        return;
    }

})
/*--Declares a function that increments the question number--*/
function increaseqNum () {
    console.log("qnumtest");
    if (qNum < 10) {
        $("#que span").text(qNum + 1);
    }
}
/*--previous question--*/
function decreaseqNum () {
    console.log("qnumtest");
    if (qNum > 0) {
        $("#que span").text(qNum - 1);
    }
    else if (qNum===0){
        console.log('This is the first question');
    }
}
$("#prev").on("click", function () {
    if ($(this).hasClass("selected")) {
         
        qNum--;
        increaseqNum();
        if (qNum < quizData.length) {
            insertQuestion(qNum);
            $("#prev").removeClass("selected");
        } else {
            
            console.log("I got no more!");
            return;
        };      
    } else {
        alert("Please make a selection");
        return;
    }
})

/*Declares a function that checks whether or not the selected answer is correct.*/
function checksAnswer () {
    var rawSelection = $("li.selected").text();
    var selection = rawSelection.substring(1, rawSelection.length + 1);
    if (selection == quizData[qNum].correctAnswer) {
        console.log("You got it right");
        return true;
    } else {
        console.log("You got it wrong");
        return false;
    }
}
/*Displays correct information*/
function updateMessage(){
    $("#info-answer").text(quizData[qNum].fact);
}
/*Displays flag image*/
 function updateFlag() {
       $("#flag").html('<img src='+ quizData[qNum].src +'>');
    }

/*Declares a function that updates the score after an answer was submitted*/
var score = 0;
function updateScore () {
    if (checksAnswer()) {
        console.log("score++");
        score++;
        $(".score").text(score);
    } else {
        console.log("no score");
    }
}
/*Changes the "next" button to say "finish" on the last question*/
function toFinish () {
    if (qNum === quizData.length - 2) {
        $("#next").text("finish");
        console.log("next changed to finish");
    }

}
/*Declares a function that updates the progress bar after every answer is submitted*/
var myWidth = 0;
var myProgress = 0;
function updateProgress () {
    console.log("width before: " + myWidth);
    if (myWidth < 99.9999) {
        myWidth = myWidth + 1 / quizData.length * 100;
        var widthPercentage = myWidth + "%"; 
        $(".progress-bar").css("width", widthPercentage);
        myProgress = myWidth;
        myProgress = Math.round(myProgress);
        $(".completion span").text(myProgress);
    } else {
        console.log("already at 100%");
    }
    console.log("width after: " + myWidth);
}
/*Showing congrats message*/

function moveQuestion(){   
    $(".congrats").show(1000, function () {        
        $(".congrats span").text(score);        
    })
}
});