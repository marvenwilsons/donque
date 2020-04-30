<template>
    <v-flex  relative style="overflow-y:scroll;background:rgb(51, 51, 51);" >
        <div class="absolute fullwidth" >
            <JsonViewer 
                class="fullwidth"
                :value="myData"
                :expand-depth=99
                sort
                theme="my-awesome-json-theme"
            />
        </div>
    </v-flex>
</template>

<script>
import h from '@/helper'
import Templates from '@/templates'
import 'vue-json-viewer/style.css'

export default {
    mixins: [h],
    props:['myData'],
    created() {
        this.h = this
    },
    data: () => ({
        t: undefined
    }),
    mounted() {
    }
}
</script>

<style lang="scss">
.my-awesome-json-theme {
  background: var(--deftheme-dark-primary);
  white-space: nowrap;
  color: white;
  font-size: 16px;
  font-family: Consolas, Menlo, Courier, monospace;
 
  .jv-ellipsis {
    color: #999;
    background-color: #eee;
    display: inline-block;
    line-height: 0.9;
    font-size: 0.9em;
    padding: 0px 4px 2px 4px;
    vertical-align: 2px;
    cursor: pointer;
    user-select: none;
  }
  .jv-button { color: #49b3ff }
  .jv-key { color: #fc1e70}
  .jv-item {
    &.jv-array { color: white}
    &.jv-boolean { color: #fc1e70 }
    &.jv-function { color: white }
    &.jv-number { color: white }
    &.jv-object { color: white }
    &.jv-undefined { color: #e08331 }
    &.jv-string {
      color: white;
      word-break: break-word;
      white-space: normal;
    }
  }
  .jv-code {
    .jv-toggle {
      &:before {
        padding: 0px 2px;
      }
      &:hover {
        &:before {
        //   background: #eee;
        }
      }
    }
  }
}
</style>