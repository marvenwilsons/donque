module.exports = {
    get prop() {
        return {
            funcIsDestructive: false
        }
    },
    async addCategory({dep,data}) {
        console.log('hello world there!')
    }
}
