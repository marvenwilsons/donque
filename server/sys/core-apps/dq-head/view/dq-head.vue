<template>
  <div id="dqhead-wrapper" class="flex">
    <div>
      <div class="dqhead-items">
        <strong>dq-studio / {{siteTitle}}</strong>
      </div>
    </div>
    <div class="flex flexcenter">
      <!-- <div @click="notifications('notify')" class="dqhead-items pointer flex">
          <span class="flex relative">
              <icon id="dq-head-notif-con" class="absolute flexcenter" />
          </span>
      </div> -->
      <div id="dq-head-cur-user" class="flex pointer">
        <span @click="notifications('user')" class="relative">
          <strong>{{$store.state.admin.adminName}}</strong>
          <br><span id="dq-head-user-title" class="absolute">owner</span>
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="35"
          height="40"
          viewBox="0 0 220 224"
          style=" fill:#000000;"
        >
          <g
            fill="none"
            fill-rule="nonzero"
            stroke="none"
            stroke-width="1"
            stroke-linecap="butt"
            stroke-linejoin="miter"
            stroke-miterlimit="10"
            stroke-dasharray
            stroke-dashoffset="0"
            font-family="none"
            font-weight="none"
            font-size="none"
            text-anchor="none"
            style="mix-blend-mode: normal"
          >
            <path d="M0,224v-224h224v224z" fill="none"></path>
            <g fill="#ffffff">
              <path
                d="M168,18.66667h-112c-10.31333,0 -18.66667,8.35333 -18.66667,18.66667v149.33333c0,10.31333 8.35333,18.66667 18.66667,18.66667h112c10.31333,0 18.66667,-8.35333 18.66667,-18.66667v-149.33333c0,-10.31333 -8.35333,-18.66667 -18.66667,-18.66667zM112,56c15.86667,0 28,12.13333 28,28c0,15.86667 -12.13333,28 -28,28c-15.86667,0 -28,-12.13333 -28,-28c0,-15.86667 12.13333,-28 28,-28zM152.44133,168h-80.88267c-3.444,0 -6.22533,-2.78133 -6.22533,-6.22533v-3.108c0,-14.66267 23.44533,-28 46.66667,-28c23.22133,0 46.66667,13.33733 46.66667,28v3.108c0,3.444 -2.78133,6.22533 -6.22533,6.22533z"
              ></path>
            </g>
          </g>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import icon from "./icon.vue";
export default {
  data() {
    return {
      siteTitle: undefined,
      title: undefined,
      username: undefined,
      notificationPaneIsOpen: false
    };
  },
  methods: {
    logout() {
      location.href = "dqlogin";
    },
    notifications(e) {
        this.notificationPaneIsOpen = !this.notificationPaneIsOpen
        this.$store.commit('notificationPane',{
            mode: e,
            isOpen: this.notificationPaneIsOpen
        })
    }
  },
  components: {
    icon
  },
  mounted() {
    this.siteTitle = this.$store.state.admin.siteTitle;
    this.title = this.$store.state.admin.title;
    this.username = this.$store.state.admin.username;
  }
};
</script>

<style>
#dqhead-wrapper {
  justify-content: space-between;
  padding-left: calc(var(--fontSize) * 1.25);
  padding-right: calc(var(--fontSize) * 0.25);
}
.dqhead-items {
  padding-top: calc(var(--fontSize) * 0.5);
  padding-bottom: calc(var(--fontSize) * 0.5);
  padding-left: calc(var(--fontSize) * 0.25);
  color: white;
}
#dq-head-cur-user {
  color: white;
  padding-left: calc(var(--fontSize) * 2.25);
}
#dq-head-user-title{
    top:16px;
}
#dq-head-notif-con{
    top: -12px;
    left: -13px;
}
</style>


