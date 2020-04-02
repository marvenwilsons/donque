import procedures from './procedures'

export default {
    mixins: [procedures],
    data: () => ({
        h: undefined,
        state: false,
        helperData: undefined
    }),
    watch: {
        
    },
    created() {
        console.log('> mounting helper')
    },
    mounted() {
        this.$p = this.h
    }
}