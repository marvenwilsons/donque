<template>
    <div class="flex fullheight-percent">
        <div
            class="marginright125 fullheight-percent tbbxopt"
            v-for="e in Object.keys(schema)"
            :key="e"
        >
            <div
                :style="{background: activeFilters.includes(e) ? '#629af4' : '#f1f8ff', color: activeFilters.includes(e) ? 'white' : 'gray'}"
                class="pad025 flex spacebetween"
            >
                <div>
                    <p style="margin:0;font-weight:100;">{{e}}:{{schema[e].type}}</p>
                </div>
                <div>
                    <input v-model="activeFilters" type="checkbox" :value="e" />
                </div>
            </div>
            <div class="pad050">
                <d-string
                    @isCaseSensitive="isCaseSensitive"
                    @onStrMode="onStrMode"
                    @onQuery="onStringQuery"
                    :ref="e"
                    :owner="e"
                    :activeFilters="activeFilters"
                    :filterArray="filterArray"
                    v-if="schema[e].type === 'string'"
                ></d-string>
                <d-select
                    :owner="e"
                    :ref="e"
                    :activeFilters="activeFilters"
                    :filterArray="filterArray"
                    :options="schema[e].options"
                    @onSelection="onSelection"
                    v-if="schema[e].type === 'select'"
                ></d-select>
                <d-number 
                    :ref="e" 
                    :owner="e" 
                    :activeFilters="activeFilters"
                    :filterArray="filterArray"
                    @onNumMode="onNumMode" 
                    @onNumber="onNumber"
                    v-if="schema[e].type === 'number'"></d-number>
            </div>
        </div>
    </div>
</template>

<script>
import string from "./actionPane__uis/string";
import number from "./actionPane__uis/number";
import select from "./actionPane__uis/select";

export default {
    props: {
        schema: Object,
        data: Array
    },
    data: () => ({
        activeFilters: [],
        filterArray: [],
        modesSelected: {},
        filterData: undefined,
        filterErrors: [],
        exePointer: 0,
        logs: []
    }),
    components: {
        "d-string": string,
        "d-number": number,
        "d-select": select
    },
    methods: {
        // ############## system methods
        log(msg){
            this.logs.push(msg)
        },
        startFiltering() {
            this.log('Start')
            if(this.filterArray.length != 0) {
                let pkgErrs = []
                this.log('Checking for null values')
                // check if there are null values
                this.filterArray.map(e => {
                    this.log(`Checking ${e.name}`)
                    if(e.query === null && e.fn === "string_filter") {
                        pkgErrs.push(`${e.name} is active but query is blank, please provide a filter value`)
                    } else {
                        this.log(`No null values found emptying errors array`)
                        this.filterErrors = []
                    }
                })

                if(pkgErrs.length != 0) {
                    this.log('Errors found! displaying filter errors') 
                    this.filterErrors = pkgErrs
                   return
                } else {
                    this.log('Executing filters')

                    this.execFilters(this.data,this.filterArray)
                }
            }
        },
        execFilters(fdata,filterArray) {
            // execute filters
            const udata = filterArray[this.exePointer]
            this[udata.fn]({
                query: udata.query,
                mode: udata.mode,
                data: fdata,
                name: udata.name
            }, (data) => {
                if(typeof data === 'string' ) {
                    this.log('Filter logic error! pushing error')
                    this.filterErrors.push(data)
                    this.log(this.exePointer)
                    this.log(this.filterArray)
                    this.log('DONE...........')
                    this.exePointer = 0
                } else {
                    this.log('Mutating filter data')
                    this.filterData = data
                }
            })
        },
        // ############### select start
        select_filter({query,mode,data, name}, cb) {
            mode
            
            const res = []
            data.map(e => e[name] == query && res.push(e))
            res.length === 0 ? cb(`Error: Zero results: There is no such "${query}" in ${name}`) : cb(res)
        },
        onSelection({selected,owner}) {
            this.filterArray.map((e,i) => e.name === owner && (this.filterArray[i].query = selected))
        },
        // ############### select end
        number_filter({query,mode,data, name}, cb) {
            const res = []
            if(mode == 'greater than') {
                data.map(e => e[name] > query && res.push(e))
            } else if(mode == 'lesser than') {
                data.map(e => e[name] < query && res.push(e))
            } else if(mode == 'eq') {
                data.map(e => e[name] == query && res.push(e))
            } else if(mode == 'lesser than/eq') {
                data.map(e => e[name] <= query && res.push(e))
            } else if (mode == 'greater than/eq'){
                data.map(e => e[name] >= query && res.push(e))
            }

            if(res.length == 0) {
                cb(`Filter logic error: counldnt find an ${name} that is ${mode} ${query}`)
            } else {
                cb(res)
            }
        },
        onNumMode({owner, mode}) {
            this.filterArray.map((o,i) => 
            o.name === owner && 
            (this.filterArray[i].mode = mode))
        },
        onNumber({query,appendTo}) {
            this.filterArray.map((o,i) => o.name === appendTo && (this.filterArray[i].query = query))
        },
        // ############## string start
        string_filter({query,mode,data, name}, cb) {
            const res = []
            if(mode === 'exact match') {
                data.map(e => e[name] === query && res.push(e))
                res.length === 0 ? cb(`Error: Zero results: There is no such "${query}" in ${name}`) : cb(res)
            } else if (mode === 'includes') {
                data.map(e => e[name].includes(query.toUpperCase()) || e[name].includes(query.toLowerCase()) && res.push(e))
                res.length === 0 ? cb(`Error: Zero results: There is no such "${query}" in ${name}`) : cb(res)
            } else if(mode === 'includes/cs') {
                data.map(e => e[name].includes(query) && res.push(e))
                res.length === 0 ? cb(`Error: Zero results: There is no such "${query}" in ${name}`) : cb(res)
            }
        },
        onStrMode({owner, mode}) {
            this.filterArray.map((o,i) => 
            o.name === owner && 
            (this.filterArray[i].mode = mode))
        },
        isCaseSensitive({owner,mode,sm}) {
            mode 
            ?   // if selected mode is includes and is case sensitive
                this.filterArray.map((o,i) => 
                o.name === owner && 
                (this.filterArray[i].mode = "includes/cs"))
            :   // if selected mode is not case sensitive
                this.filterArray.map((o,i) => 
                o.name === owner && 
                (this.filterArray[i].mode = sm))
        },
        onStringQuery({query,appendTo}) {
            // append to query to object to complete ready the function for execution
            this.filterArray.map((o,i) => o.name === appendTo && (this.filterArray[i].query = query))
        },
        // ############ string end
    },
    watch: {
        activeFilters(n) {
            n;
            //
            this.filterArray = [];
            this.modesSelected = {};

            //
            this.activeFilters.map(e => {
                switch (this.schema[e].type) {
                    case "string":
                        this.filterArray.push({
                            fn: 'string_filter',
                            query: this.$refs[e][0].query,
                            name: e,
                            mode: this.$refs[e][0].getMode()
                        });
                        break;
                    case "select":
                        this.filterArray.push({
                            fn: 'select_filter',
                            query: this.$refs[e][0].selected,
                            name: e,
                            mode: null
                        });
                        break;
                    case "number":
                        console.log('')
                        this.filterArray.push({
                            fn: 'number_filter',
                            query: this.$refs[e][0].query,
                            name: e,
                            mode: this.$refs[e][0].currentMode 
                        });
                        break;
                }
            });

        },
        filterData() {
            this.log('filter data change detected')
            /**
             * filter data intial value is undefined
             * when filter data change, it means the first item in the filters array
             * was executed, so to execute the next item in the array, we need to 
             * increment the exePointer value to 1
             */
            this.log(`${this.filterArray.length} != ${this.exePointer} ${this.filterArray.length - 1 != this.exePointer}`)
            if(this.filterArray.length - 1 != this.exePointer) {
                this.log('Incrementing exe pointer')
                this.exePointer ++
            } else {
                this.log(`filter arrray and exe pointer is equal stoping program`)
                this.log(this.exePointer)
                this.log(this.filterArray)
                this.log('DONE...........')
                this.exePointer = 0
            }
        },
        exePointer(pointerValue) {
            /**
             * when the exePointer changes value
             */
            this.log('===== EXE POINTER =====')
            this.log(`exe pointer changed to: ${this.exePointer}`)
            this.log(`${this.filterArray.length} != ${this.exePointer} ${pointerValue != this.filterArray.length -1}`)
            if(pointerValue != this.filterArray.length && this.exePointer != 0) {
                this.log(`Executing filters`)
                this.execFilters(this.filterData, this.filterArray)
            } else {
                // this.exePointer = 0
                this.log('exe pointer stop')
            }
        }
    }
};
</script>

<style scoped>
.tbbxopt {
    width: 270px;
    box-shadow: 7px 7px 14px #e0e0e0, -7px -7px 14px #ffffff;
    border: 1px solid #f4f4f4;
}
</style>