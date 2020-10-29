<template>
    <div @click="itemClick" style="min-width:300px;" class="relative" >
        <loader v-if="loading == itemName" />
        <el-tooltip  :open-delay="200" transition="el-zoom-in-bottom" style="border: 1px solid white;" class="item" effect="light"   placement="right-start">
                <div style="width:300px;" class="" slot="content" >
                    <div style="align-items: flex-end;" class="flex padleft125 padright125 padtop125" >
                        <div class="flex flexcenter">
                            <v-icon style="color:#389ff4;" medium >
                            {{itemIcon}}
                            </v-icon>
                        </div>
                        <div class="fullwidth marginleft050 fullheight-percent" >
                            <h6 style="color:#333; margin:0; font-weight:300" >
                                <div >
                                    {{itemName}}
                                </div>
                            </h6>
                        </div>
                    </div>
                  <div style="align-items: flex-start" class="margintop125 flex flexwrap padleft125 padright125" >
                    <!-- Available actions -->
                    <button @click="eventClick(e)" v-for="(e, itemEventsIndex) in itemEvents" :key="itemEventsIndex" class="ibtn dq-button" size="medium" >
                        {{e}}
                    </button>
                  </div>
                  <v-divider v-if="additionalContent" style="margin-bottom:0;" class="marginleft125 marginright125" ></v-divider>
                  <div class="padtop125 relative" style="max-height:260px; overflow-y: auto;" >
                      <div class=" fullwidth fullheight-percent">
                          <div v-for="(content, index) in additionalContent" :key="index" >
                            <itemAdditionaContent
                                :warning="warning" 
                                :type="content.type"
                                :title="content.title"
                                :body="content.body"
                                @onEvent="eventHandler"
                            />
                        </div>
                      </div>
                  </div>
                </div>
                <!-- btn -->
                <el-button :autofocus="warning ? true : false" class="fullwidth" >
 
                    <div class="flex spacebetween" >
                        <div class="flex" >
                            <div style="width:20px;" class="" >
                                <v-icon style="color:#389ff4; height:15px; width:15px" dense >
                                    {{itemIcon}}
                                </v-icon>
                            </div>
                            <div class="marginleft050 fullheight-percent" >
                                {{itemName}}
                            </div>
                        </div>
                        <v-icon v-if="warning"  > 
                            mdi-alert-circle
                        </v-icon>
                    </div>
                </el-button>
        </el-tooltip>
    </div>
</template>

<script>
import itemAdditionaContent from './itemAdditionalContent'
import loader from './loader'
export default {
    props: ["itemName", "itemIcon", "itemDescription", "additionalContent", "itemEvents", "warning", "loading"],
    components: {
        itemAdditionaContent,
        loader
    },
    methods: {
        itemClick() {
            this.$emit('onEvent',{
                eventName: 'navClick',
                context: {
                    itemName: this.itemName,
                    itemIcon: this.itemIcon,
                    itemDescription: this.itemDescription,
                    additionalContent: this.additionalContent,
                    itemEvents: this.itemEvents
                }
            })
        },
        eventClick(e) {
            this.$emit('onEvent', {
                eventName: 'onEventClick',
                context: {
                    itemName: this.itemName,
                    clickedOn: e
                }
            })
        },
        eventHandler(e) {
            this.$emit('onEvent', e)
        }
    }
}
</script>

<style>
.ibtn{
    /* margin-right: 0px !important; */
    margin-left: 0px !important;
}
.ibtn:hover{
    text-decoration: underline;
    background: rgba(211, 211, 211, 0.267);
    outline: none;
}
.el-tooltip__popper, .popper__arrow {
  border: 1px solid lightblue !important;
  box-shadow: 0px 0px 67px -18px rgba(34, 34, 34, 0.89);
  padding: 0 !important;
}
</style>