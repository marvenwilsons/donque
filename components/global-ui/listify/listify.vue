<template>
  <!-- @listify html -->
  <div
    @click.right.prevent
    :style="{border: `1px solid ${appearance.borderColor}`, color: appearance.textColor, height: appearance.height, width: appearance.width }"
    class="flex fullwidth flexcol relative"
  >
    <div>
      <!-- search bar here -->
      <div
        :style="{background: appearance.searchBarBgColor, color: appearance.searchBarTextColor, ...appearance.searchBarCustomStyle}"
        class="flex pad050 padtop125 flexcol"
        v-if="config.search"
      >
        <!-- :style="{border: `1px solid ${appearance.searchBoxBorderColor}`,borderRadius:'2px'}" -->
        <div class="flex fullwidth flexwrap">
          <!-- search by -->
          <div
            name="search by container"
            class="flex margin025"
            :style="{background:'white',  color:'#2A2F2E', border: `1px solid ${appearance.borderColor}`}"
          >
            <div class="flex flexcenter padleft050 padright050 padtop025 padbottom025">
              <div class="padright050">Search by:</div>
              <span @click="showSelect()" class="pointer">
                <div>
                  <span class="padright025">{{selectedSearchOption}}</span>
                  <i class="fas fa-angle-down padright025"></i>
                </div>
              </span>
            </div>
          </div>
          <!-- sort -->
          <div
            :style="{
              background:'white',
              border: `1px solid ${appearance.borderColor}`
            }"
            class="flex flexcenter margin025 padright050 padleft050"
          >
            <span class="pointer" @click="sortToggle">
              Sort by: {{sortIs}}
              <i class="fas fa-angle-down padleft025 padright025"></i>
            </span>
            <div
              class="absolute"
              :style="{
                top:'55px', 
                width:prop_is_number && sortIs == 'Low - High' || sortIs == 'High - Low' ? '156px' : '85px' 
                && !prop_is_number && sortIs == 'A - Z' || sortIs == 'Z - A'  ? '115px' : '85px' , 
                height:'150px', zIndex:'900', boxShadow:'0px 0px 10px 5px #EEEEEF'}"
              v-if="isShowSort"
            >
              <listify
                @onSelect="sortSelect"
                :inputData="getSort"
                :config="{
                    title: 'sort',
                    isNumbered: false, // detemines if the list show numbered list
                    propDisplay: 'sort', // detemines the display value of each list
                    search: false, // shows the search functionality if true,
                    showModal:false,
                    defaultSelected: sortIs,
                }"
                :appearance="{
                  // dimensions
                  height: '100%', // required 
                  width: '100%', // required

                  // text
                  textColor: appearance.textColor,

                  // border colors
                  borderColor: appearance.borderColor,
                  listBorderColor: appearance.listBorderColor,

                  // backgrounds
                  bodyBg:appearance.bodyBg,
                  searchBarBgColor: appearance.searchBarBgColor,
                  searchBarTextColor: appearance.searchBarTextColor,
                  odds: appearance.odds, // background of odd index item in the list
                  evens: appearance.evens, // background of even index item in the list

                  // hovers
                  hoverTextColor: appearance.hoverTextColor,
                  hoverBgColor: appearance.hoverBgColor,
                  hoverCustomStyle: appearance.hoverCustomStyle,

                  // active
                  activeTextColor: appearance.activeTextColor,
                  activeBgColor: appearance.activeBgColor,
              }"
              ></listify>
            </div>
          </div>
          <!-- filter -->
          <div
            :style="{
              background:'white',
              border: `1px solid ${appearance.borderColor}`
            }"
            v-if="config.showFilter && prop_is_number"
            class="flex flexcenter padtop025 padbottom025 padright050 padleft050 relative margin025"
          >
            <div class="padright050">Filter by:</div>
            <span @click="showFilter()" class="pointer">
              <div class>
                <span class="padright025">{{selectedSearchFilter}}</span>
                <i class="fas fa-angle-down"></i>
              </div>
            </span>
            <div
              v-if="showSearchFilter"
              style="top:35px;width:110px;height:150px;z-index:900;boxShadow:0px 0px 10px 5px #EEEEEF;"
              class="absolute"
            >
              <!-- listify -->
              <listify
                @onSelect="filterSelect"
                :inputData="filters"
                :config="{
                    title: 'filters',
                    isNumbered: false, // detemines if the list show numbered list
                    propDisplay: 'filter', // detemines the display value of each list
                    search: false, // shows the search functionality if true,
                    showModal:false,
                    defaultSelected: selectedSearchFilter,
                }"
                :appearance="{
                  // dimensions
                  height: '100%', // required 
                  width: '100%', // required

                  // text
                  textColor: appearance.textColor,

                  // border colors
                  borderColor: appearance.borderColor,
                  listBorderColor: appearance.listBorderColor,

                  // backgrounds
                  bodyBg:appearance.bodyBg,
                  searchBarBgColor: appearance.searchBarBgColor,
                  searchBarTextColor: appearance.searchBarTextColor,
                  odds: appearance.odds, // background of odd index item in the list
                  evens: appearance.evens, // background of even index item in the list

                  // hovers
                  hoverTextColor: appearance.hoverTextColor,
                  hoverBgColor: appearance.hoverBgColor,
                  hoverCustomStyle: appearance.hoverCustomStyle,

                  // active
                  activeTextColor: appearance.activeTextColor,
                  activeBgColor: appearance.activeBgColor,
              }"
              ></listify>
            </div>
          </div>
          <!-- search input -->
          <div
            :style="{
              border: `1px solid ${appearance.borderColor}`
            }"
            class="flex flex1 margin025"
          >
            <input
              :placeholder="config.searchBarPlaceHolder"
              style="min-width:300px;"
              class="h-input pad050 flex1"
              type="text"
              v-model="searchVal"
            />
          </div>
          <div
            @click="addItem"
            :style="{borderRadius:'2px',background:'white', width: '30px', border: `1px solid ${appearance.borderColor}`, fontWeight:'100'}"
            class="flex flexcenter pad050 pointer margin025"
          >
            <i class="fas fa-plus"></i>
          </div>
        </div>
        <!--  -->
        <div class="flex flexend margintop050">
          <span
            :style="{borderRadius:'3px',color:appearance.textColor}"
            class="padleft050 padright050"
          >{{searchByResult.length ? searchByResult.length : inputData.length}} {{config.title}}</span>
        </div>
        <!-- listify  -->
        <div
          v-if="showSearchBySelect"
          style="top:55px;width:150px;height:150px;z-index:500;boxShadow:0px 0px 10px 5px #EEEEEF;"
          class="absolute flex"
        >
          <listify
            @onSelect="propSelect"
            :inputData="prop_names"
            :config="{
                title: 'pages',
                isNumbered: false, // detemines if the list show numbered list
                propDisplay: 'prop', // detemines the display value of each list
                showModal:false,
                defaultSelected: selectedSearchOption
            }"
            :appearance="{
              // dimensions
              height: '100%', // required 
              width: '100%', // required

              // text
              textColor: appearance.textColor,

              // border colors
              borderColor: appearance.borderColor,
              listBorderColor: appearance.listBorderColor,

              // backgrounds
              bodyBg:appearance.bodyBg,
              searchBarBgColor: appearance.searchBarBgColor,
              searchBarTextColor: appearance.searchBarTextColor,
              odds: appearance.odds, // background of odd index item in the list
              evens: appearance.evens, // background of even index item in the list

              // hovers
              hoverTextColor: appearance.hoverTextColor,
              hoverBgColor: appearance.hoverBgColor,
              hoverCustomStyle: appearance.hoverCustomStyle,

              // active
              activeTextColor: appearance.activeTextColor,
              activeBgColor: appearance.activeBgColor,
          }"
          ></listify>
        </div>
      </div>
    </div>
    <div>
      <!-- top -->
      <slot name="top"></slot>
    </div>
    <div>
      <!-- render here -->
    </div>
    <div v-if="err">
      <div class="backgrounderr">
        <strong class="err">ERROR: {{errmsg}}</strong>
      </div>
    </div>
    <div class="relative fullheight-percent" v-if="!err">
      <!-- render -->
      <div
        style="z-index:1;"
        class="absolute flex flexcenter err background fullwidth fullheight-percent"
        v-if="searchNoMatch"
      >
        <span class="backgrounderr pad025 padleft050 padright050">
          <h6 style="opacity:0.5;" class="err padleft125 padright125">No Match Found</h6>
        </span>
      </div>
      <div
        v-if="modalFinalState"
        style="z-index:1;"
        class="absolute fullwidth fullheight-percent flex relative"
      >
        <div
          :style="{background:`${appearance.modalBgOverlay}`,opacity:'0.5', zIndex:'-100'}"
          class="absolute fullwidth fullheight-percent"
        ></div>
        <!-- modal here -->
        <div
          id="dq-listify-modal"
          style="height:50%;opacity: 0;"
          class="fullwidth fullheight-percent flex flexcenter relative"
        >
          <slot name="modal"></slot>
        </div>
      </div>
      <div
        :style="{overflow: 'auto',background:appearance.bodyBg}"
        class="fullwidth relative fullheight-percent"
      >
        <!-- list here -->
        <div
          v-show="!searchNoMatch"
          :class="['absolute' ,'fullwidth' ,appearance.listContainerPadding ? 'pad125' : '']"
        >
          <div
            class="pad025 pointer"
            v-for="(items,item_index) in searchByResult.length ? searchByResult : inputData"
            :key="`dq-listify-${item_index}`"
            :style="{
                background: isOdd(item_index) ? appearance.odds : appearance.evens,
                ...setHoverStyle(items[config.propDisplay],item_index), 
                ...activeStyle(items[config.propDisplay]),
                borderBottom: `1px solid ${appearance.listBorderColor}`
                }"
            @mouseover="hover = items[config.propDisplay], onHover(items)"
            @mouseleave="hover = undefined"
            @click="
              config.contextStyle == 'showOnCLickExpand' && setActive(items[config.propDisplay]), 
              hover = undefined,
              config.contextStyle == 'showOnCLickExpand' && showOnCLickExpand_animate(`${items[config.propDisplay]}`),
              select(items[config.propDisplay],true)"
          >
            <!-- list config -->
            <div v-if="config" class="flex pad025 fullwidth flexcol">
              <div class="flex fullwidth flex1">
                <div
                  v-if="config ? config.isNumbered : true"
                  :class="['padright025', appearance.listPadding == 's' && '', appearance.listPadding == 'm' && 'pad025', appearance.listPadding == 'l' && 'pad050']"
                >{{item_index + 1}}</div>
                <div
                  :class="['padright025', appearance.listPadding == 's' && '', appearance.listPadding == 'm' && 'pad025', appearance.listPadding == 'l' && 'pad050']"
                >
                  <slot name="item-icon"></slot>
                </div>
                <div
                  :class="['flex' ,'spacebetween', 'fullwidth', 'padright125', appearance.listPadding == 's' && '', appearance.listPadding == 'm' && 'pad025', appearance.listPadding == 'l' && 'pad050']"
                >
                  <div>{{items[config.propDisplay] ? items[config.propDisplay] : dispErr(`config propDisplay ${config.propDisplay} does not exist`)}}</div>
                  <div v-if="config.contextStyle == 'showOnCLickExpand'">
                    <i v-if="active != items[config.propDisplay]" class="fas fa-angle-down"></i>
                    <i v-if="active == items[config.propDisplay]" class="fas fa-angle-left"></i>
                  </div>
                </div>
              </div>
              <!-- context actions if showOnCLickExpand -->
              <div
                :id="`${items[config.propDisplay]}`"
                v-if="config.contextStyle == 'showOnCLickExpand' && context_state === items[config.propDisplay]"
                style="opacity: 0;"
                class="flex flex1 flexend marginleft125 marginright125"
              >
                <div
                  @mouseover="context_hover = true"
                  @mouseleave="context_hover = false"
                  class="marginleft125 showOnCLickExpand_items"
                  v-for="context_actions in config.contextActions"
                  :key="`context-key-${context_actions}`"
                  @click="contextAction(context_actions,items)"
                  :style="{textDecoration: context_actions == selected_action && context_state == items[config.propDisplay] ? 'underline' : 'none'}"
                >{{context_actions}}</div>
              </div>
              <!-- context if showOnTheSide -->
              <div v-if="config.contextStyle == 'showOnTheSide'">
                <div class="flex flex1 flexend marginleft125 marginright125">
                  <div
                    @mouseover="context_hover = true"
                    @mouseleave="context_hover = false"
                    v-for="(context_actions) in config.contextActions"
                    :key="`context-key-${context_actions}`"
                    class="marginleft125"
                    @click="contextAction(context_actions,items), context_state = items[config.propDisplay], setActive(items[config.propDisplay])"
                    :style="{textDecoration: context_actions == selected_action && context_state == items[config.propDisplay] ? 'underline' : 'none'}"
                  >{{config.dynamiContextActionTitles ? getDynamicContextTitle(context_actions,item_index) : context_actions}}</div>
                </div>
              </div>
            </div>
            <!-- config -->
            <div v-if="!config">
              <div class="backgrounderr">
                <span class="err">Cannot dipsplay list without configuration object</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <!-- bottom -->
      <slot name="bottom"></slot>
    </div>
  </div>
</template>

<script>
// @listify JS
import { TweenMax, TimelineLite, TweenLite } from "gsap";

function globalSort(
  searchByResult,
  selectedSearchOption,
  inputData,
  mode,
  type
) {
  const items = searchByResult.length ? searchByResult : inputData;
  // sort by name
  items.sort((a, b) => {
    var i1 = undefined;
    var i2 = undefined;

    if (type === "string") {
      i1 = a[selectedSearchOption].toUpperCase();
      i2 = b[selectedSearchOption].toUpperCase();
    } else if (type === "number") {
      i1 = a[selectedSearchOption];
      i2 = b[selectedSearchOption];
    }

    if (mode === "asc") {
      if (i1 < i2) {
        return -1;
      }
      if (i1 > i2) {
        return 1;
      }
    } else if (mode === "dec") {
      if (i1 > i2) {
        return -1;
      }
      if (i1 < i2) {
        return 1;
      }
    }

    // names must be equal
    return 0;
  });
}

export default {
  name: "listify",
  props: {
    inputData: Array,
    config: Object,
    appearance: Object
  },
  data: () => ({
    err: false,
    errmsg: undefined,
    modalFinalState: undefined,

    hover: undefined,
    active: undefined,

    searchVal: undefined,
    searchByResult: [],

    context_state: undefined,
    context_action: undefined,
    context_hover: false,
    selected_action: undefined,

    isShowSort: false,
    sortIs: undefined,

    showSearchBySelect: false,
    showSearchFilter: false,
    selectedSearchOption: undefined,
    selectedSearchFilter: undefined,
    filters: [
      {
        filter: "==" // equal to
      },
      {
        filter: ">" // greter than
      },
      {
        filter: "<" // less than
      }
    ]
  }),
  watch: {
    selectedSearchOption() {
      this.sortIs = undefined;
    },
    searchVal(current, prev) {
      let final = [];
      if (this.prop_is_number) {
        // get filter
        switch (this.selectedSearchFilter) {
          case "==":
            this.inputData.map(e => {
              if (e[this.selectedSearchOption] == current) {
                final.push(e);
              }
            });
            break;
          case "<":
            this.inputData.map(e => {
              if (e[this.selectedSearchOption] < current) {
                final.push(e);
              }
            });
            break;
          case ">":
            this.inputData.map(e => {
              if (e[this.selectedSearchOption] > current) {
                final.push(e);
              }
            });
            break;
        }
      } else {
        // its a string
        // deafult filter to equality
        this.inputData.map(e => {
          if (e[this.selectedSearchOption].indexOf(current) == 0) {
            final.push(e);
          }
        });
      }
      this.searchByResult = final;
    },
    sortIs(current, prev) {
      let final = undefined;
      if (current) {
        switch (current) {
          case "A - Z":
            globalSort(
              this.searchByResult,
              this.selectedSearchOption,
              this.inputData,
              "asc",
              "string"
            );
            break;
          case "Z - A":
            globalSort(
              this.searchByResult,
              this.selectedSearchOption,
              this.inputData,
              "dec",
              "string"
            );
            break;
          case "High - Low":
            globalSort(
              this.searchByResult,
              this.selectedSearchOption,
              this.inputData,
              "asc",
              "number"
            );
            break;
          case "Low - High":
            globalSort(
              this.searchByResult,
              this.selectedSearchOption,
              this.inputData,
              "dec",
              "number"
            );
            break;
        }
      }
    },
    modalState(current, prev) {
      if (current) {
        this.modalFinalState = true;
        setTimeout(() => {
          const el = document.getElementById("dq-listify-modal");
          TweenMax.fromTo(
            el,
            0.5,
            { opacity: 0, marginTop: "20px" },
            { opacity: 1, marginTop: "0px" }
          );
        }, 0);
      } else {
        setTimeout(() => {
          const el = document.getElementById("dq-listify-modal");
          TweenMax.fromTo(
            el,
            0.3,
            { opacity: 1, marginTop: "0px" },
            { opacity: 0, marginTop: "20px" }
          );
        }, 0);

        setTimeout(() => {
          this.modalFinalState = false;
        }, 350);
      }
    }
  },
  computed: {
    input_data_keys() {
      return Object.keys(this.inputData[0]);
    },
    prop_names() {
      let prop_names = [];
      let search_by_options = [];

      this.inputData.map(obj => {
        Object.keys(obj).map(names => {
          if (!prop_names.includes(names)) {
            prop_names.push(names);
          }
        });
      });

      prop_names.map(prop_names => {
        search_by_options.push({
          prop: prop_names
        });
      });

      return search_by_options;
    },
    prop_is_number() {
      return typeof this.inputData[0][this.selectedSearchOption] == "number";
    },
    searchNoMatch() {
      let hasNoMatch = false;

      if (this.searchVal && this.searchByResult.length === 0) {
        hasNoMatch = true;
      } else {
        hasNoMatch = false;
      }

      return hasNoMatch;
    },
    getSort() {
      if (this.prop_is_number) {
        return [
          {
            sort: "High - Low"
          },
          {
            sort: "Low - High"
          }
        ];
      } else {
        return [
          {
            sort: "A - Z"
          },
          {
            sort: "Z - A"
          }
        ];
      }
    },
    modalState() {
      return this.config.showModal;
    }
  },
  methods: {
    getDynamicContextTitle(text, index) {
      const d = text.split("|");
      if (d.length === 1) {
        return "Divider required";
      } else {
        const dynamicText = d[1].split(",")[index];
        if (text.split("|")[1] == "false") {
          return text.split("|")[0];
        } else {
          return `${text.split("|")[0]} ${dynamicText}`;
        }
      }
    },
    dispErr(msg) {
      this.err = true;
      this.errmsg = msg;
    },
    select(val, mode) {
      this.$emit("onSelect", val);
      if (
        this.config.contextStyle == "showOnCLickExpand" &&
        this.context_hover == false
      ) {
        if (this.context_state === val) {
          this.context_state = undefined;
          this.context_action = undefined;
          this.selected_action = undefined;
        } else {
          this.context_action = undefined;
          this.context_state = val;
        }
      }
    },
    onHover(val) {
      this.$emit("onActiveHover", val);
    },
    isOdd(num) {
      return num % 2;
    },
    //
    contextAction(actionName, entity) {
      this.context_action = actionName;
      this.selected_action = actionName;
      if (this.config.dynamiContextActionTitles) {
        this.$emit("onContextAction", {
          actionName: actionName.split("|")[0].trim(),
          actionCastOn: entity
        });
      } else {
        this.$emit("onContextAction", {
          actionName,
          actionCastOn: entity
        });
      }
    },
    addItem() {
      this.$emit("onAddItem");
    },
    //
    showOnCLickExpand_animate(id) {
      setTimeout(() => {
        const n = document.getElementById(id);
        if (n) {
          if (!this.context_action) {
            TweenMax.fromTo(n, 0.2, { opacity: 0 }, { opacity: 1 });
          } else {
            n.style.opacity = 1;
          }
        }
      }, 0);
    },
    // set the clicked item id
    setActive(id, mode) {
      if (this.active === id) {
        if (this.context_hover == false) {
          this.active = undefined;
        }
      } else {
        this.active = id;
      }
    },
    // provides dynamic style to items
    activeStyle(id) {
      if (id) {
        if (this.active === id) {
          const custom = this.appearance.acitveCustomStyle;

          return {
            ...custom,
            background:
              this.acitve === id
                ? this.appearance.activeBgColor
                : this.appearance.hoverBgColor,
            transition: "0.3s",
            color:
              this.acitve === id
                ? this.appearance.activeTextColor
                : this.appearance.hoverTextColor
          };
        }
      }
    },
    // set hover style
    setHoverStyle(id, index) {
      if (id === this.hover || this.acitve === id) {
        let customStyle = this.appearance.hoverCustomStylefined;

        return {
          ...customStyle,
          background:
            this.acitve === id
              ? this.appearance.activeBgColor
              : this.appearance.hoverBgColor,
          transition: "0.3s",
          color:
            this.acitve === id
              ? this.appearance.activeTextColor
              : this.appearance.hoverTextColor
        };
      }
    },
    //
    showSelect() {
      this.showSearchBySelect = !this.showSearchBySelect;

      if (this.showSearchBySelect || this.isShowSort) {
        this.showSearchFilter = false;
        this.isShowSort = false;
      }
    },
    //
    showFilter() {
      this.showSearchFilter = !this.showSearchFilter;

      if (this.showSearchFilter || this.isShowSort) {
        this.showSearchBySelect = false;
        this.isShowSort = false;
      }
    },
    sortToggle() {
      this.isShowSort = !this.isShowSort;

      if (this.showSearchFilter || this.showSearchBySelect) {
        this.showSearchBySelect = false;
        this.showSearchFilter = false;
      }
    },
    sortSelect(val) {
      this.sortIs = val;
      this.isShowSort = false;
    },
    propSelect(val) {
      this.isShowSort = false;
      this.showSearchBySelect = false;
      this.selectedSearchOption = val;
    },
    filterSelect(val) {
      this.showSearchFilter = false;
      this.selectedSearchFilter = val;
    }
  },
  mounted() {
    this.selectedSearchOption = this.config.propDisplay;
    this.selectedSearchFilter = "==";
    // set default selected
    this.active = this.config.defaultSelected;
  }
};
</script>

<style>
.showOnCLickExpand_items {
  font-weight: 100;
}
.showOnCLickExpand_items:hover {
  transition: 0.3s;
  text-decoration: underline;
}
</style>

