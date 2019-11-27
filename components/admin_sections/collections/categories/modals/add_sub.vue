<template>
  <div>
    <debug
      :data="{$data:{catName_model,err,payload,$computed:{get_FinalCategoryName,get_CollectionName}},$props:{data,categories,my_pane_index}}"
    ></debug>
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
  computed: {
    get_FinalCategoryName() {
      return `${this.data.actionCastOn["Category Name"]}/${this.catName_model}`;
    },
    get_CollectionName() {
      return this.data.actionCastOn["Collection Name"];
    }
  },
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
    filter_Categories(expect_for, all_Categories) {
      /**
       * filters the raw array of categories
       * it will only return the set of strings that has
       * the value of "expect_for" in it
       */
      let final = []

      // start
      all_Categories.map(categories => {
        if(categories.includes(`${expect_for}/`)) {
          /**
           * I have to push it because if I return it from here
           * it will include a null to the final array
           */ 
          
          final.push(categories)
        }
      })

      // fire away!
      return final
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
        this.$emit("onWritingData", "Category");

        // console.log(new_category_name)

        // send
        this.$store
          .dispatch("systemCall", {
            command: "addCategory",
            section: "collectionMethods",
            data: {
              category_name: this.get_FinalCategoryName,
              from_collection: this.get_CollectionName
            },
            method: "post"
          })
          .then(({ data, status }) => {
            if (status) {
              //
              const root_category = this.data.actionCastOn['Category Name']
              this.payload = this.filter_Categories(root_category,data.payload.categories);
              this.$emit("onRefreshCat", data.payload);
              // triggers loading
              this.$emit("onWritingData", undefined);
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
  }
};
</script>