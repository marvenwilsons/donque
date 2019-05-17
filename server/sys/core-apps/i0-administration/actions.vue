<template>
  <div id="dq-action-wrap" class="">
    <div class="bordergray-dashed pad125 margin125">
        <strong>Team Actions</strong>
        <div class="bleft pad125 borderred">
          <div>Team that Marven is currently assigned</div>
        </div>
    </div>
    <div class="bordergray-dashed pad125 margin125">
        <strong>Permission actions</strong>
    </div>
    <div class="bordergray-dashed pad125 margin125">
        <strong>
            Resource methods actions
        </strong>
    </div>
    <div class="bordergray-dashed pad125 margin125">
        <strong>Drop Admin</strong>
    </div>
  </div>
</template>

<script>
export default {
  props: ["inputData"],
  data() {
    return {
      resource: this.inputData.resource
    };
  }
};
</script>

<style>
.bordergray-dashed{
  /* border: 2px dashed rgba(128, 128, 128, 0.308); */
  background: white;
}
.bleft{
  border-left: 2px dashed rgba(128, 128, 128, 0.308);

}
</style>
