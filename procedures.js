export default {
    /**
     * this methods should not be called on components
     * only the helper mixin should only be the one cal
     * ling this methods
     */
    methods: {
        /**
         * @spawnGlobalModal
         * @param modalType string
         */
        $SPAWN_GLOBAL_MODAL({modalType, modalPayload}) {
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
        $SYSTEM_CALL({section, method, payload}) {

        },
        $PANESYSTEM_MUTATIONS({mode, payload}) {
            if(mode === 'add-pane') {
                this.$store.commit('paneAdd', {
                    paneIndex: payload.paneIndex,
                    payload
                })
                this.answerPending('--done--')
            } else if(mode === 'delete-pane') {
                this.$store.commit('paneDelete', {
                    paneIndexOrigin: payload.paneIndexOrigin
                })
                this.answerPending('--done--')
            } else if(mode === 'update-pane-data') {
                this.$store.commit('paneUpdateData', {
                    paneIndex: payload.paneIndex,
                    paneData: payload.paneData
                })
                this.answerPending('--done--')
            } else if(mode === 'update-pane-view') {
                this.$store.commit('paneUpdateData', {
                    paneIndex: payload.paneIndex,
                    paneView: payload.paneView
                })
                this.answerPending('--done--')
            }
        },
        $SIDE_BAR_MUTATIONS({mode,payload}) {
            if(mode == 'switch-menu') {
                console.log('side bar mutations')
                this.$store.commit('app/stateController', {
                    key: 'active-sidebar-item',
                    value: payload.selectedMenu
                })
            }
        }
    }
}