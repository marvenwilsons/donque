<template>
  <div>View All
    hello
    <pre>{{this.data}}</pre>
  </div>
</template>

<script>
export default {
  props: ['my_pane_index','data'],
  beforeCreate() {
    this.$store.commit("pane_system/set_pane_config", {
      title: null,
      pane_width: "800px",
      pane_head_bg_color: "rgb(48, 51, 64)",
      renderOnce: true,
      pane_head_title_color: "white"
    });
  },
  mounted() {
    console.clear()
    console.log(this.data)
    console.log(this.$store.state.collections)
    this.$store.dispatch("systemCall", {
        command: "getCollectionContents",
        section: "collectionMethods",
        data: {
            collectionName: this.data['Collection Name']
        },
            method: "post"
    }).then(({ data, status }) => {
        console.log('success', data)
    }).catch(err => {
        console.log('an error', err)
    })


    // fetch collection contents
    this.$store.commit("pane_system/alter_pane_config", {
      pane_index: this.my_pane_index,
      alter: {
        title: `View All ${this.data['Collection Name']}`
      }
    });
  }
};
</script>