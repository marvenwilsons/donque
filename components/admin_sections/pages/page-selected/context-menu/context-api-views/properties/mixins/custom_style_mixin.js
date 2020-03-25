/**
 * Responsible for Custom Inline Style pane logic
 * in propertes
 */

export default {
    data: () => ({
        inlineStyle: undefined,
        inlineCode: undefined,
        monacoInlineToggleMode: "rerender",
        monaco_tab_counter: 0,
        monaco_trigger: false,
    }),
    // computed: {
    //     _root() {
    //         return this.$store.state.pages.root;
    //     },
    // },
    methods: {
        monacoTabChange() {
            this.monaco_tab_counter++;
            if (this.monaco_tab_counter == 2) {
                this.monacoInlineToggleMode = "opacity";
            } else if (this.monaco_tab_counter > 2) {
                this.monaco_tab_counter = 1;
            }
        },
        stateMonacoChanges() {
            this.monaco_trigger = !this.monaco_trigger;
        },
        csm_hotUpdate(updated_Data) {
            // inline style hot update
            if (JSON.stringify(updated_Data.inlineStyle) != JSON.stringify(this.inlineStyle)) {
                this.inlineStyle = undefined
                setTimeout(() => {
                this.inlineStyle = updated_Data.inlineStyle;                    
                }, 0);
            }
            // inline code hot update
            if (JSON.stringify(updated_Data.inlineCode) != JSON.stringify(this.inlineCode)) {
                this.inlineCode = updated_Data.inlineCode;
            }
        }
    },
    mounted() {
        this.inlineStyle = this.data.inlineStyle;
        this.inlineCode = this.data.inlineCode;
    }
}