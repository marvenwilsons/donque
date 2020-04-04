import procedures from './procedures'
import { mapGetters } from "vuex";
export default {
    mixins: [procedures],
    data: () => ({
        h: undefined,
    }),
    mounted() {
        this.$p = this.h
    },
    methods: {
        DO_NOT_EXECUTE_OUTSIDE_HELPER_$ask({question, truthy, falsey}) {
            this.SYSTEM_PROCEDURE_DO_NOT_EXECUTE_OUTSIDE_HELPER_SPAWN_GLOBAL_MODAL({
                modalType: 'boolean',
                modalPayload: {
                    truthy,
                    falsey,
                    question
                }
            })
        },
        DO_NOT_EXECUTE_OUTSIDE_HELPER_$systemCall() {

        },
        DO_NOT_EXECUTE_OUTSIDE_HELPER_$closeModal() {
            console.log('> Closing Modal')
            this.h.$store.commit('stateController', {
                key: 'globalModalState',
                value: false
            })
            this.h.$store.commit('stateController', {
                key: 'globalModalContentType',
                value: undefined
            })
            this.h.$store.commit('stateController', {
                key: 'globalModalContent',
                value: undefined
            })
        },
        answerPending(answer) {
            this.h.$store.commit('executeQueue', {
                asnwerPending: true,
                answer
            })
            // this.h.$store.commit('executeQueue')
        },
        newTask(taskArray) {
            /********************************************************************
             * push procedures to que together with its function dependecies
             * the first item in taskArray is the item that needs to be completed
             * the sencond item to the last are the functions that executes for the
             * purpose of completing the first item in the taskArray.
             * ****************************************************************** 
             */
            let x = []
            let hasType2 = undefined
            taskArray.map((e,i) => {
                if(e.type1) {
                    /**
                     * type 1 is an object that tells what function to execute
                     */
                    const taskBeingCalled = this[`DO_NOT_EXECUTE_OUTSIDE_HELPER_$${e.type1.taskName}`]
                    if(taskBeingCalled == undefined) {
                        const msg = `ERR: "${e.type1.taskName}" function or task does not exist`
                        alert(msg)
                        throw msg
                    } else {
                        if(e.type1.taskParam == undefined || e.type1.taskParam == null) {
                            const msg = `ERR: "taskParam" property cannot be undefined of null at index: ${i} task name: ${e.type1.taskName}`
                            alert(msg)
                            throw msg
                        } else {
                            x.push({
                                fn: taskBeingCalled,
                                param: e.type1.taskParam
                            })
                        }
                    }
                } else if(e.type2){
                    /**
                     * type 2 is a type of function that has dependency on the function
                     * that executed before
                     */
                    if(i == 1) {
                        const msg = `ERR: type2 cannot be placed as a second task`
                        alert(msg)
                        throw msg
                    } else {
                        x.push({
                            fn: e.type2,
                            param: null
                        })
                        hasType2 = true
                    }
                    
                }
            })
            this.h.$store.commit('stateController', {
                key: 'queue',
                value: x
            })
            setTimeout(() => {
                if(hasType2 == true) {
                    this.h.$store.commit('stateController', {
                        key: 'queueExecType',
                        value: 'sync'
                    })
                } else {
                    this.h.$store.commit('stateController', {
                        key: 'queueExecType',
                        value: 'async'
                    })
                }
                this.h.$store.commit('executeQueue')
            }, 0);
        }
    }
}