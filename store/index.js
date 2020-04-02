export const state = () => ({
    adminName: '',
    siteName: '',
    adminPermSet: undefined
})

export const actions = {
    nuxtServerInit (store,context) { 
        console.log('> NuxtServerInit')
        console.log()
    }
}