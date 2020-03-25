export default {
    data: () => ({
        "table_config": undefined,
        /**
         * defaults
         */
        "table_isStretch": true,
        "table_isNumbered": false,
        "table_maxCharPerCel": 15,
        "table_maxNumOfEntries":15,

        /**
         * appearance
         */
        "table_headerColor":"#19D23CFF",
        "table_headerTextColor":"#342e2e",
        "table_headTitle": "Students Table",

        /**
         * Modal
         */
        "table_modalshow": false,
        "table_modalisFullheight": false,
        "table_modalmessage": undefined,
        "table_modaluitype": "info" // err, info 
    }),
    created() {
        this['table_config'] = this.config
        const conf = this.config
        const suppliedkeys_confs = Object.keys(conf)

        suppliedkeys_confs.map(key => {
            // mutate defaults
            this[key] = conf[key]
        })


        /**
         * strech occupies 100% of the container if true
         * collapse to content width if false
         */
        if(conf['table.isStretch']=== false) {
            document.getElementById('dqtable').style.width = 'initial'
        }

        /**
         * show the index position number of each entry
         */
        if(conf["table.isNumbered"] === true) {
            console.log('is numbered')
        }
    }
}