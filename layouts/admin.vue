<template>
  <div v-if="isReady" class="fullheight-VH relative" style="overflow:hidden">
    <div class="absolute fullwidth fullheight-percent relative flex flexcol">
      <!-- modal container-->
      <div
        v-if="$store.state.modal.visibility"
        class="absolute fullwidth fullheight-percent flex flexcenter relative"
        style="z-index:100;"
      >
        <div
          :style="{background: `${$store.state.theme.heading_bg_color}`, opacity: 0.3}"
          class="fullheight-percent absolute fullwidth"
        ></div>
        <div
          v-if="$store.state.modal.body && $store.state.modal.head"
          style="z-index:100;top: 200px;"
        >
          <div :style="{minWidth:200+'px', ...$store.state.theme.modal_host_style}">
            <div :style="{...$store.state.theme.modal_head_style}" class="flex spacebetween pad025">
              <div
                :style="{...$store.state.theme.modal_head_title_style}"
                class="flex10 padleft025"
              >
                <strong>{{$store.state.modal.head}}</strong>
              </div>
              <div
                :style="{...$store.state.theme.modal_head_close_btn_style}"
                class="flex1 flex flexend pad025 pointer"
              >
                <i v-if="$store.state.modal.closable" @click="$store.commit('nextAction')" class="fas fa-times"></i>
              </div>
            </div>
            <div :style="{...$store.state.theme.modal_body_style}">
              <div v-if="$store.state.modal.ui_type === 'custom'">
                <div :is="$store.state.modal.body"></div>
              </div>
              <div v-if="$store.state.modal.ui_type != 'custom'" class="pad025">
                <div
                  :style="{color: $store.state.modal.ui_type == 'err' ? '#ae1100' : ''}"
                  class="pad125"
                >{{$store.state.modal.body}}</div>
                <div class="pad025 flex flexend pointer">
                  <div
                    @click="$store.commit('nextAction')"
                    :style="{...$store.state.theme.modal_button_style}"
                    class="pad025 padleft050 padright050"
                  ><strong>Okay</strong></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 
        nuxt heading and 
        body of the admin area
      -->
      <div
        :style="{filter: $store.state.modal.visibility ? 'blur(2px)' : ''}"
        v-if="$store.state.dashboard_data.dashboard_ready"
      >
        <heading
          :bgColor="$store.state.theme.heading_bg_color"
          :textColor="$store.state.theme.heading_text_color"
          :adminName="$store.state.dashboard_data.admin_name"
        />
      </div>
      <div
        :style="{flex:1, filter: $store.state.modal.visibility ? 'blur(2px)' : ''}"
        class="flex fullwidth"
      >
        <nuxt/>
      </div>
      <!--  -->
    </div>
  </div>
</template>

<script>
import heading from "@/components/admin_root/dq_head/dq_heading.vue";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      isReady: true,
      modViz: false
    };
  },
  computed: {
    ...mapGetters({
      dashboard_ready: "dashboard_data/dashboard_ready"
    })
  },
  watch: {
    dashboard_ready(n, o) {
      this.$store.commit("modal/set_visibility", o);
      this.modViz = o;
    }
  },
  mounted() {
    this.$store.commit("modal/set_visibility", true);
    if (localStorage.getItem("username")) {
      this.$store.dispatch("dashboard_data/set_admin_data", {
        username: localStorage.getItem("username"),
        token: localStorage.getItem("auth")
      });
    } else {
      location.href = "dqlogin";
    }

    // check localstorage for auth token
    if (!localStorage.getItem("auth")) {
      this.isReady = false;
      location.href = "dqlogin";
    } else {
      this.isReady = true;
    }
  },
  components: {
    heading
  }
};
</script>

<style>
.bgblue {
  background: blue;
}
</style>
