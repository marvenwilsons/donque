module.exports = {
    get prop() {
        return {
            funcIsDestructive: false
        }
    },
    async deleteCollection({dep,data}) {
        console.log('hello world there!')
    }
}
