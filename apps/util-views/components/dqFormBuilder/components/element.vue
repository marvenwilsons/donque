<template>
    <div >
        <v-text-field
            outlined
            v-if="elementProperty.fieldtype == 'string'"
            :placeholder="elementProperty.fieldDescription"
            :label="elementProperty.fieldLabel"
            v-model="inputValue"
            :hide-details="elementProperty.fieldDetails == undefined"
            persistent-hint
            :hint="elementProperty.fieldDetails"
        ></v-text-field>
        <v-text-field
            outlined
            v-if="elementProperty.fieldtype == 'number'"
            :placeholder="elementProperty.fieldDescription"
            :label="elementProperty.fieldLabel"
            v-model="inputValue"
            :hide-details="elementProperty.fieldDetails == undefined"
            persistent-hint
            :hint="elementProperty.fieldDetails"
            type="number"
        ></v-text-field>
        <v-slider
            v-if="elementProperty.fieldtype == 'range'"
            v-model="inputValue"
            label="Age"
            hint="Be honest"
            min="1"
            max="100"
            thumb-label
            ></v-slider>
        <v-switch
            class="v-input--reverse v-input--expand"
            v-if="elementProperty.fieldtype == 'switch'"
            v-model="inputValue"
            label="Show username when login"
            persistent-hint
            :hint="elementProperty.fieldDetails"
        >
        </v-switch>
        <v-select
            v-if="elementProperty.fieldtype == 'select'"
            outlined
            :label="elementProperty.fieldLabel"
            :items="dataSet"
            v-model="inputValue"
            persistent-hint
            :hint="elementProperty.fieldDetails"
        >
        </v-select>
    </div>
</template>

<script>
import mxn from '../mixins/element'
export default {
    props: ['elementProperty','appearanceProperties'],
    data: () => ({
        inputValue: undefined,
        dataSet: undefined
    }),
    mounted() {
        this.inputValue = this.elementProperty.defaultValue
        this.dataSet = this.elementProperty.dataSet
    },
    mixins: [mxn],
    methods: {
        hide() {

        },
        show() {

        },
        addClass() {

        },
        removeClass() {

        },
        disable() {

        },
        setBackgroundColor() {

        },
        showLoading() {

        },
        setFieldDesc() {

        },
        setFieldId() {

        }
    }
}
</script>

<style>
.v-input--reverse .v-input__slot {
	 flex-direction: row-reverse;
	 justify-content: flex-end;
}
 .v-application--is-ltr .v-input--reverse .v-input__slot .v-input--selection-controls__input {
	 margin-right: 0;
	 margin-left: 8px;
}
 .v-application--is-rtl .v-input--reverse .v-input__slot .v-input--selection-controls__input {
	 margin-left: 0;
	 margin-right: 8px;
}
 .v-input--expand .v-input__slot .v-label {
	 display: block;
	 flex: 1;
}
 

</style>