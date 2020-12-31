// cross-env NODE_ENV=production node server/index.js
const fs = require('fs')
const path = require('path')
const { spawn, exec } = require('child_process')
let pkg = require('../package.json')

const files = fs.readdirSync(path.join(__dirname,'../'))

try {
  if(!files.includes('node_modules')) {
    console.log('donque ==> Please Wait, Installing Dependencies ...')
  
      // install dependency
      const installDependency = spawn('npm install', {
        shell: true,
      })
  
      installDependency.stdout.on('data', (data) => {
        console.log(data.toString())
      })

      // start program
      function startProgram() {
        const pg = spawn('npm start', {
          shell: true,
          stdio: 'inherit',
          detached: true
        })

        pg.on('close', () => {
          console.log('donque ==> dq startup done!')
        })
      }
  
  
      installDependency.on('close', () => {
        console.log('Done Installing')
        // const projectPkg = JSON.parse(pkg)
        pkg.scripts.start = "cross-env NODE_ENV=production node server/index.js"
        
        fs.writeFileSync(path.join(__dirname,'../package.json'), JSON.stringify(pkg, null, 4))

        startProgram()
      })
  }
} catch(err) {}