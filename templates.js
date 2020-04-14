
const randId = (len) => (length => {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * charactersLength)
      );
    }
    return result;
  })(len)


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
    NormalQueueItem({fn,param}) {
        this.fn = fn
        this.param = param
    },
    DonqueDevError(msg) {
        alert(msg)
        location.reload()
    },
    Page({pageName,createdOn,admin_id,lastModified,pageContent,version_id,isUndermaintenance}) {
        this.pageName = pageName
        this.createdOn = createdOn
        this.createdBy = admin_id
        this.lastModified = lastModified
        this.pageContent = pageContent
        this.version_id = version_id
        this.isUndermaintenance = isUndermaintenance
    },
    PageVersion({versionName}){
        this.versionName = versionName
        this.version_id = randId(8)
    },
    PageElement({tag,name,role,inlineStyle,innerText,classList,els,path,addedOn,addedBy,lastModified, collection,globalAttr,nativeAttr}) {
        this.tag = tag
        this.name = name
        this.role = role
        this.inlineStyle = inlineStyle ? inlineStyle : {}
        this.innerText = innerText
        this.classList = classList
        this.els = els ? els : []
        this.path = path
        this.addedOn = addedOn
        this.addedBy = addedBy
        this.lastModified = lastModified
        this.collection = collection
        this.globalAttr = globalAttr
        this.nativeAttr = nativeAttr
        this.elementId = randId(10)
    },
    AdminRule({ruleTitle,ruleResources,ruleId}){
        this.ruleTitle = ruleTitle
        this.ruleResources = ruleResources
        this.ruleId = ruleId
    },
    AdminUser({username,password,firstName,lastName,age,gender,ruleTitle_id,adminId,token}) {
        this.username = username
        this.password = password
        this.firstName = firstName
        this.lastName = lastName
        this.gender = gender
        this.age = age
        this.token = token
        this.adminId = adminId
        this.ruleTitle_id = ruleTitle_id
    },
}