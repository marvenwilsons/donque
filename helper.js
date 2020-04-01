import procedures from './procedures'

export default {
    mixins: [procedures],
    data: () => ({
        h: undefined,
    }),
    methods: {
        getView(viewName) {

        }
    },
    created() {
        console.log('> mounting helper')
    }
}