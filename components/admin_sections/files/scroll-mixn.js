export default {
    data: () => ({
        scroll_val: 0,
        scroll_val_temp: 0,
        main_w: undefined,
        max_scroll: 333,
    }),
    computed: {
        get_horizontal_scrolling() {
            return true
        },
        get_scroll_val() {
            return this.scroll_val;
        }
    },
    methods: {

    },
    mounted() {
        // console.log('scoll mixin mounted')

        window.addEventListener("wheel", e => {
            if (e.deltaY > 0) {
              this.scroll_val += 70;
            } else {
              this.scroll_val -= 70;
            }
          });
      
        setTimeout(() => {
            this.main_w = document.getElementById("dqfileSysCon");
        }, 0);
    },
    updated() {
        // console.log('scoll mixin updated')
        const element = document.getElementById("dqfileSysCon");
    
        const max_scroll = element.scrollWidth - element.clientWidth;
        if (max_scroll) {
          this.max_scroll = max_scroll;
        }
      },
    watch: {
        get_scroll_val(current, old) {
            // actives mostly onWheel
            if (this.get_horizontal_scrolling) {
              if (current >= this.max_scroll) {
                if (this.scroll_val_temp) {
                  this.scroll_val = this.scroll_val_temp;
                  this.scroll_val_temp = 0;
                } else {
                  this.scroll_val = this.max_scroll;
                }
              } else if (current < 20) {
                if (this.scroll_val_temp) {
                  this.scroll_val = this.scroll_val_temp;
                  this.scroll_val_temp = 0;
                } else {
                  this.scroll_val = 0;
                }
              }
              this.main_w.scrollLeft = current;
            } else {
              this.scroll_val_temp = current;
            }
          },
        max_scroll() {
            const host = document.getElementById('dqfileSysCon')
            if (host){
                setTimeout(() => {
                    host.scrollTo({ top: 0, left: host.offsetWidth, behavior: 'smooth' })
                },200)
            }
        }  
    }
}