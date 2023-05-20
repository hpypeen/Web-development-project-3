const questions = [
    {
        question : " The full form of CSS is: ",
        answers : [
            { text: "Color and Style Sheet " , correct : false},
            { text: "Coloured Special Sheet " , correct : false},
            { text: "Common Style Sheet " , correct : false},
            { text: "Cascading Style Sheets " , correct : true },
        ]
    },
    {
        question : "What type of CSS is generally recommended for designing large web pages?",
        answers : [
            { text: " Inline" , correct : false},
            { text: " Internal" , correct : false},
            { text: "External " , correct : true},
            { text: " None" , correct : false},
        ]
    },
    {
        question : " Which HTML tag wihtin it '<  >' is used to declare internal CSS?",
        answers : [
            { text: "html " , correct : false},
            { text: "style " , correct : true},
            { text: " link" , correct : false},
            { text: " script" , correct :false },
        ]
    },
    {
        question : " What is full form of HTML? ",
        answers : [
            { text: "Hyper Text Markup Language " , correct : true},
            { text: "Hyper Type Markup Language " , correct : false},
            { text: " Hyper Textlink Mark Language" , correct : false},
            { text: " none" , correct : false},
        ]
    },
    {
        question : "How can we write comments in CSS?",
        answers : [
            { text: "/* */ " , correct : true},
            { text: "// " , correct : false},
            { text: "# " , correct : false},
            { text: "! -- > !" , correct : false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);   
        if(answer.correct){
         button.dataset.correct = answer.correct;   //
        }
        button.addEventListener("click",selectAnswer);
    } );
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct == "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", () =>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

startQuiz();