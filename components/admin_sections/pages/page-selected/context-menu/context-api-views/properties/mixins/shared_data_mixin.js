export default {
    data: () => ({
        shared: undefined,
        sdm_sharedData_Schema: undefined
    }),
    watch: {
        stageData(current_StageData, prev_StageData) {
            if(prev_StageData) {
                let final = undefined;
                let old = undefined;
                const findObj = (o, id) => {
                if (o === null) return null;

                var output, v, key;
                output = Array.isArray(o) ? [] : {};
                for (key in o) {
                    if (o.uid == id) {
                    final = o;
                    return;
                    }

                    v = o[key];
                    output[key] = typeof v === "object" ? findObj(v, id) : v;
                    }
                };

                if (this.$store.state.pages.temp_id) {
                    findObj(prev_StageData, this.$store.state.pages.temp_id.uid);
                    old = findObj(current_StageData, this.$store.state.pages.temp_id.uid);
                    this.stage_data = final;
    
                    this.csm_hotUpdate(final)
                }
            }
        }
    }
}