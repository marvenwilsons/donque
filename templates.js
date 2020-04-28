import utils from './utils'
const moment = require('moment')

export default {
    TaskItem(taskName,taskParam) {
        this.taskName = taskName
        this.taskParam = taskParam

        switch(taskName) {
            case 'sysmodal.loading':
                if(typeof taskParam != 'object') 
                    throw console.error('Invalid Task Item Parameter',`- sysmodal.loading, expected an object with msg property instead got "${taskParam}"`)
                if(!taskParam.msg)
                    throw console.error('Invalid Task Item Parameter',`- sysmodal.loading, expected an object with msg property instead got undefined`)
                
            break;
        }
    },
    ExecQueueItem({fn,param,m}) {
        this.fn = fn
        this.param = param
        this.mode = '--pending--'
        this.m = m
    },
    ServerResponse({statusCode,payload,key}) {

    },
    NormalQueueItem({fn,param}) {
        this.fn = fn
        this.param = param
    },
    DonqueDevError(msg) {
        alert(msg)
        location.reload()
    },
    Service({name,initialData,fistPaneDefualtView,dataControllers,views,config, onEmptyData}) {
        const s = {
            // service name
            name: ((arg) => {
                if(!arg) throw new Error('service name cannot be undefined')
                return arg
            })(name),
            // service data
            initialData: ((arg) =>{
                if(!arg) throw new Error('initial data cannot be undefined')
                // if(!Array.isArray(arg)) throw new Error(`service data should be an array, instead got a ${typeof arg}: ${arg}`)
                return arg
            })(initialData),
            // views
            views: ((arg) => {
                return arg.toString()
            })(views)
        }

        return {
            data: s.data,
            body: s
        }
        // this.views = (({objectKeys = Array,component = Object}) => {
        //     /**  */
        // })(views)
    },
    Page: function({pageName,admin_id,lastModified,pageContent,version_id,isUndermaintenance,subPages,pageId}) {
        this.pageName = ((arg) => {
            // TODO:
            // convert everything to lower case
            // convert white space to dash
            // should not allow special characters
            return arg
        })(pageName)
        this.pageId = pageId
        this.createdOn = moment().format("MMM Do YY")
        this.createdBy = admin_id
        this.lastModified = lastModified
        this.pageContent = pageContent
        this.version_id = version_id
        this.isUndermaintenance = isUndermaintenance
        this.subPages = subPages
    },
    PageVersion: function({versionName}){
        this.versionName = versionName
        this.version_id = utils.randId(8)
    },
    PageElement: function({tag,name,role,inlineStyle,innerText,classList,els,path,addedBy,lastModified, collection,globalAttr,nativeAttr}) {
        this.tag = tag
        this.name = name
        this.role = role
        this.inlineStyle = inlineStyle ? inlineStyle : {}
        this.innerText = innerText
        this.classList = classList
        this.els = els ? els : []
        this.path = path
        this.addedOn = moment().format("MMM Do YY")
        this.addedBy = addedBy
        this.lastModified = lastModified
        this.collection = collection
        this.globalAttr = globalAttr
        this.nativeAttr = nativeAttr
        this.elementId = utils.randId(10)
    },
    AdminRule: function({ruleTitle,ruleResources,ruleId}){
        this.ruleTitle = ruleTitle
        this.ruleResources = ruleResources // array of services
        this.ruleId = ruleId
    },
    AdminUser: function({username,password,firstName,lastName,ruleTitle_id}) {
        this.username = utils.commonStringValidations.vs1('username',username, 8, true)
        this.firstName = utils.commonStringValidations.vs1('First Name', firstName, 3, false)
        this.lastName = utils.commonStringValidations.vs1('Last Name', lastName, 2, false)
        this.password = ((string) => {
            if (utils.validateString({mode:'has-whitespace', value: string}) === true ) {
                throw `invalid-passwrod, password should not have whitespace`
            } 
            
            if(utils.validateString({mode:'is-required',value: string}) === true) {
                throw `invalid-passwrod, password cannot be left undefined, password is required`
            } 
            
            if(password.length < 8) {
                throw `invalid-password: password should at least have a minimum of 8 characters`
            } 

            return string
        })(password)
        this.token = null
        this.adminId = null
        this.ruleTitle_id = ruleTitle_id
    },
}