export const state = () => ({
    // config
    visibility: false,
    closable: false,
    head_visibility: false,
    ui_type: undefined, // err, msg, success, custom

    // content
    body: undefined,
    head: undefined
})

export const mutations = {
    // when call it will show a spinner into a screen
    set_visibility(state,value) {
        state.visibility = value
    },
        
    set_modal(state,{body,head,config}){
        const {visibility,closable,head_visibility, ui_type} = config 

        // setting config
        typeof visibility === 'boolean' ? state.visibility = visibility : state.visibility = true
        typeof closable === 'boolean' ? state.closable = closable : state.closable = true
        typeof head_visibility === 'boolean' ? state.head_visibility = head_visibility : state.head_visibility = head_visibility

        // required each call to have ui_type passed in config object
        state.ui_type = ui_type

        // content
        state.body = body
        state.head = head
    }
}

export const actions = {
    // after modal close
    // after modal ok press
}