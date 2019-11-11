module.exports = {
    get prop() {
        return {
            funcIsDestructive: false
        }
    },
    async fetchCollections({dep,data}) {
        console.log('hello world there!')
    }
}
