<template>
  <div>View All
    <pre>{{data}}</pre>
  </div>
</template>

<script>
import h from "../../h"

// missing view
export default {
  props: ['my_pane_index','data'],
  mixins: [h],
  data: () => ({
      contents: undefined
  }),
  created() {
    this.mxn = this
  },
  watch: {
    data: {
      deep: true,
      handler() {
        try {
          this.contents = this.data.contents[0].contents[this.data['Collection Name']]
        } catch(err) {
          this.mxnErrLog({
            msg: 'This collection doesnt have any entries! please add new entry',
            closable: false
          })
        }
      }
    }
  }
};
</script>