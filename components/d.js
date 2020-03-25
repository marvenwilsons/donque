import objtifyConverter from "@/components/Utility-Components/Objectify/converter"

export default {
    data: () => ({
        mixin: undefined
    }),
    methods: {
        'Objectify.convert'(Schema,VanillaObject) {
            return objtifyConverter(Schema,VanillaObject)
        }
    },
    mounted() {
        this.mixin = {
            pane: {
                SetPaneModal({pane_index,component,title,width,CanBeClose,header},_this) {
                    console.log('setting pane modal baby!')
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