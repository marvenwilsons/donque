@api tabs

<dqTab
    :tabs="['tabName1', 'tabName2']"
    :default="0"
    :options="{
            borderColor: '',
            activeColor: '',
            activeTextColor: ''
        }"
>
    <div slot="slotName-1">
    <div slot="slotName-2">
</dqTab>

## Events
    onTabChange

## Input props          Type        Required
    tabs                array       yes
    default             number      yes
    options             object      optional
    toggleMode
    hideInSingleTab

## Options              Type        Options             Default     Required
    borderColor         string      -                   gray        optional
    activeColor         string      -                   gray        optional
    activeTextColor     string      -                   gray        optional
