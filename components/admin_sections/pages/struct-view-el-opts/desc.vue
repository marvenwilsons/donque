<template>
  <div style="min-width:300px" class="">
    <div class="flex flexcol">
      <span>div <br> more info: <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/div"></a> https://developer.mozilla.org/en-US/docs/Web/HTML/Element/div </span>

      <br />

      <strong>Added by: marvenwilson</strong>
      <strong>id:</strong>
      <strong>directChild</strong>
    </div>
    <div style="height:200px;" id="dq-box-model-v" class="flex1 flex flexcenter">
      <boxModel></boxModel>
    </div>
  </div>
</template>

<script>
import el_box_model from "../page-selected/el-box-model";


export default {
  props: ["data"],
  components: {
    boxModel: el_box_model
  }
};
</script>

<style>
</style>
