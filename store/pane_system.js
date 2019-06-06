export const state = () => ({
    config: {
        head_bg_color: undefined,
        head_text_color: undefined,
        head_text_font: undefined,
        width: undefined,
        body_bg_color: undefined,
        closable: true,
        maximizable: true,
    },
    data: {
        head_text: undefined,
        current_components: [],
    },
    logic: {
        current_index: undefined,
        index_being_clicked: undefined,
        delete_items_starting_from_index: undefined,
    },
    pane_index_config_list: [],
    pane_index_list: []
})


export const mutations = {
    /**
     * when user clicks the menu on the side bar
     * this function executes
     */
    pane_reset() {

    },
    /**
     * pane push adds one new pane to the view
     */
    pane_push() {

    },
    /**
     * pane reset from will execute when a "non last index" pane
     * fire's a pane_push event,
     * it deducts pane starting from the last index to the origin
     * of the pane_push event
     */
    pane_reset_from() {

    },
    /**
     * closes the pane
     */
    pane_close() {

    },
    /**
     * maximizes the pane
     */
    pane_maximize() {

    }
}

export const actions = {
    open() {

    }
}