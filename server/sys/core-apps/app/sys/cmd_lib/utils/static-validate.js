class validate {
    constructor(data) {
        this.data = data
        this.final = []
        this.isTrue = (value,err) => {
            if (value) {
                this.final.push(true)
            } else {
                this.final.push(err)
            }

            return this
        }
        this.isFalse = (value,err) => {
            if (!value) {
                this.final.push(true)
            } else {
                this.final.push(err)
            }

            return this
        }

        this.minChar = (number,label) => {
            this.data.length > number ? this.final.push(true) : this.final.push(`${label} should have ${number} minimum characters`)
            return this
        }
        this.maxChar = (number, label) => {
            this.data.length > number ? this.final.push(true) : this.final.push(`${label} should only have ${number} maximum characters`)
            return this
        }
        this.hasCapitalLetters = (condition, label) => {
            const regex = /.*[A-Z]/g;
            if (condition == undefined || condition == true || condition == null) {
                regex.exec(this.data) != null ? this.final.push(true) : this.final.push(`${label} should have capital letters`)
            } else {
                regex.exec(this.data) != null ? this.final.push(`${label} should not have capital letters`) : this.final.push(true)
            }

            return this
        }
        this.hasWhiteSpace = (condition, label) => {
            const regex = /\s/gim
            if (condition == undefined || condition == true || condition == null) {
                regex.exec(this.data) !== null ? this.final.push(true) : this.final.push(`${label} should have white space`)
            } else {
                regex.exec(this.data) !== null ? this.final.push(`${label} should not have white space`) : this.final.push(true)
            }
            return this
        }
        this.hasSpecialCharacters = (condition, label) => {
            const regex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/gim;
            if (condition == undefined || condition == true || condition == null) {
                regex.exec(this.data) != null ? this.final.push(true) : this.final.push(`${label} should have special characters`)
            } else {
                regex.exec(this.data) != null ? this.final.push(`${label} should not have special characters`) : this.final.push(true)
            }
            return this
        }
        this.required = (label) => {
            if (this.data) {
                this.final.push(true)
            } else {
                this.final.push(`${label} is required`)
            }
            return this
        }
        this.hasNumbers = (condition, label) => {
            const regex = /.*[0-9]/g;
            if (condition == undefined || condition == true || condition == null) {
                regex.exec(this.data) != null ? this.final.push(true) : this.final.push(`${label} should have numbers`)
            } else {
                regex.exec(this.data) != null ? this.final.push(`${label} should not have numbers`) : this.final.push(true)
            }
            return this
        }
        this.hasSmallLetters = (condition, label) => {
            const regex = /.*[a-z]/g;
            if (condition == undefined || condition == true || condition == null) {
                regex.exec(this.data) != null ? this.final.push(true) : this.final.push(`${label} should have small letters`)
            } else {
                regex.exec(this.data) != null ? this.final.push(`${label} should not have small letters`) : this.final.push(true)
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