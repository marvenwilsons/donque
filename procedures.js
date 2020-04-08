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
        SYSTEM_PROCEDURE_DO_NOT_EXECUTE_OUTSIDE_HELPER_SPAWN_GLOBAL_MODAL({modalType, modalPayload}) {
            // console.log("> spawnGlobalModal")
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
                    key: 'globalModalContent',
                    value: modalPayload
                })
                
            }            
        },
        SYSTEM_PROCEDURE_DO_NOT_EXECUTE_OUTSIDE_HELPER_ANSWER_CURRENT_QUESTION({modalType, modalPayload}) {

        },
        SYSTEM_PROCEDURE_DO_NOT_EXECUTE_OUTSIDE_HELPER_SYSTEM_CALL({section, method, payload}) {

        },
        redirect() {
            
        }
    }
}