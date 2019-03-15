class validate {
    constructor(data, label) {
        this.data = data
        this.label = label
        this.final = []
        this.isTrue = (value, err) => {
            if (value) {
                this.final.push(true)
            } else {
                this.final.push(err)
            }

            return this
        }
        this.isFalse = (value, err) => {
            if (!value) {
                this.final.push(true)
            } else {
                this.final.push(err)
            }

            return this
        }

        this.minChar = (number) => {
            this.data.length > number ? this.final.push(true) : this.final.push(`${this.label} should have ${number} minimum characters`)
            return this
        }
        this.maxChar = (number) => {
            this.data.length > number ? this.final.push(true) : this.final.push(`${this.label} should only have ${number} maximum characters`)
            return this
        }
        this.hasCapitalLetters = (condition) => {
            const regex = /.*[A-Z]/g;
            if (condition == undefined || condition == true || condition == null) {
                regex.exec(this.data) != null ? this.final.push(true) : this.final.push(`${this.label} should have capital letters`)
            } else {
                regex.exec(this.data) != null ? this.final.push(`${this.label} should not have capital letters`) : this.final.push(true)
            }

            return this
        }
        this.hasSetOfCharacters = (ArrayOfCharacters, CharacterToCompare, condition) => {
            const res = ArrayOfCharacters.map(charSet => {
                return RegExp(`${charSet}`, "").exec(CharacterToCompare) != null;
            });
            const result = res.join("/") == "true/true";
            if (condition == undefined && result || condition == true && result || condition == null && result) {
                this.final.push(true)
            } else {
                this.final.push(`${this.label} should not have ${ArrayOfCharacters}`)
            }
            return this
        }
        this.hasWhiteSpace = (condition) => {
            const regex = /\s/gim
            if (condition == undefined || condition == true || condition == null) {
                regex.exec(this.data) !== null ? this.final.push(true) : this.final.push(`${this.label} should have white spaces`)
            } else {
                regex.exec(this.data) !== null ? this.final.push(`${this.label} should not have white spaces`) : this.final.push(true)
            }
            return this
        }
        this.hasSpecialCharacters = (condition) => {
            const regex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/gim;
            if (condition == undefined || condition == true || condition == null) {
                regex.exec(this.data) != null ? this.final.push(true) : this.final.push(`${this.label} should have special characters`)
            } else {
                regex.exec(this.data) != null ? this.final.push(`${this.label} should not have special characters`) : this.final.push(true)
            }
            return this
        }
        this.required = () => {
            if (this.data) {
                this.final.push(true)
            } else {
                this.final.push(`${this.label} is required`)
            }
            return this
        }
        this.hasNumbers = (condition) => {
            const regex = /.*[0-9]/g;
            if (condition == undefined || condition == true || condition == null) {
                regex.exec(this.data) != null ? this.final.push(true) : this.final.push(`${this.label} should have numbers`)
            } else {
                regex.exec(this.data) != null ? this.final.push(`${this.label} should not have numbers`) : this.final.push(true)
            }
            return this
        }
        this.hasSmallLetters = (condition) => {
            const regex = /.*[a-z]/g;
            if (condition == undefined || condition == true || condition == null) {
                regex.exec(this.data) != null ? this.final.push(true) : this.final.push(`${this.label} should have small letters`)
            } else {
                regex.exec(this.data) != null ? this.final.push(`${this.label} should not have small letters`) : this.final.push(true)
            }

            return this
        }
        this.requiredObjectKeys = (ArrayOfKeys,objectToCompare, config) => {
            const set = new Set(ArrayOfKeys)
            const keys = Object.keys(objectToCompare)
            const requiredlen = ArrayOfKeys.length   

            let match_count = 0
            let current_arr = []

            keys.map((k,i) => {
                if(set.has(k)){
                    match_count++
                    current_arr.push(k)
                }else{
                    if(config){
                        if(!config.allowExtra){
                            this.final.push(`Extra unregestered key detected - ${k}`)
                        }
                    }
                }
            })

            if(match_count != requiredlen){
                // missing object keys
                const missing = ArrayOfKeys.filter((e,i) => e != current_arr[i] && e)
                this.final.push(`Error: ${this.label} - missing object keys - ${missing}`)
            }else if(match_count != requiredlen){
                this.final.push(true)
            }

            return this
        },
        this.done = () => {
            if (this.final.every(items => items == true)) {
                return {
                    hasError: false
                }
            } else {
                // return this.final.filter(e => e != true)
                return {
                    hasError: true,
                    error: this.final.filter(e => e != true)[0],
                    errors: this.final.filter(e => e != true)
                }
            }
        }
    }
}

module.exports = validate