export default {
        adminLoad: function() {
           return [] 
        },
        updateChecker: function() {
            return []
        },
        sample: function() {
            return [
                {
                    taskName: 'ask',
                    taskParam: {
                        question: 'are you sure you want to continue?',
                        truthy: 'yes continue',
                        falsey: 'no cancel'
                    }
                },
                {
                   taskName: 'closeModal',
                   taskParam: {}
                },
                {
                    taskName: 'ask',
                    taskParam: {
                        question: 'ARE YOU REALLY REALLY REALLY SURE?',
                        truthy: 'yes continue',
                        falsey: 'no cancel'
                    }
                },
                {
                   taskName: 'closeModal',
                   taskParam: {}
                },
                {
                    taskName: 'exec',
                    taskParam(curentAnswer) {
                        if(curentAnswer)  {
                            return {
                                taskName: 'ask',
                                taskParam: {
                                    question: 'HELLO WORLD!',
                                    truthy: 'Why Helllo There',
                                    falsey: 'GEt OUT!'
                                }
                            }
                        } else {
                            return {
                                taskName: 'ask',
                                taskParam: {
                                    question: 'Are you sure you want to cancel transaction?',
                                    truthy: 'Yes',
                                    falsey: 'No'
                                }
                            }
                        }
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
        }
    
}