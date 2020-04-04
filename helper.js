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
            setTimeout(() => {
                this.h.answerPending('void')
            }, 200);
        },
        DO_NOT_EXECUTE_OUTSIDE_HELPER_$exec(payload) {
            console.log('> exec')
            const t = payload(this.h.$store.state.queueCurrentTaskAnswer)
            const nobj = {
                param: t.taskParam
            }
            if(!t) {
                const msg = `ERR! exec is undefined, exec task has to return a task object or a newTask array`
                alert(msg)
                throw msg
            } else {
                // append task to queue
                const currentQueue = this.h.$store.state.queue
                currentQueue.splice(this.h.$store.state.queuePointer,1,nobj)
                this.h.$store.commit('stateController', {
                    key: 'queue',
                    value: currentQueue
                })
                this.h.$store.commit('stateController', {
                    key: 'queuePointer',
                    value: this.h.$store.state.queuePointer - 1
                })
                setTimeout(() => {
                    this[`DO_NOT_EXECUTE_OUTSIDE_HELPER_$${t.taskName}`](t.taskParam)

                    setTimeout(() => {
                        this.h.$store.commit('updateQueueAnswers', {
                            index: this.h.$store.state.queuePointer + 1,
                            answer: '--pending--'
                        })
                    }, 100);
                }, 10);
            }
        },
        DO_NOT_EXECUTE_OUTSIDE_HELPER_$done() {
            console.log('> all task done')
            this.h.$store.commit('stateController', {
                key: 'queue',
                value: []
            })
            this.h.$store.commit('stateController', {
                key: 'queueCurrentTaskAnswer',
                value: null
            })
            this.h.$store.commit('stateController', {
                key: 'queuePointer',
                value: -1
            })
            this.h.$store.commit('stateController', {
                key: 'queueAnswersArray',
                value: undefined
            })
        },
        answerPending(answer) {
            this.h.$store.commit('executeQueue', {
                asnwerPending: true,
                answer
            })
            this.h.$store.commit('updateQueueAnswers', {
                index: this.h.$store.state.queuePointer,
                answer
            })
        },
        createCompiledTask(taskArray) {
            /********************************************************************
             * push procedures to que together with its function dependecies
             * the first item in taskArray is the item that needs to be completed
             * the sencond item to the last are the functions that executes for the
             * purpose of completing the first item in the taskArray.
             * ****************************************************************** 
             */
            let x = []
            let queueAnswersArray = []
            taskArray.map((e,i) => {
                queueAnswersArray.push({
                    answer: '--not answered--'
                })
                if(e) {
                    /**
                     * type 1 is an object that tells what function to execute
                     */
                    const taskBeingCalled = this[`DO_NOT_EXECUTE_OUTSIDE_HELPER_$${e.taskName}`]
                    if(taskBeingCalled == undefined) {
                        const msg = `ERR: "${e.taskName}" function or task does not exist`
                        alert(msg)
                        throw msg
                    } else {
                        if(e.taskParam == undefined || e.taskParam == null) {
                            const msg = `ERR: "taskParam" property cannot be undefined of null at index: ${i} task name: ${e.taskName}`
                            alert(msg)
                            throw msg
                        } else {
                            console.log('> pushing task array')
                            x.push({
                                fn: taskBeingCalled,
                                param: e.taskParam
                            })
                        }
                    }
                }
            })
            this.h.$store.commit('stateController', {
                key: 'queue',
                value: x
            })
            this.h.$store.commit('stateController', {
                key: 'queueAnswersArray',
                value: queueAnswersArray
            })
        }
    }
}