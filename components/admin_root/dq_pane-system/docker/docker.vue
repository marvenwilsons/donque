<template>
  <div class="fullheight-percent flex flexcol">
    <div class="flex1 flex flexcenter">
      <div class="flex flexcenter">
        <div class="dq-fav-con flex flexcenter">
          <!-- fav icon here -->
          <img style="height:50px; width:50px;" src="favicon.ico" alt="">
        </div>
      </div>
    </div>
    <div role="container" class="flex3">
      <div role="docker-host" class="fullheight-percent">
        <div
          class="pad050 pointer padright125 dq-docker-items"
          v-for="(items,item_index) in menu_items"
          :key="`docker-item-${item_index}`"
          :id="`dqdi_${item_index}_${items}`"
          @click="start(items,item_index)"
          v-dq-hover:docker
          v-dq-active:docker="active == item_index || cur_actv == item_index"
        >
          <strong :id="`dqdi_title_${item_index}_${items}`">
            <i v-if="items === 'Administration'" class="fas fa-user-alt padleft025 padright025"></i>
            <i v-if="items === 'Dashboard'" class="fas fa-columns padleft025 padright025"></i>
            <i v-if="items === 'Pages'" class="fas fa-copy padleft025 padright025"></i>
            <i v-if="items === 'Components'" class="fas fa-puzzle-piece padleft025 padright025"></i>
            <i v-if="items === 'Collections'" class="fas fa-server padleft025 padright025"></i>
            <i v-if="items === 'Messages'" class="fas fa-envelope padleft025 padright025"></i>
            <i v-if="items === 'Todos'" class="fas fa-list-alt padleft025 padright025"></i>
            <i v-if="items === 'Profile'" class="fas fa-id-card padleft025 padright025"></i>
            <i v-if="items === 'Files'" class="fas fa-folder padleft025 padright025"></i>
            <i v-if="items === 'Plugins'" class="fas fa-folder-plus padleft025 padright025"></i>
            <i v-if="items === 'Settings'" class="fas fa-cog padleft025 padright025"></i>
            <i v-if="items === 'Marketplace'" class="fab fa-slideshare padleft025 padright025"></i>
            <i v-if="items === 'Database'" class="fas fa-database padleft025 padright025"></i>
            <i v-if="items === 'Console'" class="fas fa-terminal padleft025 padright025"></i>
            <i v-if="items === 'Task'" class="fas fa-tasks padleft025 padright025"></i>
            {{items}}
          </strong>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      cur_actv: undefined,
      active: undefined,
      hoverBgColor: this.$store.state.theme.docker_hover_menu_item_bg_color,
      hoverColor: this.$store.state.theme.docker_hover_text_color
    };
  },
  methods: {
    start(items,item_index) {
      // $store.dispatch('pane_system/start',items)
      // cur_actv = item_index
      if (this.$store.state.pages.stages.length == 0) {
        this.$store.dispatch('pane_system/start',items)
        this.cur_actv = item_index
      } else {
        // modal here
        this.$store.commit("modal/set_modal", {
          head: "Unsave changes deteceted",
          body: "page_warn_unsaved",
          config: {
            ui_type: "custom",
            closable: false
          }
        });
      }
    }
  },
  computed: {
    ...mapGetters({
      listState: "pane_system/list_state"
    }),
    menu_items() {
      return (
        this.$store.state.dashboard_data.resources &&
        Object.keys(this.$store.state.dashboard_data.resources)
      );
    }
  },
  watch: {
    listState(n, o) {
      const a = Object.keys(this.$store.state.dashboard_data.resources).indexOf(
        n[0]
      );
      if (a != -1) {
        this.cur_actv = a;
        this.active = a;
      }
    }
  },
  mounted() {
    this.$store.dispatch("pane_system/init_pane");

    this.cur_actv = 0;

    // setting css defaults to a specific class
    this.$store.dispatch("theme/set_class_css_defaults", {
      class: ["dq-docker-items"],
      css_keys: ["transition"],
      css_values: ["0.2s"]
    });
  }
};
</script>


<style scoped>
.fas.padright025,
.fab.padright025 {
  width: 20px;
}
.dq-fav-con {
  height: calc(var(--fontSize) * 10.25);
  width: calc(var(--fontSize) * 10.25);
  border-radius: 100%;
  background-color: white;
}
</style>