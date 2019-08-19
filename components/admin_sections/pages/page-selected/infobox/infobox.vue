<template>
  <div class="flex flexcol">
    <div class="pad025 flex padbottom050">
      <div
        :style="{
          background: $store.state.theme.global.secondary_bg_color
          }"
        class="padleft050 padright050"
      >
        <strong>{{data.tag == undefined ? 'section' : trimTitle(data.tag)}}</strong>
      </div>
    </div>
    <div class="pad025">
      <div
        class="pad025"
        :style="{
            border: `1px 0px 1px 1px solid ${$store.state.theme.global.secondary_bg_color}`
            }"
        v-for="(d,i) in setData(data)"
        :key="`ads-${i}}`"
      >
        <strong>{{i}}:</strong>
        {{d}}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["data"],
  methods: {
    trimTitle(t) {
      if (t) {
        return t.split("_").pop();
      } else {
        return t;
      }
    },
    setData(data) {
      switch (data.tag ? data.tag.split("_")[0] : "section") {
        case "html":
          return {
            id: "",
            ClassList: data.classList,
            "Inline Style": data.inlineStyle,
            Attributes: [],
            Events: [],
            // DirectChildren: data.els ? null : data.els.length,
            Notes: "",
          };
          break;
        case "plugin":
          return {
            msg: "not handled"
          };
          break;
        case "section":
          return {
            Role: data.role,
            DirectChildren: data.els.length,
            Notes: "",
          };
          break;
        case "root":
          return {
            Data: {},
            Methods: {},
            Collection: {},
            onServerLoad: {},
            onClientLoad: {},
            Notes: ''
          };
          break;
      }
    }
  }
};
</script>