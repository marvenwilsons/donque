import procedures from './procedures'
import { mapGetters } from "vuex";
export default {
    mixins: [procedures],
    data: () => ({
        h: undefined,
    }),
    mounted() {
        this.$p = this.h
    },
    methods: {
        $ask({question, truthy, falsey}) {
            this.spawnGlobalModal({
                modalType: 'boolean',
                modalPayload: {
                    truthy,
                    falsey
                }
            })
        },
        newTask(taskArray) {
            taskArray.map(e => {
                console.log(typeof e)
            })
        }
    }
}