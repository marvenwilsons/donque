export default function(data,client,utils,Templates) {
    return {
        expectedSetOfKeys: ['pageName','pageId'],
        // Configuration of the pane
        paneConfig: {
            paneName: 'Pages',
            paneWidth: '550px',
            isClosable: true,
            defaultPaneView: 0,
            paneData: data, // you can make changes here
            events: [], // your custom events
            paneViews:  [],
        },

        // Configuration of selected 
        componentConfig: {
            uniview: {
                flexDirection: 'col',
                itemMargin: '20px'
            },
            events: ['view page', 'sub page', 'delete page', 'rename', 'edit page'],
            displayProp: 'pageName',
            ableToAddItem: true,
            infoDisplay: ['pageName','lastUpdated','updatedBy']
        },
    }
}