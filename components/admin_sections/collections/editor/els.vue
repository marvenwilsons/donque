<template>
  <div
    :class="['borderRad4', 'margin050', 'flex', 'flexcenter', 'pointer', 'dq-editor-els-el']"
    :style="{minWidth:'90px', height:'90px',boxShadow: data.name == 
    selected ? '1px 1px 10px 1px #393e4281' : ''}"
  >
    <div class style="color: #bdafa7;">
      <strong>{{data.name}}</strong>
    </div>
  </div>
</template>

<script>
export default {
  props: ["data","selected"],

};
</script>

<style>
.dq-editor-els-el {
  background: #f8fcfe;
  box-shadow: 1px 1px 10px 1px #393e4210;
  border: 2px solid #b6def4af;
}
.dq-editor-els-el-active {
  box-shadow: 1px 1px 10px 1px #393e4281;
}
.dq-editor-els-text-color {
  color: #636160;
}
.stage-el-hover:hover {
  border: 1px solid #1ecbe1;
}
</style>