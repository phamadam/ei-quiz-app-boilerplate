/**
 * Example store structure
 */

/* My questions */
const STORE = {
    questions: [{
        //question 1
        question: 'Where were the Houston Rockets originally located?',
        answers: [
          'Long Beach',
          'Tampa',
          'San Diego',
          'Seattle'
        ],
        correctAnswer: 'San Diego'
        },

        {
        //question 2
        question: 'Which Rockets player is the only one to record 200+ blocks and 200+ steals in the same season?',
        answers: [
          'Hakeem Olajuwon',
          'Clyde Drexler',
          'Yao Ming',
          'Moses Malone'
        ],
        correctAnswer: 'Hakeem Olajuwon'
        },
      
        {
        //question 3
        question: 'Which Rockets player scored 13 points in the final 33 seconds of a game for a comeback win over the Spurs?',
        answers: [
          'Jeremy Lin',
          'Calvin Murphy',
          'James Harden',
          'Tracy McGrady'
        ],
        correctAnswer: 'Tracy McGrady'
        },
      
        {
        //question 4
        question: 'What number did Hakeem Olajuwon wear during his career?',
        answers: [
            '11', 
            '34', 
            '56', 
            '13'
        ],
        correctAnswer: '34'
        },
      
        {
        //question 5
        question: 'Which Rockets player made 10 3-pointers in a single half against the Grizzlies?',
        answers: [
          'Gerald Green', 
          'Chris Paul', 
          'Chandler Parsons', 
          'Hakeem Olajuwon'
        ],
        correctAnswer: 'Chandler Parsons'
    }],
    quizStart: false,
    currentQuestion: 0,
    score: 0
};

/* Replaces the h1 title */
function renderTitle() {
    $("h1").html(function() {
        return 'Houston Rockets Quiz';
    });
}

/* Start screen when the function is called */
function renderStartScreen() {
    return `
        <div class='start-screen'>
        <p>How well do you know the Houston Rockets?</p>
        <button type="button" id="start">Start Quiz</button>
        </div>`;
}

/* Function for current question and current score */
function renderQuestionAndScore() {
    return `
    <ul class='question-and-score'>
        <li id='question-number'>
            Question Number: ${STORE.currentQuestion + 1}/${STORE.questions.length}
        </li>
        <li id='question-and-score'>
            Score: ${STORE.score}/${STORE.questions.length}
        </li>
    </ul>`;
}

/* function for multiple choice options */
function renderAnswers() {
    const answersArray = STORE.questions[STORE.currentQuestion].answers
    let answers = '';
    let i = 0;
  
    answersArray.forEach(answer => {
        answers += `
            <div id="option-container-${i}">
                <input type="radio" name="options" id="option${i + 1}" value= "${answer}" tabindex ="${i + 1}" required> 
                <label for="option${i + 1}"> ${answer}</label>
            </div>`;
            i++;
        });
    return answers;
}

/* Form for the question */
function renderQuestion(question) {
    let currentQuestion = STORE.questions[STORE.currentQuestion];
    return `
        <form id="question-form" class="question-form">
        <fieldset>
            <div class="question">
            <legend> ${currentQuestion.question}</legend>
            </div>
            <div class="options">
            <div class="answers">
                ${renderAnswers()}
            </div>
            </div>
            <button type="submit" id="submit-answer-btn" tabindex="5">Submit</button>
            <button type="button" id="next-question-btn" tabindex="6">Next</button>
        </fieldset>
        </form >`;
}

/* Results screen with a reset button */
function renderResultsScreen() {
    return `
        <div class="results">
            <form id="js-restart-quiz">
            <fieldset>
                <div class="row">
                <div class="col-12">
                    <legend>Your Score is: ${STORE.score}/${STORE.questions.length}</legend>
                </div>
                </div>
            
                <div class="row">
                <div class="col-12">
                    <button type="button" id="restart"> Restart Quiz </button>
                </div>
                </div>
            </fieldset>
        </form>
        </div>`;
}

/* Function for event of correct or incorrect answer */
function renderFeedback(answerStatus) {
    let correctAnswer = STORE.questions[STORE.currentQuestion].correctAnswer;
    let html = '';
    if (answerStatus === 'correct') {
        html = `
            <div class="right-answer">Correct!</div>`;
    }
    else if (answerStatus === 'incorrect') {
        html = `
            <div class="wrong-answer">Incorrect. The correct answer is ${correctAnswer}.</div>`;
    }
    return html;
}

/* html render function */
function render() {
    let html = '';
  
    if (STORE.quizStart === false) {
        $('main').html(renderStartScreen());
        return;
    }
    else if (STORE.currentQuestion >= 0 && STORE.currentQuestion < STORE.questions.length) {
        html = renderQuestionAndScore();
        html += renderQuestion();
        $('main').html(html);
    }
    else {
        $('main').html(renderResultsScreen());
    }
}

/* Button to start the quiz */
function renderStartClick() {
    $('main').on('click', '#start', function (event) {
        STORE.quizStart = true;
        render();
    });
}

/* Button for the next question */
function renderNextQuestionClick() {
    $('body').on('click', '#next-question-btn', (event) => {
        render();
    });
}

/* Function when the user submits an answer */
function renderQuestionFormSubmit() {
    $('body').on('submit', '#question-form', function (event) {
        event.preventDefault();
        const currentQuestion = STORE.questions[STORE.currentQuestion];
        let selectedOption = $('input[name=options]:checked').val();
        let optionContainerId = `#option-container-${currentQuestion.answers.findIndex(i => i === selectedOption)}`;
    
        if (selectedOption === currentQuestion.correctAnswer) {
            STORE.score++;
            $(optionContainerId).append(renderFeedback('correct'));
        }
        else {
            $(optionContainerId).append(renderFeedback('incorrect'));
        }
        STORE.currentQuestion++;
        $('#submit-answer-btn').hide();
        $('input[type=radio]').each(() => {
            $('input[type=radio]').attr('disabled', true);
        });
        $('#next-question-btn').show();
    });
}

/* resets the data for the quiz */
function restartQuiz() {
    STORE.quizStarted = false;
    STORE.currentQuestion = 0;
    STORE.score = 0;
}

/* Button to restart the quiz */
function renderRestartButton() {
    $('body').on('click', '#restart', () => {
        restartQuiz();
        render();
    });
}

function handleQuizApp() {
    render();
    renderTitle();
    renderStartClick();
    renderNextQuestionClick();
    renderQuestionFormSubmit();
    renderRestartButton();
}

$(handleQuizApp);


/**
 * 
 * Technical requirements:
 * 
 * Your app should include a render() function, that regenerates the view each time the store is updated. 
 * See your course material and access support for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 * 
 */

/********** TEMPLATE GENERATION FUNCTIONS **********/

// These functions return HTML templates

/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store

/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)
