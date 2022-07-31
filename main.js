/* All answer options */
const option1 = document.querySelector('.option1'),
      option2 = document.querySelector('.option2'),
      option3 = document.querySelector('.option3'),
      option4 = document.querySelector('.option4');

/* All our options*/

const optionElements = document.querySelectorAll('.option');

const question = document.getElementById('question'); // сам вопрос

const numberOfQuestion = document.getElementById('number-of-question'), // номер вопроса
      numberOfAllQuestions = document.getElementById('number-of-all-questions'); // количество всех вопросов

let indexOfQuestion, // индекс текущего вопроса
    indexOfPage = 0; // индекс страницы

const answersTracker = document.getElementById('answers-tracker'); // обертка для трекера
const btnNext = document.getElementById('btn-next'); // кнопка далее

let score = 0; // итоговый результат викторины 

const correctAnswer = document.getElementById('correct-answer'), // количтсвео правльних ответов
      numberOfAllQuestions2 = document.getElementById('number-of-all-questions-2'), // количество всех поспросов ( в модальном окне)
      btnTryAgain = document.getElementById('btn-try-again'); // начать виктоиину заново

const questions = [
    {
        question: 'В каком году Титаник утонул в Атлантическом океане 15 апреля во время своего первого плавания из Саутгемптона?',
        options: [
            '1912',
            '1902',
            '1913',
            '1922',
        ],
        rightAnswer: 0
    },
    {
        question: 'Как называется крупнейшая технологическая компания в Южной Корее?',
        options: [
            'Apple',
            'Huawei',
            'Samsung',
            'LG',
        ],
        rightAnswer: 2  
    },
    {
        question: 'Какой металл был открыт Гансом Кристианом Эрстедом в 1825 году?',
        options: [
            'Кальций',
            'Олово',
            'Алюминий',
            'Цинк',
        ],
        rightAnswer: 2
    },
    {
        question: 'В каком фильме 2008 года с участием Кристиана Бэйла в главной роли есть такая цитата: «Я верю, что все, что тебя не убивает, просто делает тебя… незнакомцем»?',
        options: [
            'Пила',
            'Пока не сыграл в ящик',
            'Двадцать одно',
            'Темный рыцарь',
        ],
        rightAnswer: 3
    }
];

numberOfAllQuestions.innerHTML = questions.length; // выводим кол-во вопросов

const load = () => {
    question.innerHTML = questions[indexOfQuestion].question; // сам вопрос
 
    // мапим ответы
    option1.innerHTML = questions[indexOfQuestion].options[0];
    option2.innerHTML = questions[indexOfQuestion].options[1];
    option3.innerHTML = questions[indexOfQuestion].options[2];
    option4.innerHTML = questions[indexOfQuestion].options[3];
    
    numberOfQuestion.innerHTML = indexOfPage + 1; // установка нмоера текущей страницы
    indexOfPage++; // увеличение индекса страницы
};

let completedAnswers = [] // массив для уже заданных выопросов
 
const randomQuestion = () => {
    let randomNumber = Math.floor(Math.random() * questions.length);
    let hitDuplicate = false; // якорь для проверки одинаковых вопросов

    if(indexOfPage == questions.length){
        quizOver();
    }else {
        if(completedAnswers.length > 0) {
            completedAnswers.forEach(item => {
                if(item == randomNumber) {
                    hitDuplicate = true;
                }
            });
            if( hitDuplicate == true){
                randomQuestion();
            }else {
                indexOfQuestion = randomNumber;
                load();
            }
        }
        if(completedAnswers.length == 0){
            indexOfQuestion = randomNumber;
            load();
        }
    }
    completedAnswers.push(indexOfQuestion);
};
const checkAnswer = el => {
    if(el.target.dataset.id == questions[indexOfQuestion].rightAnswer){
        el.target.classList.add('correct');
        updateAnswerTracker('correct');
        score++;
    }else {
        el.target.classList.add('wrong');
        updateAnswerTracker('wrong');
    }
    disabledOprions();
}


for(option of optionElements){
    option.addEventListener('click', e => checkAnswer(e));
}

const disabledOprions = () => {
    optionElements.forEach(item => {
        item.classList.add('disabled');
        if(item.dataset.id == questions[indexOfQuestion].rightAnswer){
            item.classList.add('correct');
        }
    })
}

const enableOptions = () => {
    optionElements.forEach(item => {
        item.classList.remove('disabled', 'correct', 'wrong');
    })
}

const answerTracker = () => {
    questions.forEach( () => {
        const div = document.createElement('div');
        answersTracker.appendChild(div);
    })
}

const updateAnswerTracker = status => {
    answersTracker.children[indexOfPage - 1].classList.add(`${status}`);
}

const validate = () => {
    if(!optionElements[0].classList.contains('disabled')){
        alert('Вам нужно выбрать один из вариантов ответа');
    } else {
        randomQuestion();
        enableOptions();
    }
}

const quizOver = () => {
    document.querySelector('.quiz-over-modal').classList.add('active');
    correctAnswer.innerHTML = score;
    numberOfAllQuestions2.innerHTML = questions.length;
};

const tryAgain = () => {
    window.location.reload();
};

btnTryAgain.addEventListener('click', tryAgain);

btnNext.addEventListener('click', () => {
    validate();
})

window.addEventListener('load', () => {
    randomQuestion();
    answerTracker();
});