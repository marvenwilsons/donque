export default {
  data: () => ({
    elements: [{
        name: 'IMG'
      },
      {
        name: 'VIDEO'
      },
      {
        name: 'AUDIO'
      },
      {
        name: 'TABLE'
      },
      {
        name: 'HEADING'
      },
      {
        name: 'P'
      },
      {
        name: 'GRID'
      }
    ],
    currentClicked: []
  }),
  computed: {
    cHover() {
      return this.$store.state.editor.currentHover
    },
    cClicked() {
      return this.$store.state.editor.currentClicked
    }
  },
  watch: {
    cHover(current, old) {
      // console.log(current)
      // console.log('\n\n')
    },
    cClicked(current, old) {
      this.currentClicked.push(current)

    }
  }
}
