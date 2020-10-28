<template>
    <div class="">
        <!-- warning -->
        <div class="marginleft125 marginright125" v-if="warning" >
            <strong>
                <v-icon v-if="warning" x-small > 
                    mdi-alert-circle
                </v-icon> Attention Needed
            </strong>
            <div @click="warningClick" class="margintop050 pointer" >
                <div style="background:orange" >
                    <p class="pad025" style="line-height:20px;" >
                        {{warning}}
                    </p>
                </div>
            </div>
            <v-divider></v-divider>
        </div>
        <!-- type of text -->
        <div class="marginleft125 marginright125" v-if="type == 'text'" >
            <strong>
                {{title}}
            </strong>
            <div class="margintop050" >
                <p style="line-height:20px;" >
                    {{body}}
                </p>
            </div>
            <v-divider></v-divider>
        </div>
        <!-- type of events -->
        <div class="padtop050" v-if="type == 'events'" >
            <strong class="marginleft125 marginright125" >
                {{title}}
            </strong>
            <div class="margintop050" >
                <div class="dq-button sbtnf  fullwidth flex" v-for="(content,index) in body" :key="index" >
                    <div class="flex padtop025 padbottom025 sbtn" style="padding-left:12px;padding-right:12px; color:#389ff4" >
                        {{trimTitle(content.title)}}
                    </div>
                </div>
            </div>
            <v-divider></v-divider>

        </div>
    </div>
</template>

<script>
export default {
    props: ['type', 'title', 'body', 'warning'],
    methods: {
        trimTitle(str) {
            if(str.length > 46){
                return `${str.slice(38)} ..`
            } else {
                return str
            }
        },
        warningClick() {
            this.$emit('onEvent', {
                eventName: 'warningClick',
                context: this.warning
            })
        }
    }
}
</script>

<style>
.sbtn {
    text-decoration: underline;
}
.sbtnf:hover {
    background: rgba(211, 211, 211, 0.267);
}
</style>