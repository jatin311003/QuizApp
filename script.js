const questions=[
    {
        question:"What is the capital of India?",
        answers: [
            {text:"NEW DELHI",correct:true},
            {text:"MUMBAI",correct:false},
            {text:"JAIPUR",correct:false},
            {text:"KANPUR",correct:false}
        ]
    },
    {
        question:"What is 4 multiply 5?",
        answers: [
            {text:"12",correct:false},
            {text:"16",correct:false},
            {text:"20",correct:true},
            {text:"24",correct:false}
        ]
    },
    {
        question:"Who is the best batsman in the world?",
        answers: [
            {text:"Babar Azam",correct:false},
            {text:"Virat Kohli ",correct:true},
            {text:"Steven Smith",correct:false},
            {text:"Rohit Sharma",correct:false}
        ]
    }
];
const questionelement = document.getElementById("question");
const answerbuttons=document.getElementById("answer-buttons");
const nextButton=document.getElementById("next-btn");
let currentquestionindex=0;
let score=0;
function startquiz(){
    currentquestionindex=0;
    score=0;
    nextButton.innerHTML="Next";
    showquestion();
}

function showquestion(){
    resetstate();
    let currentquestion=questions[currentquestionindex];
    let questionNo=currentquestionindex+1;
    questionelement.innerHTML=questionNo+". "+currentquestion.question;

    currentquestion.answers.forEach(answer => {
        const button=document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerbuttons.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct
        }
        button.addEventListener("click",selectanswer);
    });
}
function selectanswer(e){
    const selectbtn=e.target;
    const iscorrect=selectbtn.dataset.correct=="true";
    if(iscorrect){
        selectbtn.classList.add("correct");
        score++;
    }
    else{
        selectbtn.classList.add("incorrect");
    }
    Array.from(answerbuttons.children).forEach(button=>{
        if(button.dataset.correct=="true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    });
    nextButton.style.display="block";
}
function handlenextbutton(){
    currentquestionindex++;
    if(currentquestionindex<questions.length){
        showquestion();
    }
    else{
        showscore();
    }
}
function showscore(){
    resetstate();
    questionelement.innerHTML=`You scored ${score} out of ${questions.length}!`
    nextButton.innerHTML="play again";
    nextButton.style.display="block";
}
nextButton.addEventListener("click",()=>{
    if(currentquestionindex<questions.length){
        handlenextbutton();
    }
    else{
        startquiz();
    }
})
startquiz();
function resetstate(){
    nextButton.style.display="none";
    while(answerbuttons.firstChild){
        answerbuttons.removeChild(answerbuttons.firstChild);
    }
}

