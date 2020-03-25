<template>
    <div class="flex flex1 flexcol fullwidth pad125">
        <!-- Text Content -->
        <div class="padbottom125 fullwidth">
            <saveToStagePane
                :paneTitle="'Text Content'"
                :paneBg="$store.state.theme.global.secondary_bg_color"
                :collapse="true"
                :saveToStage="true"
                :borderColor="$store.state.theme.global.border_color"
                @onSaveToStage="tcm_SaveToStage"
                :background="'white'"
            >
                <div class="pad050">
                    <textarea
                        v-model="text_content_model"
                        style="resize: vertical"
                        name="text_conent"
                        class="pad050 fullwidth"
                        rows="3"
                    ></textarea>
                </div>
            </saveToStagePane>
        </div>
        <!-- Custom Style -->
        <div class="padbottom125">
            <saveToStagePane
                :paneTitle="'Custom Inline Style'"
                :paneBg="$store.state.theme.global.secondary_bg_color"
                :saveToStage="true"
                :collapse="true"
                :borderColor="$store.state.theme.global.border_color"
                :background="'white'"
                @onSaveToStage="stateMonacoChanges"
            >
                <div>
                    <dqTab
                        :tabs="['inline styles', 'editor']"
                        :default="0"
                        :toggleMode="monacoInlineToggleMode"
                        @onTabChange="monacoTabChange"
                        :options="{
                  borderColor: $store.state.theme.global.border_color,
                  activeColor: $store.state.theme.global.secondary_bg_color,
                  activeTextColor: 'inherit',
                }"
                    >
                        <div
                            v-if="inlineStyle ? Object.keys(inlineStyle) != 0 ? true : false : false"
                            class="pad050"
                            slot="inline styles"
                        >
                            <d-objectify
                                :config="{
                        title: null, // string
                        sub_title_description_text: null,
                        data: inlineStyle, // object a schema
                        operation:'r', // rw , r
                        submit_button: null, // string: if supplied the button will appear
                        show_modal: false
                    }"
                                :appearance="objectify_Style"
                            ></d-objectify>
                        </div>
                        <div v-else class="flex flexcenter pad050" slot="inline styles">none</div>
                        <monacoInlineStyle
                            slot="editor"
                            :inlineCode="inlineCode"
                            :data="data"
                            :trigger="monaco_trigger"
                        ></monacoInlineStyle>
                    </dqTab>
                </div>
            </saveToStagePane>
        </div>
        <!-- Global Attribute -->
        <div class="padbottom125">
            <saveToStagePane
                :paneTitle="'Global Attributes'"
                :paneBg="$store.state.theme.global.secondary_bg_color"
                :collapse="true"
                :saveToStage="true"
                :borderColor="$store.state.theme.global.border_color"
                :background="'white'"
                @onSaveToStage="attr_global_saveToStage"
            >
                <div v-if="schema ? schema.global ? true : false : false" class="pad050">
                    <d-objectify
                        @onChange="attr_globalChange"
                        :config="{
                    title: null, // string
                    sub_title_description_text: null,
                    data: schema.global, // object a schema
                    operation:'rw', // rw , r
                    submit_button: null, // string: if supplied the button will appear
                    show_modal: false
                }"
                        :appearance="objectify_Style"
                    ></d-objectify>
                </div>
            </saveToStagePane>
        </div>
        <!-- Native Attribute -->
        <div v-if="schema ? schema.native ? true : false : false" class="padbottom125 fullwidth">
            <saveToStagePane
                :paneTitle="'Native Attributes'"
                :paneBg="$store.state.theme.global.secondary_bg_color"
                :collapse="true"
                :saveToStage="true"
                :borderColor="$store.state.theme.global.border_color"
                :background="'white'"
                @onSaveToStage="attr_native_saveToStage"
            >
                <div class="pad050">
                    <d-objectify
                        @onChange="attr_nativeChange"
                        :config="{
                      title: null, // string
                      sub_title_description_text: null,
                      data: schema.native, // object a schema
                      operation:'rw', // rw , r
                      submit_button: null, // string: if supplied the button will appear
                      show_modal: false
                  }"
                        :appearance="objectify_Style"
                    ></d-objectify>
                </div>
            </saveToStagePane>
        </div>
    </div>
</template>

<script>
// mixins
import text_content_mixin from "./mixins/text_content_mixin";
import custom_style_mixin from "./mixins/custom_style_mixin";
import shared_mixin from "./mixins/shared_data_mixin";
import attr_mixin from "./mixins/attr_mixin";
import schema_mixin from "./mixins/schema_mixin";

// components
import monaco_inlineStyle from "./../monaco_inline";

export default {
    props: ["data", "stageData", "pageName"],
    mixins: [
        shared_mixin,
        text_content_mixin,
        custom_style_mixin,
        attr_mixin,
        schema_mixin
    ],
    data: () => ({
        text_content_model: undefined,
        objectify_Style: undefined,
        schema: {}
    }),
    components: {
        monacoInlineStyle: monaco_inlineStyle
    },
    mounted() {
        // schema value, global attribute default value assignment
        const global_parsedVanilaObj = this.objtifyConverter(
            this.get_Schema(this.data.tag).global,
            this.data.properties.attributes
        );
        this.schema["global"] = global_parsedVanilaObj;

        // schama value native attribute default value assignment
        const native_parsedVanilaObj = this.objtifyConverter(
            this.get_Schema(this.data.tag).native,
            this.data.properties.native_attributes
        );
        this.schema["native"] = native_parsedVanilaObj;

        // style
        this.objectify_Style = {
            title_text_color: "gray",
            sub_title_description_text_color: "gray",

            wrap_around_border_color: this.$store.state.theme.global
                .border_color,
            divider_border_color: this.$store.state.theme.global.border_color,

            keys_bg_color: this.$store.state.theme.global.secondary_bg_color,
            keys_text_color: "black",
            values_bg_color: "white",
            values_text_color: "black",

            select_arrow_down_color: "black",

            button_bg_color: "blue",
            button_text_color: "white",

            background_selected: this.$store.state.theme.global
                .secondary_bg_color,

            modal_overlay_bg: this.$store.state.theme.global.secondary_bg_color
        };
    }
};
</script>