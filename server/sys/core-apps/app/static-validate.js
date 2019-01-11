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

            return this
        }
        this.isFalse = (value) => {
            if (!value) {
                this.final.push(true)
            } else {
                this.final.push(false)
            }

            return this
        }
        
        this.minChar = (number) => {
            this.data.length > number ? this.final.push(true) : this.final.push(`should have ${number} minimum characters`)
            return this
        }
        this.maxChar = (number) => {
            this.data.length > number ? this.final.push(true) : this.final.push(`should only have ${number} maximum characters`)
            return this
        }
        this.hasCapitalLetters = () => {
            const regex = /.*[A-Z]/g;
            regex.exec(this.data) != null ? this.final.push(true) : this.final.push('should have capital letters')            
            return this
        }
        this.hasWhiteSpace = () => {
            const regex = /\s/gim
            regex.exec(this.data) !== null ? this.final.push(true) : this.final.push('should have white space')
            return this
        }
        this.hasSpecialCharacters = () => {
            const regex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/gim;
            regex.exec(this.data) != null ? this.final.push(true) : this.final.push('should have special characters')
            return this
        }
        this.required = () => {
            if(this.data){
                this.final.push(true)
            }else{
                this.final.push('required')
            }
            return this
        }
        this.hasNumbers = () => {
            const regex = /.*[0-9]/g;
            regex.exec(this.data) != null ? this.final.push(true) : this.final.push('should have numbers')
            return this
        }
        this.hasSmallLetters = () => {
            const regex = /.*[a-z]/g;
            regex.exec(this.data) != null ? this.final.push(true) : this.final.push('should have small letters')
            return this
        }
        this.done = () => {
            if (this.final.every(items => items == true)){
                return true
            }else {
                return this.final.filter(e => e != true)
            }
            return this.final
        }
    }
}

module.exports = validate