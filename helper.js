import procedures from './procedures'
import core from '@/apps/compiledTask/core'

export default {
    mixins: [procedures],
    data: () => ({
        h: undefined,
    }),
    mounted() {
        this.$p = this.h
    },
    methods: {
        m() {
            return this
        },
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
        DO_NOT_EXECUTE_OUTSIDE_HELPER_$prompt({type,validation,defaultValue, placeholder, label, err}) {
            this.SYSTEM_PROCEDURE_DO_NOT_EXECUTE_OUTSIDE_HELPER_SPAWN_GLOBAL_MODAL({
                modalType: 'prompt',
                modalPayload: {
                    type,
                    validation,
                    defaultValue,
                    placeholder,
                    label,
                    err
                }
            })
        },
        DO_NOT_EXECUTE_OUTSIDE_HELPER_$systemCall() {

        },
        DO_NOT_EXECUTE_OUTSIDE_HELPER_$goBack({resetTo,injectOrModifyProp}) {
            console.log('going back')
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
                this.h.answerPending('--void--')
            }, 100);
        },
        DO_NOT_EXECUTE_OUTSIDE_HELPER_$done() {
            console.log('> all task done')
            this.h.$store.commit('stateController', {
                key: 'queueState',
                value: 'end'
            })
            this.h.$store.commit('stateController', {
                key: 'queueCurrentTaskAnswer',
                value: null
            })
            this.h.$store.commit('stateController', {
                key: 'queuePointer',
                value: null
            })
            this.h.$store.commit('stateController', {
                key: 'queueAnswersArray',
                value: null
            })
            this.h.$store.commit('stateController', {
                key: 'queue',
                value: []
            })
        },
        answerPending(answer) {
            console.log('> Answering pending question')
            const voidAnswers = ['--void--','--pending--']
            this.h.$store.commit('updateQueueAnswers', {
                index: this.h.$store.state.queuePointer,
                answer: '--done--'
            })
        },
        runCompiledTask(taskArray) {
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
                    /*** type 1 is an object that tells what function to execute */
                    const taskBeingCalled = e.taskName == 'exec' ? true : this[`DO_NOT_EXECUTE_OUTSIDE_HELPER_$${e.taskName}`]
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
                            if(e.taskName == 'exec') {
                                x.push({
                                    fn: taskBeingCalled,
                                    param: e.taskParam,
                                    mode: '--pending--',
                                    m: this.m
                                })
                            } else {
                                x.push({
                                    fn: taskBeingCalled,
                                    param: e.taskParam
                                })
                            }                     
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
        },
        validate(dataTypeToValidate,modes) {

        }
    }
}