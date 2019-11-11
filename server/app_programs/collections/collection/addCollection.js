module.exports = {
    get prop() {
        return {
            funcIsDestructive: false
        }
    },
    async addCollection({dep,data}) {
        console.log('hello world there!')
    }
}
