export default {
    methods: {
        checkLocalStorageForAdminCredentials() {
            console.log("> checkLocalStorageForAdminCredentials")
        },
        clearLocalStorage() {
            console.log("> clearLocalStorage")


        },
        setLocalStorage() {
            console.log("> setLocalStorage")


        },
        /**
         * @spawnGlobalModal
         * @param modalType string
         */
        spawnGlobalModal({modalType}) {
            console.log("> spawnGlobalModal")
            this.h.$store.commit('stateController', {
                key: 'globalModalState',
                value: true
            })
        },
        redirect() {
            
        },
        /**
         * queue
         */
        clearQueue() {

        },
        pushToQueue() {

        }
    },
    created() {
        console.log('> moutimng procedures')
    }
}