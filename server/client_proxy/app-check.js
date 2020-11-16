// checks if the app is initialized
module.exports = (req,res,next) => {
    // call, is username has this apiKey?
    console.log('> Checking application state')
    const {apikey, username} = req.query
    
    const appStateIsSet = false

    if(appStateIsSet) {
        res.locals.isValid = true
        next()
    } else {
        res.status(200).json({
            status: 200,
            response: 'init app'
        })
    }
}