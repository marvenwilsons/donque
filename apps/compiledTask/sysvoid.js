export default {
    update() {

    },
    'prompt-password'() {
        return [
            {
                taskName: 'ask',
                taskParam: {
                    question: 'A new version of dq studio is available do you want to update now?',
                    truthy: 'update now',
                    falsey: 'later'
                }
            },
            {
                taskName: 'closeModal',
                taskParam: {}
            },
            {
                taskName: 'done',
                taskParam: {}
            }
        ]
    },
    showLoading() {

    }
}