module.exports = {
    get prop() {
        return {
            funcIsDestructive: true
        }
    },
    async deleteCollection({dep,data}) {
        console.log('hello world there!')

        return new Promise((resolve,reject) => {
            resolve({
                status: true,
                data: {
                    actions: []
                }
            })
        })
    }
}
