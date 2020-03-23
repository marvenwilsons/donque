<template>
    <div>
        <section v-if="!simErr" >
            <div class="marginbottom050" >
                Query Title
            <input v-model="queryTitle" class="fullwidth pad025" type="text">
            </div>
            <div class="marginbottom050">
                Query Description
                <input v-model="queryDesc" class="fullwidth pad025" type="text">
            </div>
            <div v-if="err" class="backgrounderr pad025 marginbottom050" >
                Query title cannot be undefined
            </div>
            <div class="flex flexend" >
                <span class="marginright025" >
                    <button @click="$emit('onCancel')" class="buttonreset pad050 tbdshdw padleft125 padright125" >Cancel</button>
                </span>
                <button @click="onSaveQuery" style="background:#629af4;color:white;" class="buttonreset pad050 padleft125 padright125 tbdshdw" >Save query</button>
            </div>
        </section>
        <section v-if="simErr" >
            <div class="backgrounderr pad050" >
                {{simErr}}
            </div>
            <div class="flex flexend margintop050" >
                <button @click="$emit('onCancel')" class="buttonreset pad050 tbdshdw padleft125 padright125" >Okay</button>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    props: {
        savedQueries: Array,
        filterArray: Array
    },
    data: () => ({
        queryTitle: undefined,
        queryDesc: undefined,
        err: false,
        simErr: false
    }),
    mounted() {
        /** A similar query found in saved queries */
        const savedQueries = {}
        this.savedQueries.map((e,i) => {
            savedQueries[i] = e.content
        })

        // first compare current filter array length to any saved quries 
        // if length match dive into that saved query loop over then
        // if the number of similar query from filter array match the length of saved query
        // then retrun an error: `a similar query logic already saved, query title: ${this.savedQueries[i].queryTitle} `
        // if no proceed on saving

        // 1
        let numOfSimilarItems = 0
        let title = undefined
        Object.keys(savedQueries).map(e => {
            if(savedQueries[e].length == this.filterArray.length) {
                const stringifydSavedQuery = savedQueries[e].map(x => JSON.stringify(x))
                const stringifydFilterArray = this.filterArray.map(x => JSON.stringify(x))
                title = this.savedQueries[e]
                stringifydFilterArray.map((strfydObj) => {
                    if(stringifydSavedQuery.includes(strfydObj)) {
                        numOfSimilarItems++
                    }
                })
            }
        })
        
        if(numOfSimilarItems == this.filterArray.length) {
            this.simErr = `a similar query logic already saved, query title: ${title.queryTitle}`
        }
    },
    methods: {
        onSaveQuery() {
            if(this.queryTitle == undefined || this.queryTitle.trim('') == '' ) {
                this.err = true
                this.queryTitle = undefined
            } else {
                this.err = false
                this.$emit('onSaveQuery', {
                    queryTitle: this.queryTitle,
                    queryDesc: this.queryDesc
                })

                setTimeout(() => {
                    this.$emit('onCancel')
                }, 100);
            }            
        }
    }
}
</script>

<style scoped>
.tbdshdw{
    border-radius: 4px;
}
.tbdshdw:hover {
    -webkit-box-shadow: 0px 10px 10px -10px rgba(112,112,112,1);
    -moz-box-shadow: 0px 10px 10px -10px rgba(112,112,112,1);
    box-shadow: 0px 10px 10px -10px rgba(112,112,112,1);
    transition: 0.3s;
}
</style>