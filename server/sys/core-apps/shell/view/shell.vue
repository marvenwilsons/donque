<template>
  <div class="borderred fl shellbody shell-textcolor-user" >
      <div class="flex">
          <div class="shell-textcolor-currentuser">
          marven@marven:~$ 
      </div>
      <input id="shell-input" type="text">
      </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
        user_group:undefined,
        current_user:undefined,
        current_stack:undefined
    }
  },
  mounted(){
      this.$store.commit("assign_pane_title", "@marven yeah!");
  }
};
</script>

<style>
.shellbody{
    background-color: #232729;
}
.shell-textcolor-user{
    color: white;
}
.shell-textcolor-currentuser{
    color: #5be616;
    font-weight: bold;
    padding-left: 5px;
    padding-right: 10px;
    font-family: monospace;
}
#shell-input{
    background: none;
    border: none;
    color: white;
    width: 100%;
    font-family: monospace;
}
#shell-input:focus{
    border-style: none;
    outline: none;
}
.fl{
    height: 97%;
}
</style>:


