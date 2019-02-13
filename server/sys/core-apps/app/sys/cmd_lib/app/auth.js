const permissionHandler = (permissions) => {
    return true
}

const titleHandler = (titles) => {
    return true
}

const sectionHandler = (section) => {

}

const functionHandler = (func) => {
    // return {
    //     status:false,
    //     data:'func needs addtional auth process'
    // }
    true
}

const validateUser = ({username,password,token}) => {
    return true
}

const auth = async ({ selectedCommand, username, password, token, command, data, section, method },callback) => {
    const isAValidUser = await validateUser({username,password,token})

    if(isAValidUser){
        const res = [
            { output: permissionHandler(selectedCommand.prop)},
            { output: titleHandler(selectedCommand.prop)},
            { output: functionHandler(selectedCommand.prop)}
        ]
        let pIndex = undefined
        const temp = res.map((e,i) => e.output === true ? true : pIndex = i)

        if(temp.every(items => items === true)){
            callback(null,{
                status: true
            })
        }else{
            callback(res[pIndex].output,null)
        }
    }else{
        callback({
            status: false,
            data: {
                msg: `Cannot validate "${username}" because it does not exist in the database`
            }
        },null)
    }
}

module.exports = auth