import procedures from './procedures'
import core from '@/apps/compiledTask/core'
import sysvoid from '@/apps/compiledTask/sysvoid'
import sysutil from '@/apps/compiledTask/sysutil'
import syspane from '@/apps/compiledTask/syspane'


export default {
    mixins: [procedures],
    data: () => ({
        h: undefined,
    }),
    mounted() {
        this.$p = this.h
    },
    methods: {
                /** sys programs */
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
        DO_NOT_EXECUTE_OUTSIDE_HELPER_$prompt({type,defaultValue, placeholder, label, err}) {
            this.SYSTEM_PROCEDURE_DO_NOT_EXECUTE_OUTSIDE_HELPER_SPAWN_GLOBAL_MODAL({
                modalType: 'prompt',
                modalPayload: {
                    type,
                    defaultValue,
                    placeholder,
                    label,
                    err
                }
            })
        },
        DO_NOT_EXECUTE_OUTSIDE_HELPER_$select({options,defaultValue, label, err}) {
            this.SYSTEM_PROCEDURE_DO_NOT_EXECUTE_OUTSIDE_HELPER_SPAWN_GLOBAL_MODAL({
                modalType: 'select',
                modalPayload: {
                    options,
                    defaultValue,
                    label,
                    err
                }
            })
        },
        DO_NOT_EXECUTE_OUTSIDE_HELPER_$loginfo({msg}) {
            this.SYSTEM_PROCEDURE_DO_NOT_EXECUTE_OUTSIDE_HELPER_SPAWN_GLOBAL_MODAL({
                modalType: 'loginfo',
                modalPayload: {
                    msg
                }
            })
        },
        DO_NOT_EXECUTE_OUTSIDE_HELPER_$logerr({msg}) {
            this.SYSTEM_PROCEDURE_DO_NOT_EXECUTE_OUTSIDE_HELPER_SPAWN_GLOBAL_MODAL({
                modalType: 'logerr',
                modalPayload: {
                    msg
                }
            })
        },
        DO_NOT_EXECUTE_OUTSIDE_HELPER_$insertCompiledTask({compiledTask,payload}) {
            // compiled task returns an array of task items
            const prm = payload ? payload : this.h.$store.state.queueCurrentTaskAnswer
            const ct = compiledTask(prm)
            const pa = () => {
                this.h.$store.state.queueAnswersArray.push({
                    answer: '--not answered--'
                })
            }
            if(Array.isArray(ct)) {
                // push or insert tasks to queue
                if(this.h.$store.state.queue.length - 1 === this.h.$store.state.queuePointer) {
                    // get function and push to queue
                    ct.map(e => {
                        this.h.$store.state.queue.push({
                            fn: this[`DO_NOT_EXECUTE_OUTSIDE_HELPER_$${e.taskName}`],
                            param: e.taskParam
                        })
                        pa()
                    })
                    this.h.$store.commit('stateController', {
                        key: 'queuePointer',
                        value: this.h.$store.state.queuePointer + 1
                    })
                } else {
                    // insert
                    const f = ct.map(e => {
                        pa()
                        return {
                            fn: this[`DO_NOT_EXECUTE_OUTSIDE_HELPER_$${e.taskName}`],
                            param: e.taskParam
                        }                        
                    })
                    this.h.$store.state.queue.splice(this.h.$store.state.queuePointer ,0,f)
                    this.h.$store.state.queue = this.h.$store.state.queue.flat()
                    this.$store.commit('executeQueue')
                }
            } else {
                alert('Err: Invalid compiled task in insertCompiledTask item')
                location.reload()
            }
        },
        DO_NOT_EXECUTE_OUTSIDE_HELPER_$resetTask({resetBackTo,injectOrModifyProp}) {
            if(resetBackTo > this.h.$store.state.queuePointer) {
                alert(`Err: in resetTask task item object, illegal reset value in "resetBackTo" property, value:${resetBackTo}`)
                location.reload()
            } else {
                this.h.$store.commit('stateController',{
                    key: 'queuePointer',
                    value: resetBackTo
                })
            }
            
            Object.assign(this.h.$store.state.queue[this.$store.state.queuePointer].param, injectOrModifyProp)
            // reset back n exec initial value 
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
            this.h.$store.commit('stateController', {
                key: 'queueStatic',
                value: null
            })
        },
        /** component utils */
        m() {
            return this
        },
        cp(o){
            if (o === null) return null;
        
                var output, v, key;
                output = Array.isArray(o) ? [] : {};
                for (key in o) {
                  v = o[key];
                  output[key] = typeof v === "object" ? this.cp(v) : v;
                }
        
            return output;
        },
        answerPending(answer,pointer) {
            console.log('> Answering pending question')
            if(answer && answer != '--void--') {
                this.h.$store.commit('stateController', {
                    key: 'queueCurrentTaskAnswer',
                    value: answer
                })

            }

            this.h.$store.commit('updateQueueAnswers', {
                index: this.h.$store.state.queuePointer,
                answer: '--done--',
                pointer
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
            const staticCopy = this.cp(x)
            this.h.$store.commit('stateController', {
                key: 'queueStatic',
                value: Object.freeze(staticCopy)
            })
            this.h.$store.commit('stateController', {
                key: 'queueAnswersArray',
                value: queueAnswersArray
            })
        },
        getCompiledTask(lib,payload){
            
            console.log('getCompiledTask')
            if(lib.indexOf('.') != -1) {
                const namespace = lib.split('.')[0]
                const method = lib.split('.')[1]
                // sysvoid <-- methods that does not require any initial input for this compiled task to run
                if(namespace == 'sysvoid') {
                    return sysvoid[method]
                }
                // sysutil, log, log-err, log-info
                else if(namespace == 'sysutil') {
                    return sysutil[method]
                }
                // syspane, managing pane sysytem
                else if(namespace == 'syspane') {
                    return syspane[method]
                }else {
                    alert(`Err: invalid namespace ${namespace}`)
                    location.reload()
                }
            } else {
                alert(`Err: Invalid task name ${lib}`)
                location.reload()
            }
        },
        validate(dataTypeToValidate,modes) {

        }
    }
}