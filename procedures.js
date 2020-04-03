export default {
    /**
     * this methods should not be called on components
     * only the helper mixin should only be the one cal
     * ling this methods
     */
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
        spawnGlobalModal({modalType, modalPayload}) {
            console.log("> spawnGlobalModal")
            if(this.h.$store.state.queue.length == 0) {
                alert('ERR: Invalid spawnGlobalModal() function invocation, procedures should not directly called on components')
            } else {
                this.h.$store.commit('stateController', {
                    key: 'globalModalState',
                    value: true
                })
                this.h.$store.commit('stateController', {
                    key: 'globalModalContentType',
                    value: modalType
                })
                this.h.$store.commit('stateController', {
                    key: 'globalModalDynamicContent',
                    value: modalPayload
                })
            }            
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