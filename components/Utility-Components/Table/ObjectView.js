export default {
    data: () => ({
        appearance:{
            title_text_color: 'gray',
            sub_title_description_text_color: 'gray',

            wrap_around_border_color: 'lightgray',
            divider_border_color:'lightgray',
            
            keys_bg_color: 'whitesmoke',
            keys_text_color: 'black',
            values_bg_color: 'whitesmoke',
            values_text_color: 'black',

            select_arrow_down_color: 'black',

            button_bg_color: '#303340',
            button_text_color: 'white',

            background_selected: '',

            modal_overlay_bg: 'black'
        },
        config:{
            data: undefined, // object a schema
            operation:'r', // rw , r
            submit_button: 'DEMO SUBMIT', // string: if supplied the button will appear
            show_modal: false,
            allowRemoveProp: false, // only in read only operations
        }
    }),
    created() {
        this.config.data = this.data
    }
}