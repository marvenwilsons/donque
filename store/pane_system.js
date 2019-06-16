export const state = () => ({
    logic: {
        current_index: undefined,
        index_being_clicked: undefined,
        delete_items_starting_from_index: undefined,
    },
    root_selected: undefined,
    pane_index_config_list: [],
    pane_index_list: []
})

export const getters = {
    config_state: state => state.pane_index_config_list
}


export const mutations = {
    /**
     * when user clicks the menu on the side bar
     * this function executes
     */
    pane_reset(state,payload) {
        if (state.pane_index_list[0] != payload){
            console.log(`--> pane reset to ${payload}`)
            state.pane_index_config_list = []
            state.pane_index_list = [`${payload}`]
        }
    },
    pane_config_reset(state,payload){
        console.log('--> pane config reset')
    },
    /**
     * pane push adds one new pane to the view
     */
    pane_push(state,payload) {
        console.log(`--> pane push ${payload}`)
        state.pane_index_list.push(payload)
    },
    /**
     * pane reset from will execute when a "non last index" pane
     * fire's a pane_push event,
     * it deducts pane starting from the last index to the origin
     * of the pane_push event
     */
    pane_replace_from(state,{startingIndex, compName, numOfComps}) {
        /**
         * to avoid re redering the same component twice
         * when the user hit the same option twice
         */
        if (state.pane_index_list[startingIndex] != compName){
            // remove
            state.pane_index_list.splice(numOfComps, startingIndex)
            state.pane_index_config_list.splice(numOfComps, startingIndex)
            // replace
            state.pane_index_list.splice(numOfComps, 0, compName)
        }
    },
    /**
     * closes the pane
     */
    pane_close(state, compIndex) {
        console.log(`remove ${state.pane_index_list[compIndex]} index ${compIndex}`)

        // remove one item or component from the index supplied        
        if(compIndex === 0){
            state.pane_index_list.shift()
            state.pane_index_config_list.shift()
        }else{
            state.pane_index_list.splice(1, compIndex)
            state.pane_index_config_list.splice(1, compIndex)
        }

    },
    set_pane_config(state, payload) {
        console.log(`--> setting pane config ${payload}`)

        let final_conf = {}

        // de structure
        const {
            title,
            head_controls_visibility,
            pane_head_bg_color,
            pane_head_title_color,
            pane_body_bg_color,
            pane_width,
            closable,
            maximizable,
            head_visibility
        } = payload

        /**
         * Setting defaults if there is no value pass
         * setting defaults for controls
         */
        // the close btn and the maximize btn visibility, default is true
        head_controls_visibility ? final_conf.head_controls_visibility = payload.head_controls_visibility : final_conf.head_controls_visibility = true
        // closabe
        typeof closable === 'boolean' ? final_conf.closable = payload.closable : final_conf.closable = true
        // maximize
        typeof maximizable === 'boolean' ? final_conf.maximizable = payload.maximizable : final_conf.maximizable = true
        // head visibility
        typeof head_visibility === 'boolean' ? final_conf.head_visibility = payload.head_visibility : final_conf.head_visibility = true
        // title
        title ? final_conf.title = payload.title : final_conf.title = 'untitled pane'


        /**
         * Setting defaults for style
         */
        // pane head_bg_color, the background color of head
        pane_head_bg_color ? final_conf.pane_head_bg_color = payload.pane_head_bg_color : final_conf.pane_head_bg_color = this.state.theme.pane_head_bg_color
        // pane head text color
        pane_head_title_color ? final_conf.pane_head_title_color = payload.pane_head_title_color : final_conf.pane_head_title_color = this.state.theme.pane_head_title_color
        // pane width
        pane_width ? final_conf.pane_width = payload.pane_width : final_conf.pane_width = '100%'
        // pane body bg color
        pane_body_bg_color ? final_conf.pane_body_bg_color = payload.pane_body_bg_color : final_conf.pane_body_bg_color = 'transparent'

        /**
         * Push to state
         */
        state.pane_index_config_list.push(final_conf)
    }
}

export const actions = {
    // start only executes in the zero index menu like Dashboard
    start({ commit }, context) {
        commit('pane_reset', context)
    },
    // only executes on non zero index items
    open({ commit, state }, {index,name}) {
        /**
         * pane dependencies
         */
        const i_c_origin = index // index click origin
        const component_name = name.split(" ").join('');

        /**
         * store dependencies
         */
        const n_comps_mw = state.pane_index_list.length // number of components displaying in mainwindow

        /**
         * logic variables
         */
        const s_i_comp_rep = n_comps_mw - 1 // the starting index of the component that needs to be deleted or replace

       
        /**
         * if the numbers of components displaying in the main window
         * is only 1,just add one new component to pane index list,
         * at this point user can only do pane_reset and pane_push
         */
        if(n_comps_mw === 1){
            commit('pane_push', component_name)
        }

        /**
         * if the number of components displaying in the main window
         * deducted by one is not equal to the index click origin
         * it means the component newxt after the click origin index will be
         * deleted or replaced 
         */
        if (n_comps_mw - 1 != i_c_origin){
            commit('pane_replace_from', { 
                startingIndex: s_i_comp_rep, 
                compName: component_name, 
                numOfComps: s_i_comp_rep
            })
        }
    },
    close({ commit, state }, context) {
        console.log('--> close')
        // return to dashboard
        if (state.pane_index_list.length === 1){
            commit('pane_reset', 'Dashboard')
        }else {
            commit('pane_close',context)
        }

    },
    maximize() {
        console.log('--> maximize')
    },
    init_pane({ commit, state }) {
        /**
         * set first pane on page load
         */
        commit('pane_reset', 'Dashboard')
    }
}