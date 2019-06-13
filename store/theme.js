export const state = () => ({
    // heading
    heading_bg_color: undefined,
    heading_text_color: undefined,

    // docker
    docker_bg_color: undefined,
    docker_text_color: undefined,
    docker_hover_text_color: undefined,
    docker_hover_menu_item_bg_color: undefined,

    // main window
    main_bg_color: undefined,

    // panes
    pane_head_title_color: undefined,
    pane_head_controls_color: undefined,
    pane_head_bg_color: undefined,
    pane_body_bg_color: undefined,
    pane_body_text_color: undefined,
    pane_host_style: undefined,

    // notification
    notify_bg_color: undefined,
    notify_text_color: undefined,
    notify_tile_body_bg_color: undefined, // done
    notify_tile_body_bg_hover_color: undefined, // done
    notify_tile_close_btn_color: undefined, // done
    notify_tile_border_color: undefined,
    notify_tile_border_radios: undefined, // done

    // sys, should not be access outside store
    _onMouseleave: [],
    _currentActiveIds: [],
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
        state.docker_hover_text_color = theme_content.docker_hover_text_color
        state.docker_hover_menu_item_bg_color = theme_content.docker_hover_menu_item_bg_color
        state.pane_host_style = theme_content.pane_host_style
    },
    __load_onMouseLeave(state,context) {
        state._onMouseleave.push(context)
    },
    __load_onMouseclick(state,context){
        state._currentActiveIds.push(context)
    },
    __clear_mouseLeave(state) {
        console.log('clear mouse leave')
        state._onMouseleave = []
        state._currentActiveIds = []
    }
}

export const actions = {
    set_class_css_defaults({ }, context){
        context.class.map((cls,cls_index) => {
            const c = document.getElementsByClassName(cls)
            for (let i = 0; i < c.length; i++) {
                c[i].style[context.css_keys[cls_index]] = context.css_values[cls_index]
            }
        })
    }
}