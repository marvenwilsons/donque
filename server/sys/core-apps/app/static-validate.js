class validate {
    constructor(data){
        this.data = data
        this.final = []
        this.isTrue = (value) => {
            if(value){
                this.final.push(true)
            }else{
                this.final.push(false)
            }
        }
        this.isfalse = (value) => {
            if (!value) {
                this.final.push(true)
            } else {
                this.final.push(false)
            }
        }
        this.hasCapitalLetters = () => {
            this.final.push(true)
            return this
        }
        this.done = () => {
            return this.final.every(items => items == true)
        }
    }
}

module.exports = validate