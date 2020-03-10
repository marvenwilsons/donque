export default {
  data: () => ({
    new_Els: undefined,
    el_data: undefined,
    isInit: false,
  }),
  computed: {
    latest_el_data() {
      return this.el_data;
    }
  },
  created() {
    this.el_data = [];
  },
}
