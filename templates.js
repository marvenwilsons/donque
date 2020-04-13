export default {
    TaskItem(taskName,taskParam) {
        this.taskName = taskName
        this.taskParam = taskParam
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
    }
}