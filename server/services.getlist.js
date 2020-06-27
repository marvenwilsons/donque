module.exports = (req,res,next) => {
    // getting list
    console.log('> getting services list')
    if(res.locals.isValid) {
        // TODO: call sql database and get the associated services for this certain user
        res.locals.services = ['page','collections', 'page layouts']
        next()
    }
}