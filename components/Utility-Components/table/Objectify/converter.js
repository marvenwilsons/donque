export default function vanilaToObjectifyObj(schema, obj) {
    if (schema == null) {
        return obj
    }


    for (let key in schema) {
        if (schema[key].type == 'string' || schema[key].type == 'number') {
            if (obj){
                if (schema[key].default != obj[key]) {
                    schema[key].default = obj[key]
                }
            }            
        } else if (schema[key].type == 'select') {
            if(obj) {
                if (schema[key].options[schema[key].default] != obj[key]) {
                    schema[key].default

                    const IsBoolean = (arg) => {
                        if (arg == 'true') {
                            return true
                        } else if (arg == 'false') {
                            return false
                        } else {
                            return arg
                        }
                    }
                    schema[key].default = schema[key].options.indexOf(IsBoolean(obj[key]))
                }
            }
        }
    }

    return schema
}