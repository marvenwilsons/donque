export default {
  data: () => ({
    panes: [],
    clickOrigin: undefined,
    payload: undefined
  }),
  methods: {
    pane_reset() {
      /**
       * Occurs when there are multiple pane open then the root menu
       * is clicked, 
       */

      if (this.panes.length > 1) {
        for (var i = 0; this.panes.length - 1; i--) {
          this.panes.splice(i, 1)
        }
      }

    },
    pane_push() {
      /**
       * adds one new pane to the view
       */
    },
    pane_replace_from(StartingIndexToSplice, NumOfCompsToBeReplaced) {

    },
    pane_start(payload, index) {
      this.clickOrigin = index
      this.payload = payload

      // if (this.panes.length == 1) {
      //   this.panes.push(payload)
      //   console.log(index)
      // } else {
      //   console.log(index)
      //   this.panes.push(payload)
      // }
    }
  },
  watch: {
    payload() {
      this.panes.pop()
      this.panes.push(this.payload)
    },
    clickOrigin(currentClick, old) {
      console.log(currentClick)
      // Deps
      const panes = this.panes
      const payload = this.payload

      // Occurs when there are multiple pane open then the root menu is clicked
      if (currentClick == 0 && panes.length > 1) {
        console.log('Case 1')
        for (var i = 0; panes.length - 1; i--) {
          panes.splice(i, 1)
        }
      }

      // When there is only one pane displaying the root menu
      if (panes.length == 1) {
        panes.push(payload)
      }

      //
      if (panes.length > 1 && currentClick == panes.length - 1) {
        panes.push(payload)
      } else if (currentClick != 0 && currentClick != panes.length - 1) {
        console.log('wet!', panes.length - 1 - currentClick)
        const cycle = panes.length - 1 - currentClick
        for (var i = 0; i < cycle; i++) {
          this.panes.pop()
        }

        setTimeout(() => {
          panes.push(payload)

        }, 500);

      }










    }

  }
}
