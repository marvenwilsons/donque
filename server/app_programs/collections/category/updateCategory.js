module.exports = {
    get prop() {
        return {
            funcIsDestructive: false
        }
    },
    async updateCategory({dep,data}) {
        console.log('hello world there!')
    }
}
