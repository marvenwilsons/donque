export const state = () => ({
    // heading
    heading_bg_color: undefined,
    heading_text_color: undefined,

    // docker
    docker_bg_color: undefined,
    docker_text_color: undefined,

    // main window
    main_bg_color: undefined,

    // panes
    pane_head_title_color: undefined,
    pane_head_controls_color: undefined,
    pane_head_bg_color: undefined,
    pane_body_bg_color: undefined,
    pane_body_text_color: undefined,

    // notification
    notify_bg_color: undefined,
    notify_text_color: undefined,
    notify_tile_body_bg_color: undefined, // done
    notify_tile_body_bg_hover_color: undefined, // done
    notify_tile_close_btn_color: undefined, // done
    notify_tile_border_color: undefined,
    notify_tile_border_radios: undefined, // done
})

export const mutations = {
    load_theme(state,{theme,theme_content}) {
        state.heading_bg_color          = theme_content.heading_bg_color
        state.heading_text_color        = theme_content.heading_text_color
        state.docker_bg_color           = theme_content.docker_bg_color
        state.docker_text_color         = theme_content.docker_text_color
        state.main_bg_color             = theme_content.main_bg_color
        state.pane_head_title_color     = theme_content.pane_head_title_color
        state.pane_head_controls_color  = theme_content.pane_head_controls_color
        state.pane_body_bg_color        = theme_content.pane_body_bg_color
        state.pane_body_text_color      = theme_content.pane_body_text_color
        state.notify_bg_color           = theme_content.notify_bg_color
        state.notify_text_color         = theme_content.notify_text_color
        state.notify_tile_body_bg_color = theme_content.notify_tile_body_bg_color
        state.notify_tile_body_bg_hover_color = theme_content.notify_tile_body_bg_hover_color
        state.notify_tile_close_btn_hover_color = theme_content.notify_tile_close_btn_hover_color
        state.notify_tile_border_color = theme_content.notify_tile_border_color
        state.notify_tile_border_radios = theme_content.notify_tile_border_radios
        state.pane_head_bg_color = theme_content.pane_head_bg_color
    }
}

export const actions = {
    load_theme({commit}) {

    }
}
