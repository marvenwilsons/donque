<template>
  <div>
    <slot></slot>
    <div
      v-show="latest_el_data"
      v-for="(html_el,html_el_i) in new_Els ? new_Els : els"
      :key="html_el_i"
      :is="html_el.tag"
      :els="html_el.els"
      :style="html_el.inlineStyle"
      v-dq-event-handler
      v-dq-prop="html_el"
    >
      {{latest_el_data ? get_prop(html_el.properties,html_el) : ''}}
      {{latest_el_data ? is_dynamic(html_el.properties.text_content) ? html_el.properties.text_content : get_textContent(html_el.properties.text_content,html_el_i) : '' }}
    </div>
    <div class="pad125" v-show="!latest_el_data">
      <strong>Loading ...</strong>
    </div>
  </div>
</template>

<script>
export default {
  name: "html_div",
  props: ["els"],
  data: () => ({
    new_Els: undefined,
    el_data: undefined
  }),
  computed: {
    latest_el_data() {
      return this.el_data;
    }
  },
  created() {
    this.el_data = undefined;
    setTimeout(() => {
      this.el_data = [
        {
          "First Name": "Aidan Anthony",
          "Last Name": "Suficiencia"
        },
        {
          "First Name": "Alec Brent",
          "Last Name": "Manzanilla"
        },
        {
          "First Name": "Althea Grace",
          "Last Name": "Villa Bergundo"
        },
        {
          "First Name": "Anais Nabintu",
          "Last Name": "Baderha"
        },
        {
          "First Name": "Aquileia Alejandra",
          "Last Name": "Geanga"
        },
        {
          "First Name": "Aram",
          "Last Name": "Farah"
        },
        {
          "First Name": "Chase Xander",
          "Last Name": "Paz"
        },
        {
          "First Name": "Chimkemka David",
          "Last Name": "Iyoke"
        },
        {
          "First Name": "Christine Marijke",
          "Last Name": "Bacudio"
        },
        {
          "First Name": "Cristina Lyn",
          "Last Name": "Lagat"
        },
        {
          "First Name": "Easton Janjic",
          "Last Name": "Clarke"
        },
        {
          "First Name": "Elija Angelito",
          "Last Name": "Mendoza-Dela Rosa"
        },
        {
          "First Name": "Gabriel Riley",
          "Last Name": "Garvida"
        },
        {
          "First Name": "Gabriella",
          "Last Name": "Kasule"
        },
        {
          "First Name": "George",
          "Last Name": "Farah"
        },
        {
          "First Name": "Greyson Ian",
          "Last Name": "Espejo"
        },
        {
          "First Name": "Heriberto",
          "Last Name": "Affonso"
        },
        {
          "First Name": "Isaiah",
          "Last Name": "Grant"
        },
        {
          "First Name": "Jacob Calvin",
          "Last Name": "Gatus"
        },
        {
          "First Name": "Jamie Rodel",
          "Last Name": "Tacay"
        },
        {
          "First Name": "Jason Nyanga",
          "Last Name": "Tabika"
        },
        {
          "First Name": "Jenno",
          "Last Name": "Sanna"
        },
        {
          "First Name": "Jeshana Mary",
          "Last Name": "Antony"
        },
        {
          "First Name": "Jessie Rayne",
          "Last Name": "Vasquez"
        },
        {
          "First Name": "Jonathan Vahan",
          "Last Name": "Bashori"
        },
        {
          "First Name": "Joseph kal-El",
          "Last Name": "Rachiele"
        },
        {
          "First Name": "Jouzef",
          "Last Name": "Albdewi"
        },
        {
          "First Name": "Julia Emma",
          "Last Name": "Stanescu"
        },
        {
          "First Name": "Kevn",
          "Last Name": "Abdulnour"
        },
        {
          "First Name": "Kinley Kelliher",
          "Last Name": "Carrabs"
        },
        {
          "First Name": "Liam Dylan",
          "Last Name": "Dizon"
        },
        {
          "First Name": "Lucas Noel",
          "Last Name": "Antonio"
        },
        {
          "First Name": "Madison Rose",
          "Last Name": "Prendegast"
        },
        {
          "First Name": "Manuel",
          "Last Name": "Tarabay"
        },
        {
          "First Name": "Marica Magdalena",
          "Last Name": "Katic"
        },
        {
          "First Name": "Matthew Restrepo",
          "Last Name": "Vergara"
        },
        {
          "First Name": "Mia Isabelle",
          "Last Name": "San Juan"
        },
        {
          "First Name": "Michaella",
          "Last Name": "Kasule"
        },
        {
          "First Name": "Nia Lorrain",
          "Last Name": "Reyes"
        },
        {
          "First Name": "Oliver Paul",
          "Last Name": "Crifo"
        },
        {
          "First Name": "Raphael",
          "Last Name": "Kasule"
        },
        {
          "First Name": "Samantha",
          "Last Name": "Balaga"
        },
        {
          "First Name": "Samara",
          "Last Name": "Alfarero"
        },
        {
          "First Name": "Sebastian",
          "Last Name": "Eduardo"
        },
        {
          "First Name": "Sham Samer",
          "Last Name": "Khazal"
        },
        {
          "First Name": "Yasmin Rosaria",
          "Last Name": "Beekmeyer-Anton"
        },
        {
          "First Name": "Zoe Mae",
          "Last Name": "Lacorte"
        }
      ];
    }, 1000);
  },
  methods: {
    is_dynamic(text) {
      const regex = /\{{(.*)\}}/g;
      let m = regex.exec(text);

      return m == null;
    },
    get_textContent(text, ObjectIndex) {
      // regex setup
      const regex = /\{{(.*)\}}/g;

      //
      const getValue = key => {
        return this.el_data[ObjectIndex][key.split("{{").pop()];
      };

      //
      let finalStr = "";
      text.split("}}").map(c => {
        const str = `${c}}}`
          .replace(new RegExp("{{(.*)}}", "g"), getValue(c))
          .replace("}}", "");
        finalStr += str;
      });

      //
      return finalStr;
    },
    get_prop(prop, el) {
      if (prop.attributes.isAList == "Yes") {
        // copy func
        const copy = o => {
          if (o === null) return null;

          var output, v, key;
          output = Array.isArray(o) ? [] : {};
          for (key in o) {
            v = o[key];
            output[key] = typeof v === "object" ? copy(v) : v;
          }

          return output;
        };

        // copy because is not letting me mutate it
        const original = copy(el);
        const els_copy = copy(this.els);

        // loop :)
        for (var i = 0; i < this.latest_el_data.length - 1; i++) {
          els_copy.push(original);
        }

        // to avoid infinite  loop
        els_copy.map(e => {
          e.properties.attributes.isAList = "No";
        });

        // send to heaven
        this.new_Els = els_copy;
      }
    }
  }
};
</script>

<style>
</style>
