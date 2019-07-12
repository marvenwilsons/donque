// possible struture 1
const sections = {
    'section_name' : {
        div1: {},
        div2: {
            customStyle: {},
            customProps: {},
            classList: {},
            innerText: 'hello world!',
            els: {
                'div2-1': {
                    customStyle: {},
                    customProps: {},
                    classList: {},
                    innerText: '',
                    els: { /** circular */ }
                    }
            }
        },
        span3: {},
        p4: {}
    }
}

// posible structure
const sections = [
    {
        /** gots here */
    }
]

// gots
// customStyle
// customProps
// classList
// innerText
// els
const gots = {
    tag: '', // html tag ex. div, span
    name: '',
    role: '',
    inlineStyle: {},
    customProps: {},
    innerText: {},
    els: { /** gots here */ }
}