<template>
    <div class="flex flexcol relative">
        <span class="absolute fullwidth">
            <main class="borderred">
                test    
            </main>
            <main role="terminal-input" class="flex borderred" >
                <div>asdf</div> <input class="fullwidth" type="text">
            </main>
        </span>
    </div>
</template>

<script>
export default {
    data(){
        return {
            user_input: undefined
        }
    },
    methods:{
        // methods v2 by marven wilson donque

        submit(){
            this.a_user_input_parser(this.user_input)
        },
        a_user_input_parser(input){
            // parsed the user input breaks down each section of the input and 
            // turn it into an object
            
            console.log(input)
            return this.b_parsed_input_handler(input)
        },
        b_parsed_input_handler(input){
            // the purpose of this method is to assign a case on each command the
            // user cast

            // cases
            let CASE_SELECTED = undefined

            //
            input.firstArg = 'clear' && (CASE_SELECTED = 'CLEAR_THE_SCREEN')
            input.firstArg = 'use'  && (CASE_SELECTED = 'SWITCH_CLASS')

            switch(CASE_SELECTED){
                
                case 'CLEAR_THE_SCREEN':
                    this.c_terminal_view_handler('CLEAR_THE_SCREEN')
                break

                case 'SWITCH_CLASS':
                    this.c_terminal_view_handler('SWITCH_CLASS')
                break

                case '':
                break
            }
        },
        c_terminal_view_handler(){
            // this method is responsible for the ui on what to display
        },
        d_command_sender(){
            // this method is responsilbe for sending the parsed input to the
            // server to be processed
        },
        e_command_response_handler(){
            // this method is responsilbe for handling the response from the server
        },
        on_start_defaults_setter(){
            // this method fires when the shell instantiate, set all the defaults and 
            // runs all the starting checklist before even the user can interac to the ui
        }
    }
}
</script>

<style>

</style>
