<template>
  <div style="width:400px;">
    <!-- prompt password -->
    <div v-if="disp == 'prompt_password'" class="pad125">
      <div class="backgroundinfo pad050 borderRad4">
        <span><strong>Notice:</strong> for distructive operations, like deleting a resource into the database, password is required to continue.</span>
      </div>
      <div class="margintop050">
        <strong><form ><input autocomplete="off" id="dq-pp-mdl" type="password" placeholder="password" class="pad050 fullwidth"></form></strong>
      </div>
      <div class="flex flexend margintop050">
        <div class="marginright050">
          <button class="buttonreset pad050 darkprimary borderRad4">Continue</button>
        </div>
        <button @click="closeModal" class="buttonreset pad050 darkprimary borderRad4">Cancel</button>
      </div>
    </div>
    <!-- page warn -->
    <pwu v-if="disp === 'page_warn_unsaved'" ></pwu>
    <!-- success -->
    <div class="pad050" v-if="disp.ui === 'success'">
      <div class="backgroundinfo pad125">{{disp.text}}</div>
      <div class="margintop050 flex flexend"><button @click="closeModal" class="buttonreset pad050 darkprimary borderRad4">Okay</button></div>
    </div>
  </div>
</template>

<script>
import page_warn_unsaved from "@/components/admin_sections/pages/page-selected/modals/warn-unsaved";

export default {
  props: ['disp'],
  methods: {
    closeModal() {
      this.$store.commit('nextAction')
      this.$store.commit('modal/set_visibility', false);
    }
  },
  mounted() {
    setTimeout(() => {
      document.getElementById('dq-pp-mdl').focus()
    }, 0);
  },
  components: {
    pwu: page_warn_unsaved
  }
};
</script>

<style>
.btn-okay {
  justify-content: flex-end;
}
.msgbox {
  padding-left: calc(var(--fontSize) * 1.25);
  padding-right: calc(var(--fontSize) * 1.25);
  align-content: center;
  align-items: center;
}
.btn-okay > span {
  padding: calc(var(--fontSize) * 0.5);
  padding-left: calc(var(--fontSize) * 1.25);
  padding-right: calc(var(--fontSize) * 1.25);
  margin: calc(var(--fontSize) * 0.5);
  cursor: pointer;
  font-weight: 600;
  color: white;
  background-color: var(--blue-1);
}
.dialog{
  max-width: 410px;
}
.dia-err{
  background-color:  #ae110036;
  padding: calc(var(--fontSize) * 1.25);
  border-radius: 5px;
  color: #ae1100;
  border: 2px dashed #ae110036;
}
.dia-succ{
  background-color:  #f5f9f7;
  padding: calc(var(--fontSize) * 1.25);
  border-radius: 5px;
  border: 2px dashed #e1fcee;
  color: #038203;
}
.backgroundinfo{
  background: #D8E4EB;
  border: 1px solid rgba(16, 136, 206, 0.082);
  color: #1087CE;
  border-left: 5px solid rgba(16, 136, 206, 0.596);
}
</style>
