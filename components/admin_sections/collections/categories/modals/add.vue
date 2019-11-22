<template>
  <div>
    <div class="marginbottom050">
      Category Name
      <input
        id="dq-category-m-inp"
        v-model="catName_model"
        class="pad050 fullwidth"
        type="text"
      />
    </div>
    <transition name="fade">
      <div v-if="err">
        <div class="backgrounderr err pad050 marginbottom050 borderRad4">{{err}}</div>
      </div>
    </transition>
    <transition name="fade">
      <div v-if="info">
        <div class="backgroundinfo pad050 marginbottom050 borderRad4">{{info}}</div>
      </div>
    </transition>
    <transition name="fade">
      <div class="flex flexend">
        <div class="marginright050">
          <button
            @click="submit_NewCategory"
            class="buttonreset darkprimary pad050 borderRad4"
          >Add Category</button>
        </div>
        <button @click="$emit('onCancel')" class="buttonreset darkprimary pad050 borderRad4">Cancel</button>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: ["categories", "my_pane_index", "data"],
  data: () => ({
    catName_model: undefined,
    err: undefined,
    info: undefined,
    payload: undefined
  }),
  watch: {
    catName_model(current, prev) {
      // not allow special characters
      const regex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/gim;

      // check if current already exist
      if (this.categories) {
        const current_Cats = this.categories.map(catName => {
          return catName["Category Name"].toUpperCase();
        });

        if (current_Cats.includes(current.toUpperCase())) {
          this.err = `the "${current}" category name already exist`;
          this.info = `Note: Category name is spelling sensitive, it doesnt matter if characters are in different casing, if the spelling is the same it would throw an error.`;
        } else if (regex.exec(current) != null) {
          this.err = "Special characters are not allowed";
        } else {
          this.err = undefined;
          this.info = undefined;
        }
      }
    }
  },
  methods: {
    test() {
      console.log("hello");
      this.$emit("onLoading", false);
      console.log(this);
    },
    submit_NewCategory() {
      // validations
      if (this.catName_model == undefined) {
        this.err = "Category name cannot be undefined";
      } else {
        if (this.catName_model.trim() == "") {
          this.err = "Category name cannot be empty";
        }
      }

      // send to server
      if (!this.err) {
        // construct category name
        const parent_category = this.data.actionCastOn["Category Name"];
        let new_category_name = undefined;
        if (this.my_pane_index == 1 || this.my_pane_index > 1) {
          new_category_name = parent_category + "/" + this.catName_model;
        } else if (this.my_pane_index < 1) {
          new_category_name = this.catName_model;
        }

        //
        this.$emit("onWritingData", true);

        setTimeout(() => {
          this.$emit("onWritingData", false);
        }, 500);

        // send
        this.$store
          .dispatch("systemCall", {
            command: "addCategory",
            section: "collectionMethods",
            data: {
              category_name: new_category_name,
              is_root: this.my_pane_index == 0 ? true : false,
              from_collection: this.data.actionCastOn["Collection Name"]
            },
            method: "post"
          })
          .then(({ data, status }) => {
            if (status) {
              console.log("should have closed!");
              //
              this.payload = data.payload.categories;
              this.$emit("onRefreshCat", data.payload.categorie);

              this.test();
            }
          })
          .catch(err => {
            console.log("Add.vue Error!".red, err);
          });
      }
    }
  },
  mounted() {
    document.getElementById("dq-category-m-inp").focus();
    console.log(this.categories);
  }
};
</script>