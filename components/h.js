import spinner from "./spinner.vue"
import infolog from "./infolog.vue"
export default {
    data: () => ({
        mxn: undefined,
        mxnPaneIndex: undefined,
        mxnStore: undefined
    }),
    mounted() {
        if(!this.mxn) {
            alert(`Error: You forgot to initialized h mixin in the current vue component that you are working in. Please initialize it in the "created" hook of the component, paste this in the created hook--> this.mxn = this`)
            location.reload()
            return
        }

        this.mxnStore = this.mxn.$store
        this.mxnPaneIndex = this.mxn.my_pane_index
        if(this.mxn.my_pane_index == undefined) {
            alert(`Error: You forgot to import the "my_pane_index" prop in the current vue component that you are working in ${this.mxn._name} .vue`)
            location.reload()
            return
        }
    },
    // @mxn
    methods: {
        // open next pane
        // param1: name - the name of the pane and also the name of the component registered in the main window
        // param2: title - the title of the pane that will appear in the next pane head
        // param3: data - the data you want to pass to be used for the next pane
        // param4: config - the pane configuration like pane color, pane width, etc..
        // config - pane_width - controls the width of the pane
        // config - pane_head_bg_color - the color of the pane head
        // config - renderOnce - if set to true the component will be use over and over again but different data
        mxnPaneOpenSync(name,title,data,config) {
            this.mxnStore.commit("pane_system/set_pane_config", {
                title: null,
                pane_width: "800px",
                pane_head_bg_color: "rgb(48, 51, 64)",
                renderOnce: true,
                pane_head_title_color: "white"
              });
            setTimeout(() => {
                this.mxnStore.dispatch("pane_system/open", {
                    name,
                    index: this.mxnPaneIndex,
                    data,
                    ...config
                });
                setTimeout(() => {
                    this.mxnStore.commit("pane_system/alter_pane_config", {
                      pane_index: this.mxnPaneIndex + 1,
                      alter: {
                        title: title
                      }
                    });
                }, 0);
            }, 0);
        },
        // param1: name   - the name of the pane and also the name of the component registered in the main window
        // param2: Object - title - the title of the pane that will appear in the next pane head
        // param2: Object - initData - the initial data to be passed to the next pane
        // param2: Object - propertyToMutate, the property to be fill after systemCall, the property needs to exist first, set first in initData
        // param2: Object - systemCall server request resource
        // param2: config - pane configuration
        // config - pane_width - controls the width of the pane
        // config - pane_head_bg_color - the color of the pane head
        // config - renderOnce - if set to true the component will be use over and over again but different data
        mxnPaneOpenAsync(name,{title,initData,propertyToMutate,systemCall: {command, section, method, data}, config}) {
            if(config && config.wait === true) {

                this.mxnPaneOpenSync(name,title,initData,config)
                // this.systemCall(command,section,method, data).then(response => this.mxnPaneAlterNextData(propertyToMutate,response))
                this.$emit("SetPaneModal", {
                    pane_index: this.mxnPaneIndex + 1,
                    pane_name: title,
                    component: spinner,
                    width: '100%',
                });
                // get resources
                this.systemCall(command,section,method, data).then(response => {
                    setTimeout(() => {
                        this.mxnPaneAlterNextData(propertyToMutate,response)
                        // accessing directly the modal methods in main-window.vue
                        this.$parent.UnSetPaneModal(this.mxnPaneIndex + 1,title)
                    }, 500);
                })
            } else if(!config) {
                if( config.wait === false ) {
                    // open next pane with initial data
                    this.mxnPaneOpenSync(name,title,initData,config)
                    // call server request for resources
                }                
            }            
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
        // server request
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
        // modal log
        mxnModalLog(component, config) {
            if(!config) {
                config = {
                    width: '100px',
                    CanBeClose: false,
                    header: false,
                    title: 'untitled modal'
                }
            } else {
                config = {
                    ...config,
                    CanBeClose: config.closable
                }
            }
            this.$emit("SetPaneModal", {
                pane_index: this.mxnPaneIndex,
                pane_name: this.mxn.$store.state.pane_system.pane_index_config_list[this.mxnPaneIndex].title,
                component,
                ...config,

            });
        },
        mxnInfoLog(message) {
            console.log('mxnInfoLog')
            setTimeout(() => {
                this.mxnModalLog(infolog, {
                    width: '400px',
                    data: message
                })
            }, 500);
                
        },
        mxnErrLog(errMessage) {

        },
        // closese the modal
        mxnModalDone() {
            this.$emit('UnSetPaneModal')
        }
    },
    
}