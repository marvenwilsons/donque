<template>
  <div>
    <!-- <debug
      :data="{$data:{catName_model,err,$computed:{get_FinalCategoryName}},$props:{data,categories,my_pane_index}}"
    ></debug> -->
    <div class="marginbottom050">
      Category name for: <i>{{data.CategoryName}}</i>
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
        <button v-if="can_cancel" @click="$emit('onCancel')" class="buttonreset darkprimary pad050 borderRad4">Cancel</button>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: ["categories", "my_pane_index", "data","can_cancel"],
  data: () => ({
    catName_model: undefined,
    err: undefined,
    info: undefined,
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
        //
        this.$emit("onWritingData", "Category");
        // send
        this.$store
          .dispatch("systemCall", {
            command: "addRootCategory",
            section: "collectionMethods",
            data: {
              category_name: `${this.data.CategoryName}/${this.catName_model}`,
              from_collection: this.data.CollectionName
            },
            method: "post"
          })
          .then(({ data, status }) => {
            if (status) {
              console.log('success baby!!')
              //
              this.$store.dispatch("collections/getCollectionDataFromServer");
              this.$emit("onWritingData", undefined);
            }
          })
          .catch(err => {
            alert(err)
          });
      }
    }
  },
  mounted() {
    setTimeout(() => {
      document.getElementById("dq-category-m-inp").focus();
    }, 100);
  }
};
</script>