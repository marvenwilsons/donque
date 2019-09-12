@api stage-pane

```js
<saveToStagePane
    :paneTitle="'Title'"
    :paneBg="$store.state.theme.global.secondary_bg_color"
    :collapse="true" // shows the collapse button default is false
    :saveToStage="true" // shows the save to stage text default is false 
    :borderColor="$store.state.theme.global.border_color"
    @onSaveToStage="null" >
  
 </saveToStagePane>
```
