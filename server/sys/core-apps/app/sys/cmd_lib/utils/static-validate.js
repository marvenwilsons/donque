class validate {
    constructor(data) {
        this.data = data
        this.final = []
        this.isTrue = (value) => {
            if (value) {
                this.final.push(true)
            } else {
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
        this.hasCapitalLetters = (condition) => {
            const regex = /.*[A-Z]/g;
            if (condition == undefined || condition == true || condition == null) {
                regex.exec(this.data) != null ? this.final.push(true) : this.final.push('should have capital letters')
            } else {
                regex.exec(this.data) != null ? this.final.push('should not have capital letters') : this.final.push(true)
            }

            return this
        }
        this.hasWhiteSpace = (condition) => {
            const regex = /\s/gim
            if (condition == undefined || condition == true || condition == null) {
                regex.exec(this.data) !== null ? this.final.push(true) : this.final.push('should have white space')
            } else {
                regex.exec(this.data) !== null ? this.final.push('should not have white space') : this.final.push(true)
            }
            return this
        }
        this.hasSpecialCharacters = (condition) => {
            const regex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/gim;
            if (condition == undefined || condition == true || condition == null) {
                regex.exec(this.data) != null ? this.final.push(true) : this.final.push('should have special characters')
            } else {
                regex.exec(this.data) != null ? this.final.push('should not have special characters') : this.final.push(true)
            }
            return this
        }
        this.required = () => {
            if (this.data) {
                this.final.push(true)
            } else {
                this.final.push('required')
            }
            return this
        }
        this.hasNumbers = (condition) => {
            const regex = /.*[0-9]/g;
            if (condition == undefined || condition == true || condition == null) {
                regex.exec(this.data) != null ? this.final.push(true) : this.final.push('should have numbers')
            } else {
                regex.exec(this.data) != null ? this.final.push('should not have numbers') : this.final.push(true)
            }
            return this
        }
        this.hasSmallLetters = (condition) => {
            const regex = /.*[a-z]/g;
            if (condition == undefined || condition == true || condition == null) {
                regex.exec(this.data) != null ? this.final.push(true) : this.final.push('should have small letters')
            } else {
                regex.exec(this.data) != null ? this.final.push('should not have small letters') : this.final.push(true)
            }

            return this
        }
        this.done = () => {
            if (this.final.every(items => items == true)) {
                return true
            } else {
                return this.final.filter(e => e != true)
            }
        }
    }
}

module.exports = validate