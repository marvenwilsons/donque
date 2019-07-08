<template>
  <div id="dq-boxmodel" class="flex flexcenter relative">
    <div id="dq-bxmdl-margin" class="fullwidth fullheight-percent absolute">
      <small>margin</small>
    </div>
    <div id="dq-bxmdl-border" class="fullwidth fullheight-percent absolute">
      <small>border</small>
    </div>
    <div id="dq-bxmdl-padding" class="fullwidth fullheight-percent absolute">
      <small>padding</small>
    </div>
    <div id="dq-bxmdl-dimensions" class="fullwidth fullheight-percent absolute flex flexcenter">
      <small>2116.670 x 0</small>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
#dq-boxmodel {
  height: 100%;
  width: 100%;
}
#dq-bxmdl-margin {
  height: 85%;
  width: 90%;
  border: 1px dashed gray;
  background-color: #ae8152;
}
#dq-bxmdl-border {
  height: 55%;
  width: 70%;
  background-color: #e3c381;
  border: 1px solid whitesmoke;
}
#dq-bxmdl-padding {
  height: 30%;
  width: 50%;
  background-color: #b6c37e;
  border: 1px dashed gray;
}
#dq-bxmdl-dimensions {
  background-color: #87b0bc;
  height: 10%;
  width: 30%;
}
</style>
