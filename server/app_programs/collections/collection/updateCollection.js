module.exports = {
    get prop() {
        return {
            funcIsDestructive: false
        }
    },
    async updateCollection({dep,data}) {
        console.log('hello world there!')
    }
}
