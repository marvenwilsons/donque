const prompts = require('prompts');
const fs = require('fs')
const path = require('path')
const watcher = require('./watcher/index');

/** Get test data, returns an array of objects */
const getTestData = (of) => {
  let dataSet = fs.readdirSync(path.join(__dirname, `./test-data/${of}`))
  const middleware = require( path.join(__dirname, `./test-data/${of}/middleware.js`) )
  dataSet =  dataSet.filter(e => e != 'config.json' && e != 'middleware.js')
  const testConfig = require(path.join(__dirname, `./test-data/${of}/config.json`))
  const extractDataSet = dataSet.map(e => {
    const c = require(path.join(__dirname, `./test-data/${of}/${e}`))
    return {
      title: e,
      value: {
        title: e,
        data: c.data,
        testConfig: {
          ...testConfig,
          expected: c.expected
        } ,
        middleware: {
          func: middleware,
          path: path.join(__dirname, `./test-data/${of}/middleware.js`)
        }
      },
      description: c.data_description,
    }
  })

  return extractDataSet
}

const displayJSON = (title,val) => {
  console.log(`
      ${title}
  `)
  JSON.stringify(val, null, 4).split('\n').map((e,i)=>{
    console.log('\t',`${i + 1} ${i + 1 < 10 ? " ": ""}`,'│ ',e)
  })
}

(async (getTestData,displayJSON) => {
    // 1
    const promptResponse = await prompts({
        type: 'select',
        name: 'value',
        message: '1. Pick initialization data',
        choices: getTestData(process.argv[2]),
        initial: 0
      });

    // Print Selected Data
    displayJSON('Selected Test Data',promptResponse.value.data)
    displayJSON('Test Config', promptResponse.value.testConfig)
    
    const { filepath_to_test, method_to_test, restart_test_on_file_change, dir_to_watch  } =  promptResponse.value.testConfig
    
    const getFileToTest = require(path.join(__dirname, `../../${filepath_to_test}`))

    var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
    var ARGUMENT_NAMES = /([^\s,]+)/g;
    function getParamNames(func) {
      var fnStr = func.toString().replace(STRIP_COMMENTS, '');
      var result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
      if(result === null)
        result = [];
      return result;
    }

    if(method_to_test) {
      displayJSON('Params', getParamNames(getFileToTest[method_to_test]))
    } else {
      displayJSON('Params', getParamNames(getFileToTest))
    }

    const execFunc = () => {
      if(method_to_test) {
        /** when test is file exports an object */
        promptResponse.value.middleware.func({
          data: promptResponse.value.data,
          method: getFileToTest[method_to_test]
        })
      } else {
        /** when test file exports a function not an object */
  
        var originallog = console.log;
  
        console.log = function(txt) {
            process.stdout.write(`             │>   `)
            originallog.apply(console, arguments);
        }
        console.log(`
  
        Execution Logs
        `)
        // map and execute function
        const test = promptResponse.value.middleware.func({
          data: promptResponse.value.data,
          method: getFileToTest
        }, (v) => {
          console.log(`
  
        Test Result
        `)
        console.log(`
             │> Expected: ${promptResponse.value.testConfig.expected}
             │> Result:   ${v}
             │> Type:     ${promptResponse.value.testConfig.expected == v ? 'TEST SUCCESS' : 'TEST FAILED'}
        `)
        })
      }
    }

    execFunc()

    if(restart_test_on_file_change === true) {
      const w = watcher(path.join(__dirname,`../${dir_to_watch}`))
      w.on('fileChanged', () => {
        execFunc()
      })
    }
    
    
  })(getTestData,displayJSON)