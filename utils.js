const utils = {}

utils.validateString = function({mode,value}) {
    if(mode === 'has-special-character') {
        const regex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/gim;
        return regex.exec(value) != null;
    } else if(mode === 'is-required') {
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
    } else if(mode === 'has-number') {
        const regex = /[0-9]/gim;
        return regex.exec(value) != null;
    } else if(mode === 'has-whitespace') {
        return value ? value.indexOf(" ") != -1 : false
    } else if(mode === 'is-email') {
        const condition = ["@", ".com"];
        const res = condition.map(charSet => {
            return RegExp(`${charSet}`, "").exec(value) != null;
        });
        return res.join("/") == "true/true";
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

export default utils