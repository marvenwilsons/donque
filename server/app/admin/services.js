module.exports = {
    /**
     * Add new service, can be installed, or from service maker
     */
    async addService(db, {service_title, service_config, service_body, initial_data_fetching_method, initial_data_fetching_path}) {
        try {
            const result = await db.query('INSERT INTO dq_service (service_title, service_config, service_body, initial_data_fetching_method, initial_data_fetching_path) VALUES ($1, $2, $3, $4, $5)', [
                service_title,
                service_config,
                service_body, /** long text, will be executed in front end */
                initial_data_fetching_method, /** collection or 3rd party */
                initial_data_fetching_path /** ei: if collection: collection.collectionName, if 3rd part: 'https://exmaple.com/jsondata' */
            ])

            return result
        } catch(err) {
            console.log(err)
        }
    },
    /**
     * Fetches the initial data of the collection
     */
    async getServiceInitialData(path, type) {
        if(type == 'collection') {
            /**
             * fetch the collection
             */
        } else if(type == '3rd party') {
            /**
             * use node fetch here
             */
        }
    }
}