<template>
    <main v-if="isReady" id="dtable" class="flex">
        <div v-if="debugIsReady && debug" class="flex1" >
            <debug :data="{
                    log: $refs.actionPane.logs, 
                    filterArray: $refs.actionPane.filterArray,
                    savedQueries: savedQueries,
                    finalData: $refs.actionPane.filterData,
                    Errors: errors,
                    activeFilters: $refs.actionPane.activeFilters,
                }"
             />
        </div>
        <div :style="{height:'inherit', width: debug ? '50%' : '100%'}" class="fullwidth relative flex flexcol">
            <div
                :style="{background:table_headerColor}"
                class="pad125 flex flexcenter marginbottom050"
            >
                <h5
                    class="flex1 flexcenter flex"
                    :style="{margin:0,fontWeight:100,color:table_headerTextColor}"
                >{{table_headTitle}}</h5>
                <div>
                    <button @click="$emit('onAddEntry')" class="tbdshdw buttonreset pad050">
                       <strong style="color:gray;" > &#65291;</strong>
                    </button>
                </div>
            </div>
            <!-- keys -->
            <div class="relative fullwidth flex flexcol flex1 marginbottom050">
                <!-- modal -->
                <my-modal
                    v-if="modal__show"
                    :isLoading="modal__isLoading"
                    :isError="modal__isError"
                    :message="modalMsg"
                    style="z-index: 999"
                ></my-modal>
                <!--  -->
                <section
                    style=" overflow-x:auto;"
                    class="relative fullwidth flex flex1"
                    @scroll="scrollE"
                >
                    <con
                        style="background:white;"
                        class="fullwidth"
                        v-slot="{contentRect: {width}}"
                    >
                        <span id="tableHost" class="absolute flex flexcol fullwidth borderr">
                            <div
                                class="flex tableEntries"
                                v-for="(entry,index) in tableData"
                                :key="`${index}-${entry}`"
                            >
                                <div
                                    :class="['flexcol','tableEachVal','flex',  width > getTableHeadWidth ? 'fullwidth' : '']"
                                >
                                    <!-- head -->
                                    <div
                                        :style="{position: debug ? 'relative' : 'fixed', left: `-${tHeadleft}px`}"
                                        v-if="index === 0"
                                        id="tablehead"
                                        :class="['flex','tbdshdw', width > getTableHeadWidth ? 'fullwidth' : '']"
                                    >
                                        <div
                                            style="min-width:50px;"
                                            class="flex1 pad050"
                                            v-if="config['table_isNumbered']"
                                        >
                                            <h6 style="margin:0;font-weight:100;">#</h6>
                                        </div>
                                        <div
                                            style="min-width:125px;"
                                            class="flex4 pad050 tableEachVal"
                                            v-for="key in getKeys"
                                            :key="key"
                                        >
                                            <h6 style="margin:0;font-weight:100;">{{key}}</h6>
                                        </div>
                                    </div>
                                    <!-- entries -->
                                    <div
                                        v-if="dataSet.length && index === 0"
                                        :style="{height:`${getTableHeadHeight}px`}"
                                        class="margintop025"
                                    ></div>
                                    <div
                                        :id="`tb${index}`"
                                        :class="['flex' ,'fullwidth' ,'tableValCon', selectedRowId == `tb${index}` ? 'wholeSelect' : 'normal']"
                                    >
                                        <div
                                            @click="selectWholeObject(index)"
                                            :class="['flex1' ,'pad050' ,  selectedRowId == `tb${index}` ? 'wholeSelect__index' : 'numa']"
                                            v-if="config['table_isNumbered']"
                                        >{{index + 1}}</div>
                                        <div
                                            @click="selected(val, val_index)"
                                            style="min-width:125px;"
                                            class="flex4 pad050 tableVal"
                                            v-for="(val,val_index) in entry"
                                            :key="`${val}-${val_index}`"
                                        >{{handleChars(val, width - 800)}} </div>
                                    </div>
                                </div>
                            </div>
                        </span>
                    </con>
                </section>
            </div>
            <div
                v-if="cellValue"
                style="background:white;"
                class="pad050 marginbottom025 flex flexwrap padleft125 padright125"
            >{{cellIndex}}: {{cellValue}}</div>

            <div class="relative">
                <div
                    v-if="selectedRow && modal__show"
                    style="z-index:999"
                    class="absolute fullwidth fullheight-percent"
                >
                    <my-modal
                        :isLoading="modal__isLoading"
                        :isError="modal__isError"
                        :message="modalMsg"
                        style="z-index: 999"
                    ></my-modal>
                </div>
                <div
                    id="objectView"
                    style="background:white; overflow: auto"
                    class="flex flexwrap relative"
                    v-if="selectedRow"
                >
                    <div class="absolute fullwidth">
                        <obv 
                            @onItemDelete="onItemDelete" 
                            @onSubmit="onUpdateEntry" 
                            :schema="schema" 
                            :data="selectedRow">
                        </obv>
                    </div>
                </div>
            </div>

            <section class="relative" >
                <div
                    v-if="modal__type2"
                    id="actionPaneModal"
                    class="absolute fullwidth fullheight-percent flex flexcenter" >
                        <div class="pad125 tbdshdw" >
                            <queryModal
                                :savedQueries="savedQueries"
                                :filterArray="filterArray"
                                @onSaveQuery="saveQuery"
                                @onCancel="onModalType2Cancel"
                            />
                        </div>
                </div>
                <tabs                
                    :tabs="['Query', 'Saved Queries', 'Saved Views', 'Create View']"
                    :toggleMode="'showhide'" 
                    :default="0"
                >
                    <!-- Query -->
                    <div class="pad050" slot="Query">
                        <div id="tablefoot" class="margintop025 marginbottom025 relative">
                            <div class="absolute fullheight-percent pad050">
                                <actionPanes ref="actionPane" :data="dataSet" :schema="schema" />
                            </div>
                        </div>
                        <div v-if="errors.length != 0" style="color:red;" class="pad050 backgrounderr" >
                            found {{errors.length}} error(s) in filter logic <br>
                            <span v-for="err in errors" :key="err" >
                                {{err}} <br/>
                            </span>
                        </div>
                        <div style="background:white;" class="flex spacebetween flexcenter" >   
                            <div class="pad050" >
                                found {{tableData.length}} items
                            </div>
                            <div v-if="debugIsReady" class="margin050 flexend flex" >
                                <span v-if="filterArray.length" class="marginright125" >
                                    <button @click="modal__type2 = true" class="buttonreset pad050 tbdshdw" >Save current query</button>
                                </span>
                                <button @click="submitQuery" class="buttonreset pad050 tbdshdw" >Submit query</button>
                            </div>
                        </div>
                    </div>
                    <!-- Ssaved Queries -->
                    <div style="min-height:265px;" class="pad050 flex" slot="Saved Queries">
                        <SavedQueries
                            @onLoadQuery="onLoadQuery" 
                            @onDeleteQuery="onDeleteQuery"
                            @onSaveChangeView="onSaveChangeView"
                            :savedQueries="savedQueries"
                            :savedViews="savedViews"
                         />
                    </div>
                    <!-- Saved Views -->
                    <div style="min-height:265px;" class="pad050 flex" slot="Saved Views">
                        <SavedViews
                            @onDeleteView="onDeleteView"
                            :savedViews="savedViews"
                        />
                    </div>
                    <!-- Create View -->
                    <div style="min-height:265px;" class="pad050 flex" slot="Create View">
                        <CreateView
                            @onCreateView="onCreateView"
                            :schema="schema"
                            :savedViews="savedViews"
                        />
                    </div>
                </tabs>
                
            </section>
        </div>
    </main>
</template>

<script>
import config from "./config";
import con from "./con";
import actionPanes from "./actionPanes";
import obv from "./obv";
import myModal from "./modal/index";
import debug from "./debug"
import tabs from "./tabs/dq-tab"
import SavedQueries from "./saved-queries"
import SavedViews from "./saved-views"
import CreateView from "./create-view"
import queryModal from "./modal/query"

export default {
    mixins: [config],
    props: {
        dataSet: Array,
        config: Object,
        appearance: Object,
        schema: Object,
        savedQueries: Array,
        savedViews: Array
    },
    data: () => ({
        tableData: undefined,
        tHeadleft: 0,
        isReady: true,
        getTableHeadWidth: 30,
        cellValue: undefined,
        cellIndex: undefined,
        selectedRow: undefined,
        selectedRowId: undefined,
        modal__Msg: undefined,
        modal__isError: false,
        modal__isLoading: true,
        modal__show: false,
        modal__type2: false,
        modal__type2_view: undefined,
        errors: [],
        loadedView: undefined,

        debugIsReady: false,
        debug: true
    }),
    computed: {
        getKeys() {
            return Object.keys(this.tableData[0]);
        },
        getTableHeadHeight() {
            const el = document.getElementById("tablehead");
            return el != null ? el.offsetHeight : 30
        },
        filterErr() {
            return this.debugIsReady && this.$refs.actionPane.filterErrors
        },
        filteredData() {
            return this.debugIsReady ? this.$refs.actionPane.filterData : undefined
        },
        filterArray() {
            return this.debugIsReady ? this.$refs.actionPane.filterArray : undefined
        }
    },
    watch: {
        filterErr(newValue) {
            this.errors = newValue
        },
        filteredData() {
            this.tableData = this.filteredData
        }
    },
    components: {
        con,
        actionPanes,
        obv,
        "my-modal": myModal,
        debug,
        tabs,
        SavedQueries,
        queryModal,
        SavedViews,
        CreateView
    },
    methods: {
        onItemDelete() {
            this.$emit('onItemDelete',this.selectedRow)
        },
        onUpdateEntry(value) {
            /**
             * send this data to the database to update the
             * entry record
             */
            // compare if there are changes
            if (JSON.stringify(value.new) === JSON.stringify(value.old)) {
                alert("there is nothing to update at the selected document");
            } else {
                // send to server
                console.log("send to server");
            }
        },
        selected(val, val_index) {
            this.cellValue = val;
            this.cellIndex = val_index;
        },
        selectWholeObject(index) {
            this.cellValue = undefined;
            this.cellIndex = undefined;
            if (this.selectedRowId === `tb${index}`) {
                this.selectedRow = undefined;
                this.selectedRowId = undefined;
            } else {
                this.selectedRow = this.tableData[index];
                this.selectedRowId = `tb${index}`;
            }
        },
        scrollE(e) {
            this.tHeadleft = e.target.scrollLeft;
        },
        handleChars(str, width) {
            if (this.table_maxCharPerCel < str.length) {
                const narr = [];
                if (width > 100) {
                    str.split("").map(e => {
                        if (narr.length !== this.table_maxCharPerCel - 5) {
                            narr.push(e);
                        }
                    });
                } else {
                    str.split("").map(e => {
                        if (narr.length !== this.table_maxCharPerCel - 5) {
                            narr.push(e);
                        }
                    });
                }

                str = `${narr.join("")} ...`;
            }

            return str;
        },
        submitQuery() {
            this.$refs.actionPane.startFiltering()
        },
        saveQuery(val) {
            this.$emit('onSaveQuery', {
                content: this.filterArray,
                view: 'none',
                ...val
            })
        },
        onModalType2Cancel() {
            this.modal__type2 = false
        },
        onCreateView(val) {
            this.$emit('onCreateView', val)
        },
        onDeleteView(val) {
            this.$emit('onDeleteView', val)
        },
        onLoadQuery(val) {
            const activeFilters = []
            val.content.map(e => {
                activeFilters.push(e.name)
            })
            this.$refs.actionPane.activeFilters = activeFilters
            setTimeout(() => {
                this.$refs.actionPane.filterArray = val.content
                setTimeout(() => {
                    this.submitQuery()
                    this.tableData = []
                    this.savedViews.map(e => {
                        if(e.title == val.view) {
                            this.loadedView = e.view
                        }
                    })
                }, 50);
            }, 50);
        },
        onDeleteQuery(val) {
            this.$emit('onDeleteQuery',val)
        },
        onSaveChangeView(val) {
            this.$emit('onSaveChangeView', val)
        }
    },
    created() {
        this.tableData = this.dataSet
    },
    mounted() {
        if (this.dataSet.length != 0) {
            if (this.getTableHeadWidth == 30) {
                this.getTableHeadWidth = document.getElementById("tablehead").offsetWidth;
            }
        }
        setTimeout(() => {
            this.debugIsReady = true
        }, 100);
    }
};
</script>

<style scoped>
table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
}
tr:nth-child(even) {
    background-color: #dddddd44;
}
#actionPaneModal {
    background: rgba(0, 0, 0, 0.267);
    z-index: 999;
}
#actionPaneModal > div {
    background: white;
    width: 350px;
}
#dtable {
    height: 100% !important;
    margin: 0;
    padding: 0;
    background: rgba(211, 211, 211, 0.534);
}
#tablehead {
    background: #f4f4f4;
}
#tablefoot {
    background: white;
    min-height: 200px;
    overflow: auto;
}
#objectView {
    min-height: 320px;
}

.tableEntries:hover {
    cursor: pointer;
}
.tableEachVal:hover {
    background: rgba(211, 211, 211, 0.466);
}
.tableValCon:hover > .numa {
    background: #19d23cff;
}
.tableEachVal:hover > .tableVal {
    border: 2px solid rgba(0, 0, 0, 0.575);
}
.numa {
    min-width: 50px;
    background: white;
}
.tableVal:hover {
    background: rgba(25, 210, 59, 0.644);
}
.tableVal {
    border: 2px solid transparent;
    background: white;
}
.tbdshdw{
    border-radius: 4px;
}
.tbdshdw:hover {
    background: lightgray;
        -webkit-box-shadow: 0px 10px 10px -10px rgba(112,112,112,1);
    -moz-box-shadow: 0px 10px 10px -10px rgba(112,112,112,1);
    box-shadow: 0px 10px 10px -10px rgba(112,112,112,1);
    transition: 0.3s;
}

/* on select class */
.wholeSelect {
    border-top: 2px solid #19d23cff;
    border-bottom: 2px solid #19d23cff;
}
.normal {
    border-bottom: 1px solid lightgray;
}
.wholeSelect__index {
    min-width: 50px;
    background: #19d23cff;
}
</style>