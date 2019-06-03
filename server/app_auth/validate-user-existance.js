module.exports = async ({ ...dbs }, { username }) => {
    // @dqsys: auth: validateUserExistance()
    console.log(`** [ValidatingUserExistance] - ${username}`)
    const { doc } = dbs.data

    const fullPrevilegeTitle = [
        'owner'
    ]

    const userdb = doc.db(doc.appName).collection('dq_admins')
    const db = doc.db(doc.appName)

    return new Promise(async (resolve, reject) => {
        return userdb.findOne({ username }).then(user => {
            resolve({
                validated: true,
                accessType: fullPrevilegeTitle.includes(user.title) ? 'full' : 'limited',
                data: {
                    user,
                    db
                }
            })


        }).catch(err => {
            console.log(`   [Auth] User validation fail for ${username}`)
            console.log(err)
            reject(`Fail on validating ${username}`)
        })
    })
}