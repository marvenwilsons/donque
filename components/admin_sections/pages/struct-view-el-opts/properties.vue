<template>
  <div class="flex flex1 fullwidth">
    <div class="relative fullwidth fullheight-percent aut">
      <div class="absolute fullwidth flex flexcol pad050">
        <!-- text content -->
        <div
          :style="{border: `1px solid ${$store.state.theme.global.border_color}`}"
          class="marginbottom050"
        >
          <div
            :style="{background:`${$store.state.theme.global.secondary_bg_color}`}"
            class="pad050 spacebetween flex st-viz-bnnr"
          >
           <strong>Text Content</strong>
            <div>
              <i class="fas fa-arrow-circle-up"></i>
              <i class="fas fa-angle-down"></i>
            </div>
          </div>
          <div class="pad050">
            <textarea
            v-model="text_content"
              style="resize: vertical"
              name="text_conent"
              class="pad050 fullwidth"
              rows="3"
            ></textarea>
          </div>
        </div>
        <!-- Spacing -->
        <div
          id="spreketek"
          :style="{border: `1px solid ${$store.state.theme.global.border_color}`}"
          class="marginbottom050"
        >
          <div
            :style="{background:`${$store.state.theme.global.secondary_bg_color}`}"
            class="pad050 spacebetween flex st-viz-bnnr"
          >
            <div>
              <strong>Spacing</strong> -
              <strike>(Margins & Paddings)</strike>
            </div>
            <div>
              <i class="fas fa-arrow-circle-up"></i>
              <i class="fas fa-angle-down"></i>
            </div>
          </div>
          <!-- @page - elements - properties - margins -->
          <div class="pad050">
            <div>
              <div class="pad050">
                <strong>
                  <div>Margins</div>
                </strong>
                <i>
                  <div>(px value and percentage value only)</div>
                </i>
                <div class="pad050 flex  flexwrap">
                  <div class="flex flex1">
                    <div role="margin-input-container" class="flex1">
                      <div role="top-margin-container" class="flex">
                        <div class="pad025 flex1 flexcenter ">
                          <strong>top</strong>
                        </div>
                        <input class="flex1 margin025 pad025" type="text" />
                      </div>
                      <div role="bottom-margin-container" class="flex">
                        <div class="pad025 flex1 flexcenter">
                          <strong>bottom</strong>
                        </div>
                        <input class="flex1 margin025 pad025" type="text" name id />
                      </div>
                    </div>
                  </div>
                  <div class="flex flex1">
                    <div role="margin-input-container" class="flex1">
                      <div role="left-margin-container" class="flex">
                        <div class="pad025 flex flex1">
                          <strong style="display: flex; align-items:center;" class="padleft050">left</strong>
                        </div>
                        <input class="flex1 margin025 pad025" type="text" />
                      </div>
                      <div role="right-margin-container" class="flex">
                        <div class="pad025 flex flex1">
                          <strong
                            style="display: flex; align-items:center;"
                            class="padleft050"
                          >right</strong>
                        </div>
                        <input class="flex1 margin025 pad025" type="text" name id />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- @page - elements - properties - paddings -->
              <div class="pad050">
                <strong>
                  <div>Paddings</div>
                </strong>
                <i>
                  <div>(px value and percentage value only)</div>
                </i>
                <div class="pad050 flex flexwrap">
                  <div class="flex flex1">
                    <div role="padding-input-container" class="flex1">
                      <div role="top-padding-container" class="flex">
                        <div class="pad025 flex1 flexcenter">
                          <strong>top</strong>
                        </div>
                        <input class="flex1 margin025 pad025" type="text" />
                      </div>
                      <div role="bottom-padding-container" class="flex">
                        <div class="pad025 flex1 flexcenter">
                          <strong>bottom</strong>
                        </div>
                        <input class="flex1 margin025 pad025" type="text" name id />
                      </div>
                    </div>
                  </div>
                  <div class="flex flex1">
                    <div role="padding-input-container" class="flex1">
                      <div role="left-padding-container" class="flex">
                        <div class="pad025 flex flex1">
                          <strong style="display: flex; align-items:center;" class="padleft050">left</strong>
                        </div>
                        <input class="flex1 margin025 pad025" type="text" />
                      </div>
                      <div role="right-oadding-container" class="flex">
                        <div class="pad025 flex flex1">
                          <strong
                            style="display: flex; align-items:center;"
                            class="padleft050"
                          >right</strong>
                        </div>
                        <input class="flex1 margin025 pad025" type="text" name id />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Dimensions -->
        <div
          :style="{border: `1px solid ${$store.state.theme.global.border_color}`}"
          class="marginbottom050"
        >
          <div
            :style="{background:`${$store.state.theme.global.secondary_bg_color}`}"
            class="pad050 spacebetween flex st-viz-bnnr"
          >
            <div>
              <strong>Dimensions</strong> -
              <strike>(Height & Width)</strike>
            </div>
            <div>
              <i class="fas fa-arrow-circle-up"></i>
              <i class="fas fa-angle-down"></i>
            </div>
          </div>
          <div class="pad050">
            <div>
              <div class="pad050">
                <strong>
                  <div>Absolute dimensions</div>
                </strong>
                <i>
                  <div>(px value and percentage value only)</div>
                </i>
                <div class="pad025 flex flexwrap">
                  <div class="flex1">
                    <div role="bottom-margin-container" class="flex">
                      <div class="flex1 pad025 flex flexcenter">
                        <strong>width</strong>
                      </div>
                      <input class="flex1 margin025  pad025" type="text" name id />
                    </div>
                  </div>
                  <div class="flex1">
                    <div role="bottom-margin-container" class="flex">
                      <div class="flex1 pad025 flexcenter flex">
                        <strong>height</strong>
                      </div>
                      <input class="flex1 margin025 pad025" type="text" name id />
                    </div>
                  </div>
                </div>
              </div>
              <div class="pad050">
                <strong>
                  <div>Maximum</div>
                </strong>
                <i>
                  <div>(px value and percentage value only)</div>
                </i>
                <div class="pad025 flex flexwrap">
                  <div class="flex1">
                    <div role="bottom-margin-container" class="flex">
                      <div class="flex1 pad025 flex flexcenter">
                        <strong>width</strong>
                      </div>
                      <input class="flex1 margin025 pad025" type="text" name id />
                    </div>
                  </div>
                  <div class="flex1">
                    <div role="bottom-margin-container" class="flex">
                      <div class="flex1 pad025 flexcenter flex">
                        <strong>height</strong>
                      </div>
                      <input class="flex1 margin025 pad025" type="text" name id />
                    </div>
                  </div>
                </div>
              </div>
              <div class="pad050">
                <strong>
                  <div>Minimum</div>
                </strong>
                <i>
                  <div>(px value and percentage value only)</div>
                </i>
                <div class="pad025 flex flexwrap">
                  <div class="flex1">
                    <div role="bottom-margin-container" class="flex">
                      <div class="flex1 pad025 flex flexcenter">
                        <strong>width</strong>
                      </div>
                      <input class="flex1 margin025 pad025" type="text" name id />
                    </div>
                  </div>
                  <div class="flex1">
                    <div role="bottom-margin-container" class="flex">
                      <div class="flex1 pad025 flexcenter flex">
                        <strong>height</strong>
                      </div>
                      <input class="flex1 margin025 pad025" type="text" name id />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Custom Style -->
        <div
          :style="{border: `1px solid ${$store.state.theme.global.border_color}`}"
          class="marginbottom050"
        >
          <div
            :style="{background:`${$store.state.theme.global.secondary_bg_color}`}"
            class="pad050 spacebetween flex st-viz-bnnr"
          >
            <div>
              <strong>Custom Style</strong>
            </div>
            <div>
              <i class="fas fa-arrow-circle-up"></i>
              <i class="fas fa-angle-down"></i>
            </div>
          </div>
          <div class="pad050">
            <textarea
              style="resize: vertical"
              name="custom_Style"
              class="pad050 fullwidth"
              rows="10"
            ></textarea>
          </div>
        </div>
        <!-- Other attributes -->
        <div
          :style="{border: `1px solid ${$store.state.theme.global.border_color}`}"
          class="marginbottom050"
        >
          <div
            :style="{background:`${$store.state.theme.global.secondary_bg_color}`}"
            class="pad050 spacebetween flex st-viz-bnnr"
          >
            <div>
              <strong>Other Attributes</strong>
            </div>
            <i class="fas fa-angle-down"></i>
          </div>
          <div class="pad125">
            <div>
              <div class="padbottom050">
                <strong>
                  <div>Id</div>
                </strong>
                <input type="text" />
              </div>
              <div class="padbottom025">
                <strong>
                  <div>role</div>
                </strong>
                <input type="text" />
              </div>
              <div class="padbottom025">
                <strong>
                  <div>data-attr</div>
                </strong>
                <input type="text" />
              </div>
            </div>
          </div>
        </div>
        <!-- Stat -->
        <div
          :style="{border: `1px solid ${$store.state.theme.global.border_color}`}"
          class="marginbottom050"
        >
          <div
            :style="{background:`${$store.state.theme.global.secondary_bg_color}`}"
            class="pad050 spacebetween flex st-viz-bnnr"
          >
            <div>
              <strong>Stat</strong>
            </div>
            <i class="fas fa-angle-down"></i>
          </div>
          <div class="pad050">sdaf</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    // @note rewire all of the inputs
  data() {
    return {
      // text content
      text_content: 'hello world!',

      // margins model
      margins: {
        top: undefined,
        bottom: undefined,
        left: undefined,
        right: undefined
      },

      // paddings model
      paddings: {
        top: undefined,
        bottom: undefined,
        left: undefined,
        right: undefined
      },

      // Dimensions
      dimensions: {
        width: undefined,
        height: undefined
      }
    };
  }
};
</script>

<style >
</style>
