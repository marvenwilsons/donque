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
    travers_view: undefined,

    //
    css_classes: undefined,
    el_flat_map: [],

    methods: {
        addrs_finder: ({ el, uid, fn }) => {
            
        }
    }
})

export const getters = {
    routes: state => state.route
}

export const mutations = {
    set_route(state,data) {
        state.route = data
        // console.log('setting route')
    },
    set_el_flat_map(state,data){
        state.el_flat_map.push(data)
    },
    set_recur(state,data) {
        state.recur = state.recur + 1
    },
    set_root(state,data) {
        console.log('setting root'),
        state.root = data
    },
    set_css_class(state,data){
        state.css_classes = data
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

            // copy root
            const latest_root_copy = copy(state.root)

            // mutate desc
            latest_root_copy.desc = desc

            let temp = undefined

            for (let i = 0; i < locator.length; i++) {
                /**
                 * Routine
                 * 
                 * save data to temp then loop to the temp until loop is done
                 * on the last lopp item, update the prop  
                 */
                if (temp == undefined) {
                    temp = latest_root_copy.sections[locator[i]]

                    if (locator.length == 1) {
                        exec_on_prop(temp[target_prop])
                    }
                } else {

                    temp = temp[locator[i]]

                    if (i == locator.length - 1) {
                        exec_on_prop(temp[target_prop])
                        temp = undefined
                    }
                }
            }

            state.stages.push({
                title: `st-${state.stages.length + 1}`,
                desc: desc,
                obj: {
                    sections: latest_root_copy.sections
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

                    if (i == locator.length - 1){
                        console.log('target_prop')
                        console.log(target_prop)
                        console.log(temp)

                        exec_on_prop(temp[target_prop])
                        temp = undefined
                    }
                }
            }

            // console.log(latest_stage_copy)
            
            state.stages.push(latest_stage_copy)
        }
    },
    clear_stage(state){
        state.stages = []
    },
    save_stage(state,{path}){
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
            const root_copy = copy(state.root)
            root_copy.sections = state.stages[state.stages.length - 1].obj.sections

            this.commit("modal/set_modal", {
                head: "Please wait",
                body: "Saving changes ...",
                config: {
                    ui_type: "msg",
                    closable: false
                }
            });

            this.dispatch('systemCall', {
                command: 'updatePage',
                section: 'pageMethods',
                data: {
                    path,
                    content: root_copy
                },
                method: "post"
            }).then((res) => {
                if(res.status){
                    this.commit("modal/set_modal", {
                        head: "Saved",
                        body: "Changes were saved successfully.",
                        config: {
                            ui_type: "msg",
                            closable: false
                        }
                    });

                    this.dispatch("systemCall", {
                        command: "getPage",
                        section: "pageMethods",
                        data: {
                            path: path
                        },
                        method: "post"
                    })
                        .then(({ status, data }) => {
                            if (status) {
                                this.commit('pages/set_root', data.data)
                                this.page_data = data.data;
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
                        })
                }
                this.commit('pages/clear_stage')
            })
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
    },
    addrs_finder({ }, { el, uid, fn }){
        let addrs = [];
        let go = false;

        const recor = id => {
            const x = document.getElementById(`${id}`);

            if (x.parentElement.id == "dq-viz-host") {
                /**
                 * split id > push to array
                 * if the id of the element is equal to dq-viz-host
                 * trim and split the id discard the character body
                 * and parse the it to int then push to addrs array
                 */
                addrs.push(
                    parseInt(x.id.split("--")[0]) == NaN
                        ? x.id.split("--")[0]
                        : parseInt(x.id.split("--")[0])
                );

                //
                go = true;
            }
            // if the is is not dq-viz-host
            else {
                const x = document.getElementById(`${id}`);

                const gtr = r => {
                    if (r.parentElement.id != "dq-page-editor-area-c1") {
                        gtr(r.parentElement);

                        if (r.id) {
                            addrs.push(parseInt(r.id.split("--")[0]));
                        }
                    } else {
                        // replace the first index value of the addrs array to
                        // data attribute value, this represents the section
                        addrs.splice(0, 1, parseInt(r.getAttribute("data")));

                        //
                        go = true;
                    }
                };

                addrs.push(
                    parseInt(id.split("--")[0]) == NaN
                        ? id.split("--")[0]
                        : parseInt(id.split("--")[0])
                );

                /**
                 * if the html element has no id, execute the gtr function.
                 * the gtr function is a recorsive function,
                 * the gtr function's main purpose is to find the id dq-page-editor-area-c1
                 * until then the gtr function will kepp on executing on its self
                 *
                 * if the current html being examine by each execution of the gtr function
                 * has an id, that id will be push to addrs array
                 *
                 * if the id dq-page-editor-area-c1 found
                 */
                if (x.parentElement.id == "") {
                    const asfd = gtr(x);
                } else {
                }
            }
        };

        /**
         * 1. processing starts here! getting the addrs of the element being click
         * by reading the ID of each element until the parent host id is reach,
         * constant addrs mutation
         */
        recor(uid);

        const isOdd = num => num % 2;

        let cntr = -1;
        let new_addrs = [];

        /**
         * Currently the addrs array is an array of numbers which
         * represents the position index of arrays in the els object
         * insided the section object of the stage object located in the store.
         *
         * ex. current addrs state: [0,0]
         * ex. addrs after for loop: [0,'els',0,'els']
         *
         * 2. push 'els' string to addrs array if index is even,
         * push addrs value according by index if it is odd.
         */
        for (let i = 0; i < addrs.length * 2; i++) {
            if (isOdd(i)) {
                new_addrs.push("els");
            } else {
                cntr++;
                new_addrs.push(addrs[cntr]);
            }
        }

        /**
         * 3
         */
        new_addrs.pop();

        /**
         * 4.
         * send final data to store for new stage entry
         */
        if (go) {
            fn(new_addrs);
            addrs = [];
            new_addrs = [];
        }
    }
}