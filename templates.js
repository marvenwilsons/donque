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
    Page() {
        
    },
    TimeStamp({createdBy,createdOn}) {
        this.createdBy = createdBy
        this.createdOn = createdOn
    },
    AdminRule({ruleTitle,ruleResources}){
        this.ruleTitle = ruleTitle
        this.ruleResources = ruleResources
    },
    AdminUser({username,password,ruleTitle}) {
        this.username = username
        this.password = password
        this.ruleTitle = ruleTitle
    },
    AdminResource() {

    }
}