<template>
  <div class="fullheight-percent">
    <!-- admins -->
    <div v-if="$store.state.comp.arr[1].headName === 'Admins'" class="fullwidth fullheight-percent">
      <div
        v-if="$store.state.administrationCurrentView === 'Add new admin'"
        class="fullheight-percent"
      >
        <admin-form/>
      </div>
      <div v-if="$store.state.administrationCurrentView === 'See admin list'">admin list here</div>
    </div>
    <!-- Teams -->
    <div v-if="$store.state.comp.arr[1].headName === 'Teams'" class="borderred fullwidth">
      <span>Create new team</span>
    </div>
    <!-- roles -->
    <div v-if="$store.state.comp.arr[1].headName === 'Roles'" class="borderred fullwidth">
      <span>Create new roles</span>
    </div>
    <!-- organizational chart -->
    <div
      v-if="$store.state.comp.arr[1].headName === 'Organizational Chart'"
      class="borderred fullwidth"
    >
      <span>
        <h1>Organizational chart baby!</h1>
      </span>
    </div>
  </div>
</template>

<script>
import adminForm from "./addNewAdminForm.vue";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
    };
  },
  components: {
    adminForm
  },
  computed: {
    ...mapGetters({
      isCurrentProcessDone: "isCurrentProcessDone"
    })
  },
  watch: {
    isCurrentProcessDone(oldVal, newVal) {
      console.log("testing!");
    }
  }
};
</script>

<style>
</style>