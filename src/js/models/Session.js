export default class Session {
    constructor() {

    }

    async testToken() {
        if (this.token) {
            try {
                const result = await fetch(`https://opentdb.com/api.php?amount=10&token=${this.token}`);
                const data = await result.json();
                console.log('------Test------');
                console.log(result);
                console.log(data);
                console.log('----------------');
            } catch(error) {
                console.log(error);
            }
        }
    }

    async getToken() {
        try {
            const result = await fetch('https://opentdb.com/api_token.php?command=request');
            const data = await result.json();
            this.token = data.token;
            console.log(this.token);
        } catch(error) {
            alert(error);
            console.log("-------Error-------");
            console.log(error);
            console.log("-------------------");
        }
    }

    async getCategories() {
        try {
            const result = await fetch('https://opentdb.com/api_category.php');
            const data = await result.json();
            this.categories = data.trivia_categories;
        } catch(error) {
            alert(error);
            console.log("-------Error-------");
            console.log(error);
            console.log("-------------------");
        }
    }
}