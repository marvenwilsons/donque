module.exports = {
    get prop() {
        return {
            funcIsDestructive: false
        }
    },
    async deleteCategory({dep,data}) {
        console.log('hello world there!')
    }
}
