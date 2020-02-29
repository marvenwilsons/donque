const copy = (o) => {
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
    cur_path: undefined,

    // recur
    recur: 0,

    root: undefined,

    // stage related
    stages: [],
    travers_view: undefined,
    cur_pointer: undefined,

    // context box
    opn_opts: undefined,
    opn_opts_pos_top: undefined,
    opn_opts_pos_left: undefined,
    cur_tag: undefined,
    opt_cur_view: 'section',
    context_height: undefined,
    pending_data_to_paste: undefined,
    cannot_be_nested_html_els: ['html_button','html_a','html_video','html_audio','html_img'],
    cannot_be_nested_els: ['plugin'],

    // page editor modal
    page_editor_modal: false,

    // element api
    api_view: undefined,
    api_view_el: undefined,
    api_view_uid: undefined,
    api_view_q: undefined,
    isMaximized: false,
    temp_id: undefined,

    // info box
    info_box_data: undefined,

    //
    css_classes: undefined,
    el_flat_map: [],

    //
    exec_on_commit: [],

    //
    selected_collection: undefined
})

export const getters = {
    routes: state => state.route,
    travers_view_state: state => state.travers_view,
    get_root (state) {
        return state.root
    }
}

export const mutations = {
    // util
    set_any_page_prop(state,{NameOfProp,Operation}) {
        return Operation(state[NameOfProp])
    },

    update_exec_on_commit(state,payload) {
        state.exec_on_commit.push(payload)
    },
    clear_exec_on_commit() {
        console.log('clearing exec on commit')
        state.exec_on_commit = []
    },
    set_selected_collection(state,payload) {
        state.selected_collection = payload
    },

    // page editor modal
    open_page_editor_modal(state) {
        state.page_editor_modal = true
    },
    close_page_editor_modal(state) {
        state.page_editor_modal = false
    },
    // copy
    set_copy(state,data) {
        state.pending_data_to_paste = data
    },
    clear_copy_state(state) {
        state.pending_data_to_paste = undefined
    },
    // maximize
    maximized_editor(state,payload) {
        console.log('max')
        state.isMaximized = payload

    },
    // curpath
    set_cur_path (state, path) {
        state.cur_path = path
    },
    // context box
    set_opts(state,{uid,tag, top,left, context_height}) {
        
        if(state.opn_opts){
            state.opn_opts = undefined
            state.opn_opts_pos_top = 0
            state.opn_opts_pos_left = 0
            state.cur_tag = undefined
            state.context_height = undefined
        } else {
            state.opn_opts = uid
            state.cur_tag = tag
            state.opn_opts_pos_top = top
            state.opn_opts_pos_left = left
            state.context_height = context_height
        }
    },
    clear_opts(state,data){
        state.opn_opts = undefined
    },
    set_context_view(state,data){
        state.opt_cur_view = data
    },

    // info box
    set_info_box(state,{data,index}){
        state.info_box_data = {
            ...data,
            index
        }
    },
    reset_info_box(state){
        state.info_box_data = undefined
    },

    // api view
    set_api_view(state,data){
        if(!data.uid && !data.el){
            state.api_view = data.view
        }else {
            state.api_view_el = data.el
            state.api_view_uid = data.uid
        }
    },
    close_api_view(state){
        state.api_view = undefined
        state.api_view_el = undefined
        state.api_view_uid = undefined
    },
    set_temp_id(state,id) {
        state.temp_id = id
    },

    //
    set_travers_view(state,{obj,pointer}) {
        // activates when there is an item in stage array
        state.travers_view = obj
        state.cur_pointer = pointer
    },

    //
    set_route(state,data) {
        let f = []
        data.map(e => {
            f.push({PageName: e})
        })
        state.route = f
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
    
    update_section(state, { desc, locator, tag, target_prop, exec_on_prop, scoped_variable}) {
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
                const StageData = state
                if (temp == undefined) {
                    temp = latest_root_copy.sections[locator[i]]

                    if (locator.length == 1) {
                        exec_on_prop(temp[target_prop], tag, scoped_variable,temp,StageData)
                    }
                } else {

                    temp = temp[locator[i]]

                    if (i == locator.length - 1) {
                        exec_on_prop(temp[target_prop], tag, scoped_variable,temp,StageData)
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

            const StageData = state
            

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
                        exec_on_prop(temp[target_prop], tag, scoped_variable,temp,StageData)
                    }
                } else {

                    temp = temp[locator[i]]

                    if (i == locator.length - 1){
                        exec_on_prop(temp[target_prop], tag, scoped_variable,temp,StageData)
                        temp = undefined
                    }
                }
            }

            // console.log(latest_stage_copy)
            
            state.stages.push(latest_stage_copy)
        }
    },
    update_section_move_sections(state, { arr, origin, dist }) {
        function array_move(arr, old_index, new_index) {
            if (new_index >= arr.length) {
                var k = new_index - arr.length + 1;
                while (k--) {
                    arr.push(undefined);
                }
            }
            arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
            return arr
        }

        const latest_root_copy = copy(arr)

        array_move(latest_root_copy, origin, dist)

        state.stages.push({
            title: `st-${state.stages.length + 1}`,
            desc: `move section from index ${origin} to ${dist}`,
            obj: {
                sections: latest_root_copy
            }
        })

    },
    update_section_delete_section(state, {index,root}){
        const latest_root_copy = copy(root)

        if (latest_root_copy.length == 1){
            latest_root_copy[0].els = []
        }else {
            latest_root_copy.splice(index, 1)
        }

        state.stages.push({
            title: `st-${state.stages.length + 1}`,
            desc: `delete section index ${index}`,
            obj: {
                sections: latest_root_copy
            }
        })
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
                    // success
                    this.commit("modal/set_modal", {
                        head: "Command response",
                        body: {
                            text: "Changes were saved successfully.",
                            ui: "success"
                        },
                        config: {
                            ui_type: "custom",
                            closable: false,
                            width:'320px',
                            height: '100px'
                        }
                    });

                    // modal
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

                // isAList
                if( state.exec_on_commit.length) {
                    state.exec_on_commit.map(item => {
                        console.log(item)
                        this.dispatch("systemCall",item).then(() => {
                            this.commit('pages/clear_exec_on_commit')
                        }) 
                    })
                } 
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
    addrs_finder_mutator({ }, { el, uid, fn }){
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
    },
    addrs_teller({state},{uid,target_prop,stage_pointer}) {
        let addrs = [];
        let go = false;

        const recor = id => {
            const x = document.getElementById(`${id}`);

            if(x != null){
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
        

        const locator = new_addrs
        let final = undefined
        let temp = undefined
        const latest_stage_copy = copy(state.stages[stage_pointer ? stage_pointer : state.stages.length - 1])


        if(state.stages.length == 0){
            // copy root
            const latest_root_copy = copy(state.root)

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
                } else {

                    temp = temp[locator[i]]

                    if (i == locator.length - 1) {
                        final = temp[target_prop]
                    }
                }
            }
        }else {
            for (let i = 0; i < locator.length; i++) {
                /**
                 * Routine
                 * 
                 * save data to temp then loop to the temp until loop is done
                 * on the last lopp item, update the prop  
                 */
                if (temp == undefined) {
                    temp = latest_stage_copy.obj.sections[locator[i]]
                } else {

                    temp = temp[locator[i]]

                    if (i == locator.length - 1) {
                        final = temp[target_prop]
                    }
                }
            }
        }


        return final
    }
}