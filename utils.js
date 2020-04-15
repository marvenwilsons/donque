const utils = {}

utils.validateString = function({mode,value}) {
    if(mode === 'has-special-character') {
        const regex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/gim;
        return regex.exec(value) != null;
    } else if(mode === 'has-number') {
        const regex = /[0-9]/gim;
        return regex.exec(value) != null;
    } else if(mode === 'has-whitespace') {
        return value.indexOf(" ") != -1
    } else if(mode === 'is-required') {
        return value.trim() != ""
    } else if(mode === 'is-email') {
        const condition = ["@", ".com"];
        const res = condition.map(charSet => {
            return RegExp(`${charSet}`, "").exec(value) != null;
        });
        return res.join("/") == "true/true";
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
    return (length => {
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
      })(length)
}

export default utils