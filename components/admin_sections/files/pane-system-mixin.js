export default {
  data: () => ({
    panes: [],
    clickOrigin: undefined,
    payload: undefined
  }),
  methods: {
    pane_start(payload, index) {
      this.clickOrigin = index

      // When there is only one pane displaying the root menu
      // when user clicked in the first pane after summoning 2nd pane
      // Occurs when there are multiple pane open then the root menu is clicked
      if (this.clickOrigin == 0 && this.panes.length > 1) {
        const cycle = this.panes.length - 1 - this.clickOrigin

        //
        for (var i = 0; i < cycle; i++) {
          this.panes.pop()
        }
        setTimeout(() => {
          this.panes.push(payload)

        }, 0);
      } else if (this.panes.length == 1) {
        this.panes.push(payload)
      }

      // 2
      if (this.panes.length > 1 && this.clickOrigin == this.panes.length - 1) {
        this.panes.push(payload)
      } else if (this.clickOrigin != 0 && this.clickOrigin != this.panes.length - 1) {
        // console.log('wet!', panes.length - 1 - this.clickOrigin)
        const cycle = this.panes.length - 1 - this.clickOrigin

        //
        for (var i = 0; i < cycle; i++) {
          this.panes.pop()
        }

        //
        this.panes.push(payload)

      }

    }
  }
}
