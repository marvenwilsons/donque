const cardinal = require('./sys/cardinal')
var colors = require('colors');
let count = -1
let tempData = []
const test = (routine,index) => {
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

                console.log(' input data: '.inverse.bold)
                console.log(routine[count].input)
                console.log('')


                // process
                console.log(' start process:'.inverse.bold)

                console.time('\t total execution time'.bold)
                cardinal(routine[count].input)
                    .then(data => {
                        console.log(' end process '.inverse.bold)

                        console.log('')
                        console.log(' test report:'.bold)
                        console.log('')
                        console.timeEnd('\t total execution time'.bold)
                        let ressig = [true]
                        console.log('\t', 'actual output type:'.bold, 'success'.green.bold)
                        console.log('\t', 'expected output type: '.bold, `${routine[count].expected ? 'success' : 'failure'}`.bold)
                        console.log('\t', 'received msg:'.bold, `${data.data.msg}`)
                        routine[count].expected ? ressig.push(true) : ressig.push(false)

                        console.log('\t expected msg:'.bold, `${routine[count].expectedMsg}`)
                        console.log('\t actions:'.bold, `${data.data.actions.length}`)
                        console.log('\n final output: '.bold)
                        console.table(data)

                        //
                        tempData.push(data)

                        //
                        if(routine[count].data != undefined){
                            routine[count].data(tempData)
                        }

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
                                    console.log(count)
                                    console.log('EXECUTING next test')
                                    test(routine, count)
                                    console.log(count)
                                } else if (isDone) {
                                    setTimeout(() => {
                                        console.log('')
                                        console.log(' ALL TEST IS DONE! '.bold)
                                        console.log('')
                                        routine.map((e, i) => {
                                            console.log('\t', ` Test #${i + 1} `.bgGreen.bold, `${e.desc}`.green)
                                            console.log('')
                                        })
                                    }, 100);
                                }
                            }
                        })
                    })
                    .catch(err => {
                        console.log(' end process '.inverse.bold)
                        console.log('')
                        console.log(' test report:'.bold)
                        console.log('')
                        console.timeEnd('\t total execution time'.bold)
                        console.log('\t', 'actual output type:'.bold, 'failure'.bold)
                        console.log('\t', 'expected output type: '.bold, `${routine[count].expected ? 'success' : 'failure'}`.bold)
                        console.log('\t', 'received msg:'.bold, `${err.data.msg}`)

                        console.log('\t expected msg:'.bold, `${routine[count].expectedMsg}`)
                        console.log('\t actions:'.bold, `${err.data.actions.length}`)
                        console.log('\n final output: '.bold)
                        console.table(err)

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

                        routine[count].after((err_Res) => {
                            if (err_Res) {
                                console.log(' ERROR executing after hook '.bgRed.bold)
                                console.log('')
                                console.log(`   ${err_Res}`.red.bold)
                                console.log('')
                                discontinued.state = true
                            } else {
                                if (_err == undefined && isDone == false) {
                                    console.log('EXECUTING next test')
                                    console.log(count)
                                    test(routine, count)
                                    console.log(count)
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
    }, 05)
}

module.exports = test