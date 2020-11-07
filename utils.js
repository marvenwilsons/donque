const utils = {}

utils.validateString = function({mode,value}) {
    if(mode === 'has-special-character') {
        const regex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/gim;
        return regex.exec(value) != null;
    }
    
    if(mode === 'is-required') {
        if(value === '' || value === null || value === undefined) {
            return true
        } else {
            const x = value.replace(' ','')
            if(x === '') {
                return true
            } else {
                return false
            }
        }
    }
    
    if(mode === 'has-number') {
        const regex = /[0-9]/gim;
        return regex.exec(value) != null;
    }
    
    if(mode === 'has-whitespace') {
        return value ? value.indexOf(" ") != -1 : false
    }

    if(mode === 'has-uppercase') {
        const regex = /.*[A-Z]/g;
        return regex.exec(value) != null
    }

    if(mode === 'has-lowercase') {
        const regex = /.*[a-z]/g;
        return regex.exec(value) != null
    }
    
    if(mode === 'is-email') {
        const condition = ["@", ".com"];
        const res = condition.map(charSet => {
            return RegExp(`${charSet}`, "").exec(value) != null;
        });
        return res.join("/") == "true/true";
    }

    if(mode === 'has-setof-chars') {
        const {ArrayOfCharacters, CharacterToCompare} = value
        const res = ArrayOfCharacters.map(charSet => {
            return RegExp(`${charSet}`, "").exec(CharacterToCompare) != null;
        });
        const isTrue = (current) => current === true 
        return res.every(isTrue)
    }
}
utils.validator = {
    hasSpecialCharacters(char) {
        if(!char) return false
        if(typeof char == 'number') return false
        const c = char.toString()
        const regex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/gim;
        return regex.exec(c) == null ? false : true
    },
    hasNumber(char) {
        const regex = /[0-9]/gim;
        return regex.exec(char) != null;
    },
    hasWhiteSpace(char) {
        if(!char) return false
        if(typeof char == 'number') return false

        const c = char.toString()
        return c ? c.indexOf(" ") != -1 : false
    },
    hasUppperCase(char) {
        if(!char) return false
        const regex = /.*[A-Z]/g;
        return regex.exec(char) != null
    },
    hasLowerCase(char) {
        if(!char) return false
        const regex = /.*[a-z]/g;
        return regex.exec(char) != null
    },
    isEmail(char) {
        if(!char) return false
        if(validator.hasSpecialCharacters(char) == false) return false
        const c = char.split('@')
        const userIdentifier = c[0]
        const emailEnding = c[1]
        if(c.length != 2) return false
        if(!userIdentifier) return false
        if(validator.hasSpecialCharacters(userIdentifier)) return false
        if(validator.hasWhiteSpace(userIdentifier)) return false
        if(validator.hasLowerCase(userIdentifier) == false) return false
        let e = emailEnding.split('.')
        if(e.length != 2) return false
        if(!e[1]) return false
        if(validator.hasUppperCase(e[1]) || validator.hasUppperCase(e[0])) return false
        if(e[1].length == 1 || e[0].length == 1) return false
        if(e[1].length > 5) return false
        e[1] = e[1].trim()
        if(validator.hasSpecialCharacters(e[1]) || validator.hasSpecialCharacters(e[0])) return false
        if(validator.hasWhiteSpace(e[1]) || validator.hasWhiteSpace(e[0])) return false
        return true
    }
}
utils.commonStringValidations = {
    // string should not have whitspaces
    // string should not have special characters
    // string should be defined
    vs1: function(name,string,minCharLen,allowNumbers) {
        if(allowNumbers === false) {
            if(utils.validateString({mode:'has-number', value: string}) === true) {
                throw `invalid-${name}: ${name} should not have numbers`
            }
        } 
        
        if(utils.validateString({mode:'has-whitespace', value: string}) === true ) {
            throw `invalid-${name}: ${name} should not have any whitespaces`
        } 
        
        if(utils.validateString({mode:'has-special-character', value: string}) === true ) {
            throw `invalid-${name}: ${name} should not have special characters`
        } 
        
        if(utils.validateString({mode:'is-required', value: string}) === true) {
            throw `invalid-${name}: ${name} cannot be left undefined, ${name} is required`
        } 
        
        if(minCharLen) {
            if(string.length < minCharLen) {
                throw `invalid-${name}: ${name} should at least have a minimum of ${minCharLen} characters`
            }
        } 

        return string
    }
}
utils.hasSetOfKeys = (ArrayOfKeys, ObjectToCompare) => {            
    let res = []
    Object.keys(ObjectToCompare).map(e => {
        if(ArrayOfKeys.indexOf(e) != -1) {
            res.push(true)
        }
    })

    const isTrue = (current) => current === true 
    return res.every(isTrue) && ArrayOfKeys.length === res.length
}
utils.pipe = function (...funcs) {
    return function(val) {
        let lastResult
        for(func of funcs) {
            lastResult = func(lastResult || val)
        }
        return lastResult
    }
    /**usage -> this.pipe(fn1,fn2,fn3)('input') */
}
utils.lowercaseAlphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
utils.uppercaseAlphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
utils.numberStrings = ['0','1','2','3','4','5','6','7','8','9']
utils.specialCharacters = ['!','@','#','$','%','^','&','*','(',')','_','+']
utils.copy = function (o) {
    if (o === null) return null;
        
                var output, v, key;
            output = Array.isArray(o) ? [] : {};
            for (key in o) {
            v = o[key];
            output[key] = typeof v === "object" ? this.cp(v) : v;
        }
        
    return output;
}
utils.randId = function(length) {
    var result = "";
        var characters =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
          result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
          );
        }
    return result;
}
const crypto = require('crypto')
utils.encrypt = (ValueToHash,Salt) => {
    let cipher = crypto.createCipher('aes-128-cbc',`${ValueToHash,Salt}`)
    let encrypted = cipher.update(ValueToHash,'utf8','hex')
    encrypted += cipher.final('hex')
    return encrypted
}
utils.decrypt = (ValueToReHash,Salt) => {
    const encrypted = e.encrypt(ValueToReHash,Salt)

    let decipher = crypto.createDecipher('aes-128-cbc', `${ValueToReHash, Salt}`)
    let decrypted = decipher.update(encrypted,'hex','utf8')
    decrypted += decipher.final('utf-8')
    return decrypted 
}
export default utils