import templates from './templates'
import utils from './utils'

export default function (app,method) {
    const i = {}
    
    // system
    i['private.sysutil.cp'] = function(o) {
        if (o === null) return null;
        
                var output, v, key;
                output = Array.isArray(o) ? [] : {};
                for (key in o) {
                  v = o[key];
                  output[key] = typeof v === "object" ? this.cp(v) : v;
                }
        
        return output;
    }
    i['private.insertCompiledTask'] = function ({compiledTask,payload}) {
        // compiled task returns an array of task items
        const prm = payload ? payload : app.$store.state.queueCurrentTaskAnswer
        const ct = Array.isArray(compiledTask) ? compiledTask : compiledTask(prm)
        const pa = () => {
            app.$store.state.queueAnswersArray.push({
                answer: '--not answered--'
            })
        }
        if(Array.isArray(ct)) {
            // push or insert tasks to queue
            if(app.$store.state.queue.length - 1 === app.$store.state.queuePointer) {
                // get function and push to queue
                ct.map(e => {
                    if(e.taskName === 'exec') {
                        app.$store.state.queue.push(new templates.ExecQueueItem({
                            fn: i[`private.${e.taskName}`],
                            param: e.taskParam,
                            m: i
                        }))
                    } else {
                        app.$store.state.queue.push(new templates.NormalQueueItem({
                            fn: i[`private.${e.taskName}`],
                            param: e.taskParam,
                        }))
                    }                    
                    pa()
                })
                app.$store.commit('stateController', {
                    key: 'queuePointer',
                    value: app.$store.state.queuePointer + 1
                })
            } else {
                // insert
                const f = ct.map(e => {
                    pa()
                    if(e.taskName === 'exec') {
                        return new templates.ExecQueueItem({
                            fn: i[`private.${e.taskName}`],
                            param: e.taskParam,
                            m: i
                        })
                    } else {
                        return new templates.NormalQueueItem({
                            fn: i[`private.${e.taskName}`],
                            param: e.taskParam,
                        })
                    }                        
                })
                app.$store.state.queue.splice(app.$store.state.queuePointer ,0,f)
                app.$store.state.queue = app.$store.state.queue.flat()
                app.$store.commit('executeQueue')
            }
        } else {
            alert('Err: Invalid compiled task in insertCompiledTask item')
            location.reload()
        }
    }
    i['private.done'] = function () {
        console.log('> all task done')
        console.log('')
        console.log('')
        app.$store.commit('stateController', {
            key: 'queueState',
            value: 'end'
        })
        app.$store.commit('stateController', {
            key: 'queueCurrentTaskAnswer',
            value: null
        })
        app.$store.commit('stateController', {
            key: 'queuePointer',
            value: null
        })
        app.$store.commit('stateController', {
            key: 'queueAnswersArray',
            value: null
        })
        app.$store.commit('stateController', {
            key: 'queue',
            value: []
        })
        app.$store.commit('stateController', {
            key: 'queueStatic',
            value: null
        })
    }
    i['private.resetTask'] = function ({resetBackTo,injectOrModifyProp}) {
        if(resetBackTo > app.$store.state.queuePointer) {
            alert(`Err: in resetTask task item object, illegal reset value in "resetBackTo" property, value:${resetBackTo}`)
            location.reload()
        } else {
            app.$store.commit('stateController',{
                key: 'queuePointer',
                value: resetBackTo
            })
        }
        
        Object.assign(app.$store.state.queue[app.$store.state.queuePointer].param, injectOrModifyProp)
    }
    i['private.syscall.get'] = function() {
        console.log('getting resources')
        setTimeout(() => {
            app.answerPending({
                data: app.$store.state.pane.length == 0 ? 'test 1' : 'test 2'
            })
        }, 100);
        app.answerPending()
    }
    i['private.syscall.post'] = function() {

    }
    i['private.syscall.delete'] = function() {

    }
    i['private.insert-service'] = function (service) {

    }


    return i[`private.${method}`]
}