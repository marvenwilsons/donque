export default {
    data: () => ({
        mixin: undefined
    }),
    methods: {
        // 
    },
    mounted() {
        this.mixin = {
            pane: {
                SetPaneModal({pane_index,component,title,width,CanBeClose,header},_this) {
                    const ctx = {
                        pane_index: pane_index,
                        alter: {
                          pane_modal: {
                              component,
                              title,
                              width,CanBeClose,
                              header
                          }
                        }
                    }
                    _this.$store.commit("pane_system/alter_pane_config", ctx);
                }
            }
        }
    }
}