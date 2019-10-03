import Vue from "vue";

Vue.directive("dq-prop", {
  bind(el, { value }, vnode) {
    console.log("directive");
    if (value) {
      // classlist
      if (value.classList.length != 0) {
        value.classList.map(classname => {
          el.classList.add(classname);
        });
      }

      if (value.properties) {
        const setattr = attr => {
          value.properties.attributes[attr] &&
            el.setAttribute(attr, value.properties.attributes[attr]);
        };

        const setNativeAttr = attr => {
          value.properties.native_attributes[attr] &&
            el.setAttribute(attr, value.properties.native_attributes[attr]);
        };

        // global attr
        if (value.properties.attributes) {
          // id
          value.properties.attributes.id && setattr("id");
          // name
          value.properties.attributes.name && setattr("name");
          // tabindex
          value.properties.attributes.tabindex && setattr("tabindex");
        }

        // native attr
        if (value.properties.native_attributes) {
          /**
           * Button Native props
           */
          // value
          value.properties.native_attributes.value && setNativeAttr("value");
          // autofucos
          value.properties.native_attributes.autofucos &&
            setNativeAttr("autofucos");
          //disabled
          value.properties.native_attributes.disabled &&
            setNativeAttr("disabled");
          // formenctype: type =submit
          value.properties.native_attributes.formenctype &&
            setNativeAttr("formenctype");
          //formmethod
          value.properties.native_attributes.formmethod &&
            setNativeAttr("formmethod");
          //formnovalidate
          value.properties.native_attributes.formnovalidate &&
            setNativeAttr("formnovalidate");
          //formtarget
          value.properties.native_attributes.formtarget &&
            setNativeAttr("formtarget");
          // type
          value.properties.native_attributes.type && setNativeAttr("type");

          /**
           * Anchor native props
           */
          // target
          value.properties.native_attributes.target && setNativeAttr("target");
          // title
          value.properties.native_attributes.title && setNativeAttr("title");
          // href
          value.properties.native_attributes.href && setNativeAttr("href");
          // download
          value.properties.native_attributes.download &&
            setNativeAttr("download");
        }
      }

      // native attr
    }
  }
});
