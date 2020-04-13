import sysvoid from '@/apps/compiledTask/sysvoid'
import sysutil from '@/apps/compiledTask/sysutil'
import syspane from '@/apps/compiledTask/syspane'
import templates from '@/apps/templates/index'
import procedures from './procedures'

export default {
    data: () => ({
        h: undefined,
    }),
    mounted() {
        this.$p = this.h
    },
    methods: {
    /** sys utils */
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
        pipe(...funcs) {
            return function(val) {
                let lastResult
                for(func of funcs) {
                    lastResult = func(lastResult || val)
                }
                return lastResult
            }
            /**usage -> this.pipe(fn1,fn2,fn3)('input') */
        },
        answerPending(answer,pointer) {
            // console.log('> Answering pending question')
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
                    // const taskBeingCalled = e.taskName == 'exec' ? true : this[`private.${e.taskName}`]
                    const taskBeingCalled = e.taskName == 'exec' ? true : procedures(this,e.taskName)
                    if(taskBeingCalled == undefined) {
                        new templates.DonqueDevError(`ERR: "${e.taskName}" function or task does not exist`)
                    } else {
                        if(e.taskParam == undefined || e.taskParam == null) {
                            new templates.DonqueDevError(`ERR: "taskParam" property cannot be undefined of null at index: ${i} task name: ${e.taskName}`)
                        } else {
                            if(e.taskName == 'exec') {
                                x.push(new templates.ExecQueueItem({
                                    fn: taskBeingCalled,
                                    param: e.taskParam,
                                    m: this.m
                                }))
                            } else {
                                x.push(new templates.NormalQueueItem({
                                    fn: taskBeingCalled,
                                    param: e.taskParam
                                }))
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
            
            // console.log('getCompiledTask')
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
        validateString({mode,value,expected}) {
            if(mode === 'has-special-character') {
                console.log('special-character')
                const regex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/gim;
                return regex.exec(value) != null;
            } else if(mode === 'has-number') {
                const regex = /[0-9]/gim;
                return regex.exec(value) != null;
            } else if(mode === 'has-whitespace') {
                return value.indexOf(" ") != -1
            } else if(mode === 'is-required') {
                return value.trim() != ""
            } else if(mode === 'is-email') {
                const condition = ["@", ".com"];
                const res = condition.map(charSet => {
                    return RegExp(`${charSet}`, "").exec(value) != null;
                });
                return res.join("/") == "true/true";
            }
        }
    }
}