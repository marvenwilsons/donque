<template>
  <div>
    <!-- prompt_err -->
    <div
      v-if="$store.state.current_action_title == 'prompt_err'"
      class="fullwidth fullheight-percent flex flexcol "
    >
      <div class="fullheight-percent flex msgbox flex flexcenter ">
        <span class="dialog fullwidth dia-err">{{$store.state.message}}</span>
      </div>
      <div class="btn-okay flex">
        <span @click="closeModal">Okay</span>
      </div>
    </div>
    <!-- prompt_msg -->
    <div
      v-if="$store.state.current_action_title == 'prompt_msg'"
      class="fullwidth fullheight-percent flex flexcol"
    >
      <div class="fullheight-percent flex msgbox">
        <span class="dialog fullwidth dia-succ">{{$store.state.message}}</span>
      </div>
      <div class="btn-okay flex">
        <span @click="closeModal">Okay</span>
      </div>
    </div>
    <!-- maximize -->
    <!-- prompt_password -->
    <!-- prompt_credentials -->
  </div>
</template>

<script>
export default {
  methods: {
    closeModal() {
      this.$store.state.modal.commit('set_visibility', false);
    }
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
</style>
