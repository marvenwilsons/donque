export default {
  methods: {
    ini1() {
      console.clear()
      const copy = (o, p) => {
        if (o === null) return null;
        var output, v, key;
        output = Array.isArray(o) ? [] : {};
        for (key in o) {
          v = o[key];
          output[key] = typeof v === "object" ? copy(v) : v;
        }

        return output;
      };

      function log(arg) {
        console.log(arg)
      }

      // copy because vue is not letting me mutate the data from the store
      if (this.$store.state.current_page) {
        this.page_data = copy(this.$store.state.current_page)
      }

      let ParentOfListObj = undefined

      /**
       * Recursively scan the page data object for is a list property
       * that is set to Yes
       * 
       * 1.  Scan Object, check the property.attribute isAList
       * 1.a Save object to ParentOfListObj variable
       * 1.b 
       */

      /**
       * 
       * @param {Array} ArrayOfElements 
       * inside the array is always objects
       */
      const ScanForList = (ArrayOfElements) => {
        if (ParentOfListObj) {
          console.log('ParentOFListObj ok', ParentOfListObj)

          ArrayOfElements.map((Elements, ElementIndex) => {
            /**
             * Save object to ParentOfListObj varibale
             */
            if (Elements.properties && Elements.properties.attributes) {
              log('third')
              if (Elements.properties.attributes.isAList == 'Yes') {
                log('fourth')
                console.log(1, 'List is Found Executing Mutation to', ParentOfListObj)
                /**
                 * Found a list case
                 * Operation 1: Set isAList to No
                 */
                Elements.properties.attributes.isAList = 'No'
                /**
                 * Operation 2: 
                 * Get The Requested Collection From Store then
                 * Get The Length then
                 * Copy the same Element and push it to the Parent of the object
                 * as many times as the length of the requested collection
                 */
                const CollectionName = Elements.properties.attributes['collection name']
                const ArrayOfCollections = this.$store.state.app.data.public.collections
                /**
                 * Get All Collections
                 */
                let SelectedCollection = undefined
                ArrayOfCollections.map(Collection => {
                  SelectedCollection = Collection
                })
                /**
                 * Get selected collection and assigned that collection
                 * to the newly created property collectionData
                 */
                console.log('| => Collection Found', Object.keys(SelectedCollection))
                console.log('| => Collection Name', CollectionName)
                console.log('| => ParentOfListObj', ParentOfListObj)
                console.log('| => Elements', Elements)
                ParentOfListObj.els.pop() // delete old is a list element
                SelectedCollection[CollectionName].map(Collection => {
                	Elements.properties.attributes.collectionData = Collection
                  ParentOfListObj.els.push(Elements)
                })
              } else {
                // Problem this does not always execute
                // this should be dynamic
                log('isAList prop not found')
                ParentOfListObj = Elements.els
                ScanForList(Elements.els)
              }
            } else {
              // this should be dynamic
              log('Properties is undef')
              ParentOfListObj = ArrayOfElements
              ScanForList(Elements.els)
            }
          })
        } else {
          log('Start, Assign array to ParentListObj')
          ParentOfListObj = ArrayOfElements
          ScanForList(ParentOfListObj)
        }

      }

      log('Initial')
      ScanForList(this.page_data)

    }
  }
}
