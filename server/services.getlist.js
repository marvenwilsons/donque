module.exports = (req,res,next) => {
    // getting list
    console.log('> getting services list')
    if(res.locals.isValid) {
        // Server TODO: call sql database and get the associated services for this certain user
        // 'collections', 'page layouts'
        // res.locals.services = ['page','collections', 'service-manager', 'market-place']
        res.locals.services = ['collections', 'page', 'service-manager']
        next()
    }
}