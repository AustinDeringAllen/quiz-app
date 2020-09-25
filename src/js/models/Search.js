export default class Search {
    constructor(amount = 50, difficulty = null, category = null, token) {
        this.amount = amount;
        this.difficulty = difficulty;
        this.category = category;
        this.token = token;
        this.reponse_code = null;
    }

    async checkCategory() {
        try {
            let result;
            if (this.category === 'any') {
                result = await fetch(`https://opentdb.com/api_count_global.php`);
                const data = await result.json();
                this.totalQs = data.overall.total_num_of_verified_questions;
            } else {
                result = await fetch(`https://opentdb.com/api_count.php?category=${this.category}`);
                const data = await result.json();
                this.allQs = data.category_question_count.total_question_count;
                this.easyQs = data.category_question_count.total_easy_question_count;
                this.mediumQs = data.category_question_count.total_medium_question_count;
                this.hardQs = data.category_question_count.total_hard_question_count;
                console.log(data);
                console.log(this.allQs);
                console.log(this.easyQs);
                console.log(this.mediumQs);
                console.log(this.hardQs);
                console.log(this.result);
            }
        } catch(error) {
            console.log("-------Error-------");
            console.log(error);
            console.log("-------------------");
        }
    }

    async checkAmount() {
        let Qs;
        switch(this.difficulty.value) {
            case 'any':
                if (this.amount > this.totalQs)
                    this.amount = this.totalQs;
            break;
            case 'easy':
                if (this.easyQs > 0) {
                    if (this.amount > this.easyQs) {
                        Qs = this.amount;
                        this.amount = this.easyQs;
                        this.easyQs = this.easyQs - Qs;
                    }
                } else {
                    alert('No more Questions in this category');
                }
            break;
            case 'medium':
                if (this.amount > this.mediumQs)
                    this.amount = this.mediumQs;
            break;
            case 'hard':
                if (this.amount > this.hardQs)
                    this.amount = this.hardQs;
            break;
        }
    }

    async getResults() {
        try {
            const result = await fetch(`https://opentdb.com/api.php?amount=${this.amount}${this.category !== "any" ? `&category=${this.category}` : ''}${this.difficulty.value !== "any" ? `&difficulty=${this.difficulty.value}` : ''}&token=${this.token}`);
            const data = await result.json();
            this.results = data.results;
        } catch(error) {
            alert("Please make sure you have a difficulty selected. \nClick logo and try again");
            console.log("-------Error-------");
            console.log(error);
            console.log("-------------------");
        }
    }
}