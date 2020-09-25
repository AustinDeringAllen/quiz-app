export default class Question {
    constructor(category, correct, incorrect, question, type) {
        this.category = category;
        this.correct = correct;
        this.incorrect = incorrect;
        this.question = question;
        this.type = type;
    }

    newAnswers() {
        this.answers = [this.correct, ...this.incorrect];
    }

    shuffleAnswers() {
        let current = this.answers.length, temporary, random;

        while (0 !== current) {

            // Pick a remaining element
            random = Math.floor(Math.random() * current);
            current -= 1;

            // Swap it with the current element
            temporary = this.answers[current];
            this.answers[current] = this.answers[random];
            this.answers[random] = temporary;
        }
    }
}