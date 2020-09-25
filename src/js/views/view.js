import { elements } from './base';

export const clearCategories = () => {
    elements.categories.innerHTML = "";
};

const renderCategory = (category) => {
    const markup = `
    <option value="${category.id}">${category.name}</option>
    `;
    elements.categories.insertAdjacentHTML('beforeend',markup);
};

export const renderCategories = (categories) => {
    categories.forEach(renderCategory)
};

export const clearNavSelect = () => {
    elements.nav.innerHTML = "";
}

export const renderNavSelect = (length) => {
    for (let i = 0; i < length; i++) {
        const markup = `
        <div class="nav__group">
            <div class="nav__background">
                <h4 class="nav__label" id="${i+1}">${i < 9 ? '0' : ''}${i + 1}</h4>
            </div>
         </div>
        `;
        elements.nav.insertAdjacentHTML('beforeend',markup);
    }
}

export const clearQuestion = () => {
    elements.question.innerHTML = "";
    elements.answers.innerHTML = "";
};

const renderAnswers = (answers) => {
    const letters = ["A","B","C","D"];
    for (let i = 0; i < answers.length; i++) {
        const markup = `
        <li class="answer">
            <input type="radio" class="answer__select" id="option-${i}" name="question" value="${answers[i]}">
            <div class="answer__container">
                <label for="option-${i}" class="answer__label">
                    <span class="answer__label-letter" id="letter-${i}">${letters[i]}.</span>
                    <span class="answer__label-title">${answers[i]}</span>
                </label>
            </div>
        </li>
        `;
        elements.answers.insertAdjacentHTML('beforeend',markup);
    }
}

export const renderQuestion = (question, current) => {
    elements.overlayIcon.textContent = current;
    const Q = question[parseInt(current)-1];
    if (Q) {
        const markup = `
        <h2 class="question__title">${Q.question}</h2>
        `;
        elements.question.innerHTML = markup;
        renderAnswers(Q.answers);
        if (Q.selected) {
            document.getElementById(Q.selected).checked = true;
        }
    }
};

export const getParameters = () => {
    const parameters = {
        amount: 50,
        difficulty: document.querySelector('input[name="difficulty"]:checked'),
        category: elements.categories.value
    };
    return parameters;
};

export const colorCard = (question , current) => {
    const Q = question[parseInt(current) - 1];
    const card = document.getElementById(current);
    const answer = document.getElementById(Q.selected);
    const answerLetter = answer.nextElementSibling.firstElementChild.firstElementChild;
    console.log(answerLetter);
    const styles = window.getComputedStyle(answerLetter);
    card.style.color = styles.color;
    card.style.backgroundColor = styles.backgroundColor;

}

export const checkAnswers = (question) => {
    for (let i = 0; i < 50; i++) {
        let card = document.getElementById(i+1);
        card.classList.remove('correct');
        card.classList.remove('incorrect');
        if (question[i].answer) {
            if(question[i].answer === question[i].correct) {
                card.classList.add('correct');
            } else {
                card.classList.add('incorrect');
            }
        }
    }
}

export const toggleLayout = () => {
    elements.header.classList.toggle('header--minimized');
    elements.title.classList.toggle('header__title--minimized');
    elements.quiz.classList.toggle('hidden');
    elements.form.classList.toggle('hidden');
    elements.overlay.classList.toggle('hidden');
};