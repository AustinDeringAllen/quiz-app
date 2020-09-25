import '../sass/main.scss';
import { elements } from './views/base';
import * as view from './views/view.js';
import Session from './models/Session';
import Search from './models/Search';
import Question from './models/Question';

/** Global state of the app
 * - Whole search
 * - Current Question Object
 */

const state = {};

const init = async () => {
    // 1) New Session add to state
    state.session = new Session();

    // 2) Get Token
    state.session.getToken();

    // 3) Get Categories
    await state.session.getCategories();

    // 4) Render Categories
    view.renderCategories(state.session.categories);
}

const startQuiz = async () => {
    // 1) Get parameters for the API call // TODO
    const parameters = view.getParameters();
    // console.log(parameters);
    // console.log(parameters.difficulty);

    // check token
    //state.session.testToken();

    // 2) New search object and add to state
    state.search = new Search(parameters.amount, parameters.difficulty, parameters.category, state.session.token);

    //
    await state.search.checkCategory();

    //
    await state.search.checkAmount();

    // 3) prepare UI for results
    view.toggleLayout();

    // 4) Search for results
    await state.search.getResults();

    console.log(state.search.results);

    // 5) New Questions
    state.questions = [];
    state.search.results.forEach( e => {
        const question = new Question(e.category, e.correct_answer, e.incorrect_answers, e.question, e.type);
        state.questions.push(question);
    });
    state.questions.forEach( e => {
        e.newAnswers();
        if (e.type === 'multiple')
            e.shuffleAnswers();
    });

    // Clear nav cards
    view.clearNavSelect();

    // 6) render nav cards
    view.renderNavSelect(state.questions.length);
    
    // 7) Display Question #1
    state.current = 1;
    view.clearQuestion();
    view.renderQuestion(state.questions, state.current);
    console.log(state.search.results);
    console.log(state.questions);
}

elements.form.addEventListener('submit', e => {
    e.preventDefault();
    startQuiz();
});

elements.title.addEventListener('click', view.toggleLayout);

elements.nav.addEventListener('click', event => {
    if (event.target.matches('.nav__label')) {
        const target = event.target.closest('.nav__label');
        state.current = parseInt(target.id);
        view.clearQuestion();
        view.renderQuestion(state.questions, state.current);
        elements.overlayCheck.checked = false;
    }
});

elements.answers.addEventListener('click', event => {
    if (event.target.matches('.answer__select')) {
        const dylan = event.target.closest('.answer__select');
        state.questions[state.current - 1].selected = dylan.id;
        state.questions[state.current - 1].answer = dylan.value;
        view.colorCard(state.questions, state.current);
        console.log(state.current);
    }
});

elements.difficulties.addEventListener('click', event => {
    if (event.target.matches('.radio__group')) {
        const target = event.target.closest('.radio__group').id;
        const radio = document.getElementById(target).firstElementChild;
        if (radio.checked === true) {
            radio.checked = false;
        }
    }
});

document.addEventListener('keydown', event => {
    if (event.keyCode === 37) {
        if (state.current > 1 && (state.questions[state.current-1])) {
            state.current -= 1;
            view.clearQuestion();
            view.renderQuestion(state.questions, state.current);
            console.log(state.current);
        }
    } else if (event.keyCode === 39) {
        if (state.current < 50 && (state.questions[(state.current+1)-1])) {
            state.current += 1;
            view.clearQuestion();
            view.renderQuestion(state.questions, state.current);
            console.log(state.current);
        }
    } else {

    }
});

elements.pageNext.addEventListener('click', () => {
    if (state.current < 50 && (state.questions[(state.current+1)-1])) {
        state.current += 1;
        view.clearQuestion();
        view.renderQuestion(state.questions, state.current);
        console.log(state.current);
    }
});

elements.pagePrev.addEventListener('click', () => {
    if (state.current > 1 && (state.questions[state.current-1])) {
        state.current -= 1;
        view.clearQuestion();
        view.renderQuestion(state.questions, state.current);
        console.log(state.current);
    }
});

elements.checkAnswer.addEventListener('click', () => {
    if (state.questions.length > 0) {
        view.checkAnswers(state.questions);
    }
});

init();