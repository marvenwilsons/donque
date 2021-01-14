const prompts = require('prompts');
const fs = require('fs')
const path =require('path')

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
        testConfig,
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
        choices: getTestData('init'),
        initial: 0
      });

    // Print Selected Data
    displayJSON('Selected Test Data',promptResponse.value.data)
    displayJSON('Test Config', promptResponse.value.testConfig)
    
    const { filepath_to_test, method_to_test  } =  promptResponse.value.testConfig
    
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

    if(method_to_test) {
      /** when file exports an object */
      promptResponse.value.middleware({
        data: promptResponse.value.data,
        method: getFileToTest[method_to_test]
      })
    } else {
      /** when file exports a function not an object */

      var originallog = console.log;

      console.log = function(txt) {
          process.stdout.write(`             │>   `)
          originallog.apply(console, arguments);
      }
      console.log(`

      Execution Logs
      `)
      promptResponse.value.middleware.func({
        data: promptResponse.value.data,
        method: getFileToTest
      })
    }
  })(getTestData,displayJSON)