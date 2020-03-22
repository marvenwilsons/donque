export default {
    data: () => ({
        mxn: undefined,
        mxnPaneIndex: undefined,
        mxnStore: undefined
    }),
    mounted() {
        this.mxnPaneIndex = this.mxn.my_pane_index
        this.mxnStore = this.mxn.$store
    },
    // @mxn
    methods: {
        // open next pane
        mxnPaneOpen(name,data,config) {
            this.mxnStore.dispatch("pane_system/open", {
                name,
                index: this.mxnPaneIndex,
                data,
                ...config
            });
        },
        // param1: name of the property you want to mutate in the data list of the next pane
        // param2: the new value of the property 
        mxnPaneAlterNextData(nameOfPropertyYouWantToMutate,newValue) {
            this.mxnStore.commit("pane_system/alter_next_pane_data", {
                pane_index: this.mxnPaneIndex,
                alter: {
                    [nameOfPropertyYouWantToMutate]: newValue
                }
            });  
        },
        systemCall(command,section,method,data) {
            return new Promise((resolve,reject) => {
                this.mxnStore.dispatch("systemCall", {
                    command,
                    section,
                    data,
                    method
                  }).then(({ data, status }) => {            
                    resolve(data.actions)
                  }).catch(err => {
                      console.log('an error', err)
                  })
            })
        },
        mxnModal() {
            console.log('test')
        }
    },
    
}