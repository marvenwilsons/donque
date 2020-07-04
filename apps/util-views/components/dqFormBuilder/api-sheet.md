## Main Properties
- schema
- behavior
- appearance
## Events
- onSubmit
## Behavior properties
- fieldRenderingMode
- showSubmitButtonOnComplete
- useGrouping
- collapsableGroup

## Appearance properties
- hostContainerCss
- hostContainerClasses
- fieldElementCss
- fieldElementClasses

## schema property
```html
<template>
    <formBuilder
        :fields="[username_field]"
    >
    </formBuilder>
</template>

<script>
    export default {
        data: () => ({
            username_field: {
                fieldLabel: 'username',
                fieldtype: 'string',
                fieldDescription: 'foo bar',
                fieldId: '',
                onLoad: (element,schema,prevInput,error) => {},
                onInput: (element,schema,prevInput,error) => {}  
            }
        })
    }
</script>
```

## schema property types
- string
- select
- range 
- number
- switch 
- multiselect 
- textarea

## schema property events
- onLoad(element,schema,prevInput,error)

    - element - gives you the element properties, read only     
    - schema - gives you an access of schema methods and properties
    - prevInput - gives you the previous field's value
    - error - a function with a string arg that display's an error to a field

- onInput
    - when the user change the input value



