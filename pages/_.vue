<template>
    <div>
        hello
    </div>
</template>

<script>
import h from '@/helper'

export default {
    mixins: [h],
    data: () => ({

    }),
    layout: context => {
        switch(context.route.path) {
            case '/dqadmin':
                console.log('> admin selected')
                // run procedures

            break
            case '/dqlogin':
                console.log('> login selected')
            break
        }

        if(context.route.path != '/dqlogin' || context.route.path != '/dqadmin') {
            console.log('> mounting public')
        }
    }
}
</script>