const gots = ({ tag, name, role, inlineStyle, innerText, classList, els, path, createdOn, createdBy, lastModified }) => {
    return {
        tag: tag ? tag : 'html_div',
        name,
        role,
        inlineStyle: inlineStyle ? inlineStyle : {},
        innerText,
        classList: classList ? classList : [],
        els: els ? els : [],
        data_collection: {},
        "stat": {
            lastModified,
            createdOn,
            createdBy,
            type: "",
            path
        },
        "security": {
            isLokced: false,
            password: "",
            allowedAdminsToWrite: [],
            access_type: 'public',
            is_under_maintenance: false
        },
        commits: [],
        uid: ((length) => {
            var result = '';
            var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for (var i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        })(5)
    }
}
const copy = (o, uid) => {
    if (o === null) return null;

    var output, v, key;
    output = Array.isArray(o) ? [] : {};
    for (key in o) {
        v = o[key];
        output[key] = typeof v === "object" ? copy(v) : v;
    }

    return output;
}

export const state = () => ({

    // routing sample
    route: undefined,
    // route contents
    route_contents: {},

    // recur
    recur: 0,

    root: undefined,

    stages: [],
    travers_view: undefined
})

export const getters = {
    routes: state => state.route
}

export const mutations = {
    set_route(state,data) {
        state.route = data
        // console.log('setting route')
    },
    set_recur(state,data) {
        state.recur = state.recur + 1
    },
    set_root(state,data) {
        console.log('setting root'),
        console.log(data)
        state.root = data
    },

    /**
     * stages
     */
    stage_push(state,data) {
        state.stages.push({
            title: `st-${state.stages.length + 1}`,
            desc: data.desc,
            obj: {
                sections: data.obj.sections,
            }
        })
    },
    update_section(state, { desc, locator, tag, target_prop, exec_on_prop}) {
        // copy the latest stage and push to the stage

        if (state.stages.length == 0){
            console.log('1st case')
            state.stages.push({
                title: `st-${state.stages.length + 1}`,
                desc: `Added HTML ${tag} element to default section`,
                obj: {
                    sections: [
                        {
                            els: [
                                gots({
                                    tag: `html_${tag}`
                                })
                            ],
                            role: state.root.sections[0].role,
                            uid: state.root.sections[0].uid
                        }
                    ]
                }
            })
        }else {
            /**
             * Locate the target property by looping through
             * the locators array, each item of the array is a key
             * to the object "the last index value of the stage".
             * 
             * each loop will go down one level until the last item in the locators array
             * is reach.
             * 
             * each loop accesses the inner value of stage object, it can be an object, array etc..
             * each loop the data that is being accessed will be saved to a temp variable
             */

            // copying stage latest entry            
            const latest_stage_copy = copy(state.stages[state.stages.length - 1])
            
            // mutate stage desc    
            latest_stage_copy.desc = desc

            let temp = undefined
            
            // console.log('The locator')
            // console.log(locator)

            // inserting the new section view object
            for(let i = 0; i < locator.length; i++){
                /**
                 * Routine
                 * 
                 * save data to temp then loop to the temp until loop is done
                 * on the last lopp item, update the prop  
                 */                    
                if(temp == undefined){
                    temp = latest_stage_copy.obj.sections[locator[i]]

                    if(locator.length == 1){
                        exec_on_prop(temp[target_prop])
                    }
                } else {

                    temp = temp[locator[i]]

                    // console.log('the temp')
                    // console.log(temp)
                    // console.log('target_prop')
                    // console.log(target_prop)

                    if (i == locator.length - 1){
                        exec_on_prop(temp[target_prop])
                        temp = undefined
                    }
                }
            }

            // console.log(latest_stage_copy)
            
            state.stages.push(latest_stage_copy)

            console.log('')
            console.log('')
        }
    },
    save_stage(state){
        if (state.stages.length == 0){
            this.commit("modal/set_modal", {
                head: "dqPageLogicError",
                body: "There is currently nothing to save",
                config: {
                    ui_type: "err",
                    closable: false
                }
            });
        } else {
            console.log(state.stages[state.stages.length - 1].obj.sections)

            const root_copy = copy(state.root)
            root_copy.sections = state.stages[state.stages.length - 1].obj.sections
            console.log(root_copy)

            // this.commit("modal/set_modal", {
            //     head: "Please wait",
            //     body: "Saving ...",
            //     config: {
            //         ui_type: "msg",
            //         closable: false
            //     }
            // });
            state.stages = []
        }
    },
}
export const actions = {
    update_root({ commit, state }, context){
        this.dispatch("systemCall", {
            command: "getPage",
            section: "pageMethods",
            data: {
                path: context
            },
            method: "post"
        }).then(({ status, data }) => {
            if (status) {
                console.log('yeeehaa!')
                commit('set_root', data.data)
            } else {
                this.commit("modal/set_modal", {
                    head: "Error while fetching editor data",
                    body: data.msg,
                    config: {
                        ui_type: "err",
                        closable: false
                    }
                });
            }
        });
    },
    get_routes({commit}){
        this.dispatch('systemCall', {
            command: "getAllRoutes",
            section: "pageMethods",
            username: localStorage.getItem("username"),
            token: localStorage.getItem("auth"),
            method: "get"
        })
            .then(data => {                
                if (data.status){
                    commit('set_route', data.data.actions[0].contents)
                } else {
                    this.commit("modal/set_modal", {
                        head: "Error while fetching all routes",
                        body: data.data.msg,
                        config: {
                            ui_type: "prompt_err",
                            closable: false
                        }
                    });
                }   
            })
            .catch(err => {
                this.commit("modal/set_modal", {
                    head: "Page error",
                    body: err,
                    config: {
                        ui_type: "prompt_err",
                        closable: false
                    }
                });
            });
    }
}