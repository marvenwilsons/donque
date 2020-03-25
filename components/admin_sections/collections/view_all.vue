<template>
  <div class="relative fullheight-percent" >
    <div v-if="contents" class=" flexcol flex fullwidth fullheight-percent" >
        <d-table
            @onAddEntry="onAddEntry" 
            @onItemDelete="onItemDelete"
            @onSaveQuery="onSaveQuery"
            @onCreateView="onCreateView"
            @onDeleteView="onDeleteView"
            @onDeleteQuery="onDeleteQuery"
            @onSaveChangeView="onSaveChangeView"
            :schema="schema" 
            :config="conf" 
            :dataSet="sample"
            :savedQueries="mySavedQueries"
            :savedViews="myViews"
        />
    </div>
  </div>
</template>

<script>
import h from "../../h"
import tablelfy from "@/components/Utility-Components/table/table"

// missing view
export default {
  props: ['my_pane_index','data'],
  mixins: [h],
  data: () => ({
      contents: undefined,
      sample: [],
        conf: {
            table_isStretch: true,
            table_isNumbered: true,
            table_maxCharPerCell: 10
        },
        appearance: {
            "table.ui.oddBackground": "",
            "table.ui.evenBackground": "",
            "table.ui.borderLess": "",
            "table.ui.centerEverything": true
        },
        mySavedQueries: [],
        myViews: [],
        schema: {
            uid: {
                type: "string"
            },
            firstName: {
                type: "string"
            },
            lastName: {
                type: "string"
            },
            gender: {
                type: "select",
                options: ["M", "F", "Other"]
            },
            age: {
                type: "number"
            },
            height: { 
                type: "string"
            },
            type: {
                type: "number"
            },
            course: {
                type: "string"
            }
        }
  }),
  created() {
    this.mxn = this

            const courses = ['BSIT','BSHM','BSED','E-ENGNR','NURSING','PNTSR']
        const genders = ['M','F','Other']

        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        function uuidv4() {
            return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
                (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
            );
        }

        for (let i = 0; i < 55; i++) {
            this.sample.push(
                {   
                    uid: uuidv4(),
                    fistName: "marven",
                    lastName: "Doque",
                    gender: genders[getRandomInt(0,2)],
                    age: getRandomInt(17,35),
                    height: `${getRandomInt(4,7)}.${getRandomInt(1,7)}`,
                    type: getRandomInt(0,4),
                    course: courses[getRandomInt(0,courses.length - 1)]
                },
                {
                    uid: uuidv4(),
                    fistName:"Jane",
                    lastName: "Doe",
                    gender: genders[getRandomInt(0,2)],
                    age:  getRandomInt(17,35),
                    height: `${getRandomInt(4,7)}.${getRandomInt(1,7)}`,
                    type: "1",
                    course: courses[getRandomInt(0,courses.length - 1)]
                },
                {
                    uid: uuidv4(),
                    fistName: "pearson",
                    lastName: "Donque",
                    gender: genders[getRandomInt(0,2)],
                    age:  getRandomInt(17,35),
                    height: `${getRandomInt(4,7)}.${getRandomInt(1,7)}`,
                    type: getRandomInt(0,4),
                    course: courses[getRandomInt(0,courses.length - 1)]
                },
                {
                    uid: uuidv4(),
                    fistName: "Janny ann",
                    lastName: "Donque",
                    gender: genders[getRandomInt(0,2)],
                    age:  getRandomInt(17,35),
                    height: `${getRandomInt(4,7)}.${getRandomInt(1,7)}`,
                    type:getRandomInt(0,4),
                    course: courses[getRandomInt(0,courses.length - 1)]
                }
            );
        }

        // views
        this.myViews = [
            {
                title: 'title 1',
                view: ['uid','name']
            },
            {
                title: 'title 2',
                view: ['name','gender','age'] 
            }
        ]

        // saved queries
        this.mySavedQueries = [
            {
                "content": [
                    {
                        "fn": "select_filter",
                        "query": "F",
                        "name": "gender",
                        "mode": null
                    },
                    {
                        "fn": "number_filter",
                        "query": "20",
                        "name": "age",
                        "mode": "greater than/eq"
                    }
                ],
                "view": "title 2",
                "queryTitle": "Female students older than 20"
            },
            {
                "content": [
                {
                    "fn": "select_filter",
                    "query": "M",
                    "name": "gender",
                    "mode": null
                },
                {
                    "fn": "number_filter",
                    "query": "20",
                    "name": "age",
                    "mode": "greater than/eq"
                }
                ],
                "view": "none",
                "queryTitle": "All Male Students older than 20"
            }
        ]
  },
  components: {
      'd-table': tablelfy
  },
  watch: {
    data: {
      deep: true,
      handler() {
        try {
          this.contents = this.data.contents[0].contents[this.data['Collection Name']]
                            //    data.contents[0].contents[this.data['Collection Name']]
        } catch(err) {
          this.mxnErrLog({
            msg: 'This collection doesnt have any entries! please add new entry',
            closable: false
          })
        }
      }
    }
  },
  methods: {
      onAddEntry() {},
      onItemDelete() {},
      onSaveQuery() {},
      onCreateView() {},
      onDeleteView() {},
      onDeleteQuery() {},
      onSaveChangeView() {}
  }
};
</script>