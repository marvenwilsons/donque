const test1 = require('./test/routine-1')
const test2 = require('./test/routine-2')
const cardinal = require('./sys/cardinal')
var colors = require('colors');

const as = {
    t: [],
    set v(val) {
        this.t.push(val)
        console.log(this.t)
    },
    get vv() {
        return this.t.length
    }
}

let count = -1
const test = async (routine, index) => {
    const flow = setInterval(() => {
        // encrement
        count++

        const discontinued = {
            s: false,
            set state(val) {
                this.s = val
                console.log(' TEST DISCONTINUED WAITING FOR CHANGES '.bold.bgRed)
                clearInterval(flow)
            },
            get state() {
                return this.s
            }
        }

        const finalresult = {
            res: undefined,
            _err: undefined,

            set value(val) {
                if (val === true) {
                    console.log('')
                    console.log(` TEST #${count + 1} PASSED! `.bold.bgGreen)
                    console.log('')
                } else {
                    console.log('')
                    console.log(` TEST #${count + 1} FAIL! `.bgRed.bold, ` ${routine[count].desc} `.red.bold)
                    console.log('')
                    console.log('\t', `${val}`.red.bold)
                    console.log('')
                    discontinued.state = true
                    clearInterval(flow)
                }
            }
        }




        // hooks
        routine[count].before((err) => {
            if (err) {
                console.log(' ERROR executing before hook '.bgRed.bold)
                console.log('')
                console.log(`   ${err}`.red.bold)
                console.log('')
                discontinued.state = true
            } else {
                // desc
                console.log(` TEST #${count + 1} ${routine[count].desc} `.bgBlue.bold);

                console.log('input data: '.inverse)
                console.log(routine[count].input)


                // process
                console.log('process: '.inverse)
                console.time('total execution time '.inverse)

                console.time('total execution time '.inverse)
                const x = cardinal(routine[count].input)
                    .then(data => {
                        console.timeEnd('total execution time '.inverse)
                        let ressig = [true]
                        console.log('actual output type:'.inverse, 'success'.green.bold)
                        console.log('expected output type: '.inverse, `${routine[count].expected ? 'success' : 'failure'}`.bold)
                        console.log('received msg:'.inverse, `${data.data.msg}`)
                        routine[count].expected ? ressig.push(true) : ressig.push(false)

                        console.log('expected msg:'.inverse, `${routine[count].expectedMsg}`)
                        console.log('final output: '.inverse)
                        console.log(data)



                        //
                        let _err = undefined

                        //
                        if (routine[count].expected != data.status) {
                            _err = 'Expected status and received status did not match'
                        }

                        //
                        if (ressig.includes(false)) {
                            _err = '- Invalid response routing, final response should be an error not a success \n\t - exptected to fail got success instead'
                        }

                        //
                        if (routine[count].expectedMsg != data.data.msg) {
                            _err = 'Expected msg and received msg did not match'
                        }

                        //
                        _err == undefined ? finalresult.value = true : finalresult.value = _err

                        let isDone = false
                        //
                        if (count == routine.length - 1 && _err == undefined) {
                            isDone = true
                        }

                        routine[count].after((err) => {
                            if (err) {
                                console.log(' ERROR executing after hook '.bgRed.bold)
                                console.log('')
                                console.log(`   ${err}`.red.bold)
                                console.log('')
                                discontinued.state = true
                            } else {
                                if (_err == undefined && isDone == false) {
                                    console.log('EXECUTING next test')
                                    test(routine, count)
                                } else if (isDone) {
                                    setTimeout(() => {
                                        console.log('')
                                        console.log(' ALL TEST IS DONE! '.bold)
                                        console.log('')
                                        routine.map((e, i) => {
                                            console.log('\t', ` Test #${i + 1} `.bgGreen.bold, `${e.desc}`.green)
                                            console.log('')
                                        })
                                    }, 2000);
                                }
                            }
                        })
                    })
                    .catch(err => {
                        console.timeEnd('total execution time '.inverse)
                        console.log('actual output type: '.inverse, 'failure'.red.bold)
                        console.log('expected output type:'.inverse, `${routine[count].expected ? 'succeed' : 'failure'}`.bold)
                        console.log('received msg:'.inverse, `${err.data.msg}`)
                        console.log('expected msg:'.inverse, `${routine[count].expectedMsg}`)
                        console.log('final output: '.inverse)
                        console.log(err)

                        //
                        let _err = undefined

                        //
                        if (routine[count].expected != err.status) {
                            _err = 'Expected status and received status did not match'
                        }

                        //
                        if (routine[count].expectedMsg != err.data.msg) {
                            _err = 'Expected msg and received msg did not match'
                        }

                        //
                        _err == undefined ? finalresult.value = true : finalresult.value = _err

                        let isDone = false
                        //
                        if (count == routine.length - 1 && _err == undefined) {
                            isDone = true
                        }

                        routine[count].after((err) => {
                            if (err) {
                                console.log(' ERROR executing after hook '.bgRed.bold)
                                console.log('')
                                console.log(`   ${err}`.red.bold)
                                console.log('')
                                discontinued.state = true
                            } else {
                                if (_err == undefined && isDone == false) {
                                    console.log('EXECUTING next test')
                                    test(routine, count)
                                } else if (isDone) {
                                    setTimeout(() => {
                                        console.log('')
                                        console.log(' ALL TEST IS DONE! '.bold)
                                        console.log('')
                                        routine.map((e, i) => {
                                            console.log('\t', ` Test #${i + 1} `.bgGreen.bold, `${e.desc}`.green)
                                            console.log('')
                                        })
                                    }, 500);
                                }
                            }
                        })
                    })


                // engine
                if (count == routine.length - 1) {
                    clearInterval(flow)
                }
            }
        })



        clearInterval(flow)     
    }, 02)
}

test(test1, 0)


// add able to add new item to current live admins array