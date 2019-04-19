<template>
  <div class="flex flexcol flexwrap  relative">
    <div class="absolute fullheight-percentt fullwidth">
      <span class="pointer flex objtfy-list-render" v-for="(props,index) in inputData" :key="props">
        <span class="objtfy-list-items flex objtfy-props">{{index}}:</span>
        <span class="objtfy-list-items flex objtfy-values">
          <span>{{typeof props === 'string' ? props : '' }}</span>
          <span class="objtfy-expand">{{typeof props === 'object' ? '...expand' : '' }}</span>
        </span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["inputData"]
};
</script>

<style>
.objtfy-props {
  flex: 1;
  font-weight: 600;
}
.objtfy-values {
  flex: 3;
}
.objtfy-list-items {
  padding: var(--size-1-half);
  color: var(--dark-1);
  flex-wrap: wrap;
}
.objtfy-list-items > span {
  word-wrap: break-word;
  /* flex-wrap: wrap; */
  flex-basis: 600px !important;
  max-width: 600px !important;
}
.objtfy-list-render:nth-child(even) {
  /* background-color: #86a6bd3d; */
  background-color: #86a6bd15;
}
.objtfy-list-render:nth-child(odd) {
  background-color: #86a6bd3d;
}
.objtfy-expand:hover{
    text-decoration: underline;
}
</style>
