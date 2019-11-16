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
          class="flex fullwidth fullheight-percent"
        >
          <div class="flex1 fullwidth fullheight-percent flex flexcol flexcenter">
            <main
              id="dq-modal-host"
              class="flex flexcol"
              :style="{...$store.state.theme.modal_host_style, minWidth: $store.state.modal.width, minHeight: $store.state.modal.height, opacity: 0}"
            >
              <div
                :style="{...$store.state.theme.modal_head_style}"
                class="flex spacebetween pad050"
                v-if="$store.state.modal.head_visibility"
              >
                <div
                  :style="{...$store.state.theme.modal_head_title_style}"
                  class="flex10 padleft050 padbottom025"
                >
                  <strong>{{$store.state.modal.head}}</strong>
                </div>
                <div
                  :style="{...$store.state.theme.modal_head_close_btn_style}"
                  class="flex1 flex flexend pad025 pointer"
                >
                  <i
                    v-if="$store.state.modal.closable"
                    @click="$store.commit('nextAction')"
                    class="fas fa-times"
                  ></i>
                </div>
              </div>
              <div
                class="flex fullheight-percent"
                :style="{...$store.state.theme.modal_body_style}"
              >
                <div class="fullwidth" v-if="$store.state.modal.ui_type === 'custom'">
                  <umd :disp="$store.state.modal.body"></umd>
                </div>
                <div
                  v-if="$store.state.modal.ui_type != 'custom'"
                  class="fullwidth flex1 fullheight-percent  flex flexcol"
                >
                  <div
                    :style="{color: $store.state.modal.ui_type == 'err' ? '#ae1100' : ''}"
                    :class="[$store.state.modal.ui_type == 'err' ? ['pad025','margintop050','err' ,'bordererr' ,'backgrounderr'] : ['pad125','fullwidth', 'flex1', '']]"
                  >{{$store.state.modal.body}}</div>
                  <div class=" flex flexend pointer">
                    <div
                      @click="$store.commit('nextAction')"
                      :style="{...$store.state.theme.modal_button_style}"
                      class="pad025 padleft050 padright050 margintop050"
                    >
                      <strong>Okay</strong>
                    </div>
                  </div>
                </div>
              </div>
            </main>
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
          :bgColor="$store.state.theme.global.primary_bg_color"
          :textColor="$store.state.theme.heading_text_color"
          :adminName="$store.state.dashboard_data.admin_name"
        />
      </div>
      <div
        :style="{flex:1, filter: $store.state.modal.visibility ? 'blur(2px)' : ''}"
        class="flex fullwidth"
      >
        <nuxt />
      </div>
      <!--  -->
    </div>
  </div>
</template>

<script>
import heading from "@/components/admin_root/dq_head/dq_heading.vue";
import { mapGetters } from "vuex";

//modals installation
import page_warn_unsaved from "../components/admin_sections/pages/page-selected/modals/warn-unsaved";
import dq_page_max_editor from "../components/admin_sections/pages/page-selected/modals/dq-page-max-editor";
import universal_modal_display from '../components/admin_root/app_modal/universal_modal_disp'

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
    }),
    modalBody() {
      return this.$store.state.modal.body
    }
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
    heading,

    // modal insatll below
    page_warn_unsaved,
    dq_page_max_editor,
    umd: universal_modal_display
  }
};
</script>

<style>
.bgblue {
  background: blue;
}
</style>
