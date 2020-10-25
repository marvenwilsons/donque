<template>
    <section class="fullwidth flex" >
      <v-sheet class="fullheight-percent" >
          <div class="custom-tree-container pad050">
              <div class="block">
                  <p>DQ Systems Services v1</p>
                  <!-- :render-content="renderContent" -->
                  <el-tree
                      :data="data"
                      node-key="id"
                      default-expand-all
                      :expand-on-click-node="false"
                      :render-content="renderContent" 
                      >
                  </el-tree>
              </div>
          </div>
      </v-sheet>
      <section class="pad125 fullwidth" role="content area" >
        {{selectedView}}
      </section>
    </section>
</template>

<script>
  let id = 1000;
  import h from '@/helper'

  export default {
    mixins: [h],
    data() {
      const data = [
          {
              id: 1,
              label: 'Page Services',
              children: [{
                  id: 4,
                  label: 'layouts'
              }]
          }, 
          {
              id: 2,
              label: 'DQ Services',
              children: []
          }, 
        {
          id: 3,
          label: 'Users & Roles',
          children: [{
            id: 7,
            label: 'Level two 3-1'
          }, {
            id: 8,
            label: 'Level two 3-2'
          }]
        },
        {
          id: 4,
          label: 'Roles',
          children: [{
            id: 7,
            label: 'Level two 3-1'
          }, {
            id: 8,
            label: 'Level two 3-2'
          }]
        }
      ];
      return {
        data: JSON.parse(JSON.stringify(data)),
        selectedView: undefined
      }
    },

    methods: {
      append(data) {
        if(data.label == 'DQ Services') {
          console.log('add new service', this.actions.syspane)
          // this.selectedView = 'formBuilder'\
          this.$emit('onEvent', {
            eventName: '',
            context: ''
          })
          
        } else if(data.label == 'Users & roles') {
          console.log('users and roles')
        } else if(data.label == 'Roles') {
          console.log('Roles')
        }

        const newChild = { id: id++, label: 'testtest', children: [] };
        if (!data.children) {
          this.$set(data, 'children', []);
        }
        data.children.push(newChild);
      },

      remove(node, data) {
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.id === data.id);
        children.splice(index, 1);
      },

      renderContent(h, { node, data, store }) {
          if(data.label == 'DQ Services' || data.label == 'Users & Roles' || data.label == 'Roles') {
              return (
                <span class="custom-tree-node">
                    <span>{node.label}</span>
                    <span>
                    <el-button size="mini" type="text" on-click={ () => this.append(data) }>
                        <div class="marginleft125" >
                            New
                        </div>
                    </el-button>
                    </span>
                </span>);
          } else {
              return (
                  <span class="custom-tree-node">
                    <span>{node.label}</span>
                  </span>
              )
          }
        
        }
    },
    created() {
      console.log('fetch users, roles and services')
    }
  };
</script>

<style>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
</style>