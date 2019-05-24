module.export = async ({ ...dbs }, { command }) => {
    // @dqsys: auth: firstLayerAuthentication()
    /**
     * Insures nobody can call an api that is not logged in
     * a. check if there are live admins in current live admins array
     */
    console.log('** [FirstLayerAuth] Starting')
    console.log('   [FirstLayerAuth] Checking current live admins')

    const { doc } = dbs.data
    const userdb = doc.db(doc.appName).collection('dq_app')
    const db = doc.db(doc.appName)

    let liveAdmins = undefined
    const currentLiveAdmins = await userdb
        .find()
        .forEach(items => {
            liveAdmins = items
        })
        .then(() => {
            return liveAdmins.currentLiveAdmins
        })
    console.log(currentLiveAdmins)
    return new Promise((resolve, reject) => {
        if (currentLiveAdmins.length === 0 && command != 'adminlogin') {
            resolve(false)
        } else {
            resolve(true)
        }
    })
}