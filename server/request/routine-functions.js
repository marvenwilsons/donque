function r(data) {
    const responseObject = (statusCode,body,user,message) => {
        return {
            statusCode,
            body,
            user,
            message,
            timeStamp: new Date
        } 
    }
    return {
        inPath(path) {
            return {
                byUser({username,userToken,userType}) {
                    if(!username || !userToken || !userType) {
                        throw 'Invalid user object received in byUser function'
                    }
                    return {
                        check(credintialCheckMethod) {
                            if(!credintialCheckMethod || typeof credintialCheckMethod != 'function') {
                                throw 'Invalid .check value'
                            }
                            return {
                                byDoing(fn){
                                    if(!fn || typeof fn != 'function') {
                                        throw 'Invalid .byDoing value'
                                    }
                                    return credintialCheckMethod(username,userToken,userType)
                                    .then(isValidUser => {
                                        if(isValidUser === true) {
                                            return fn(path,data).then(body => {
                                                return responseObject(200,body,username,'OK')
                                            })
                                        } else {
                                            return responseObject(401,data,username,'Unauthorized')
                                        }
                                    })
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

module.exports = r