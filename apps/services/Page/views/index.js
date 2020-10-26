
module.exports = function(data,client,utils,Templates) {
    if(Array.isArray(data)) {
        return {
            componentConfig: undefined,
            paneConfig: undefined,
            paneOnLoad: undefined,
            onModalData: undefined,
            onEvent: undefined
        }
    } 
    if(!Array.isArray(data) && utils.hasSetOfKeys(['pageName','pageId'], data) ) {
        return {
            componentConfig: undefined,
            paneConfig: undefined,
            paneOnLoad: undefined,
            onModalData: undefined,
            onEvent: undefined
        }
    }  
}