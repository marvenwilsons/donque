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
    _currentActiveIds: []
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
    set_active({ state, commit }, context){
        context.ids.map((ids, id_index) => {
            const fn = () => {
                const el = document.getElementById(ids)
                el.style[context.css_keys[id_index]] = `${state[context.css_value_on[id_index]]}`
            }
            // push current active ids
            commit('__load_onMouseclick', ids)
            // push functions to array to be executed later
            commit('__load_onMouseLeave', fn)
            
            state._onMouseleave.map(fn => {
                setTimeout(() => {
                    fn()
                }, 200)
            })
            
        })
    },
    mouseover({ state }, context) {
        context.ids.map((ids,id_index) => {
            const el = document.getElementById(ids)
            el.style[context.css_keys[id_index]] = `${state[context.css_values[id_index]]}`
        })        
    },
    mouseleave({ commit, state }, context) {
        context.ids.map((ids, id_index) => {
            const el = document.getElementById(ids)
            el.style[context.css_keys[id_index]] = `${state[context.css_values[id_index]]}`
        })

        state._onMouseleave.map(fn => {
            fn()
        })
    },
    set_class_css_defaults({ }, context){
        context.class.map((cls,cls_index) => {
            const c = document.getElementsByClassName(cls)
            for (let i = 0; i < c.length; i++) {
                c[i].style[context.css_keys[cls_index]] = context.css_values[cls_index]
            }
        })
    },
    toggle_active({state, commit}, context){
        // first click
        if(state._currentActiveIds.length == 0){
            /**
             * populate array and apply styles
             */
            context.ids.map((ids, id_index) => {
                const fn = () => {
                    const el = document.getElementById(ids)
                    el.style[context.css_keys[id_index]] = `${state[context.css_value_on[id_index]]}`
                }
                // push current active ids
                commit('__load_onMouseclick', ids)
                // push functions to array to be executed later
                commit('__load_onMouseLeave', fn)
            })
        }else {
            // clear the array and apply the off version style
            state._currentActiveIds.map((ids,id_index) => {
                // Apply the "off" stlye or the un-active style
                const el = document.getElementById(ids)
                el.style[context.css_keys[id_index]] = `${state[context.css_value_off[id_index]]}`
            })
            commit('__clear_mouseLeave')

            context.ids.map((ids, id_index) => {
                // Apply the "on" style or the active style
                const fn = () => {
                    const el = document.getElementById(ids)
                    el.style[context.css_keys[id_index]] = `${state[context.css_value_on[id_index]]}`
                }
                // push current active ids
                commit('__load_onMouseclick', ids)
                // push functions to array to be executed later
                commit('__load_onMouseLeave', fn)
            })
        }
        
    }
}