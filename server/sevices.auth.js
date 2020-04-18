module.exports = (req,res,next) => {
    // call, is username has this apiKey?
    console.log('> authenticating')
    const {apikey, username} = req.query
    
    const isValidRequest = true

    if(isValidRequest) {
        res.locals.isValid = true
        next()
    } else {
        res.status(400).json({
            err: 'authentication failed'
        })
        next()
    }
}