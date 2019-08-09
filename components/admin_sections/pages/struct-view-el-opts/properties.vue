<template>
  <div style="min-width:500px; height:500px;">
    <div class="relative fullheight-percent aut">
      <div class="absolute fullwidth flex flexcol padright050">
        <!-- text content -->
        <div
          :style="{border: `1px solid ${$store.state.theme.global.border_color}`}"
          class="marginbottom050"
        >
          <div
            :style="{background:`${$store.state.theme.global.secondary_bg_color}`}"
            class="pad050 spacebetween flex st-viz-bnnr"
          >
            <small>
              <strong>Text Content</strong>
            </small>
            <div>
              <i class="fas fa-arrow-circle-up"></i>
              <i class="fas fa-angle-down"></i>
            </div>
          </div>
          <div class="pad050">
            <textarea
              style="resize: vertical"
              name="text_conent"
              class="pad050 inp-small"
              cols="63"
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
            <small>
              <strong>Spacing</strong> -
              <strike>(Margins & Paddings)</strike>
            </small>
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
                  <small>Margins</small>
                </strong>
                <i>
                  <small>(px value and percentage value only)</small>
                </i>
                <div class="pad050 flex">
                  <div class="flex flex1">
                    <div role="margin-input-container" class="flex1">
                      <div role="top-margin-container" class="flex">
                        <small class="pad025 flex1 flexcenter">
                          <strong>top</strong>
                        </small>
                        <input class="flex1 margin025 pad025 inp-small" type="text" />
                      </div>
                      <div role="bottom-margin-container" class="flex">
                        <small class="pad025 flex1 flexcenter">
                          <strong>bottom</strong>
                        </small>
                        <input class="flex1 margin025 pad025 inp-small" type="text" name id />
                      </div>
                    </div>
                  </div>
                  <div class="flex flex1">
                    <div role="margin-input-container" class="flex1">
                      <div role="left-margin-container" class="flex">
                        <small class="pad025 flex flex1  ">
                          <strong style="display: flex; align-items:center;" class="padleft050" >left</strong>
                        </small>
                        <input class="flex1 margin025 pad025 inp-small" type="text" />
                      </div>
                      <div role="right-margin-container" class="flex">
                        <small class="pad025 flex flex1  ">
                          <strong style="display: flex; align-items:center;" class="padleft050" >right</strong>
                        </small>
                        <input class="flex1 margin025 pad025 inp-small" type="text" name id />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- @page - elements - properties - paddings -->
              <div class="pad050">
                <strong>
                  <small>Paddings</small>
                </strong>
                <i>
                  <small>(px value and percentage value only)</small>
                </i>
                <div class="pad050 flex">
                  <div class="flex flex1">
                    <div role="padding-input-container" class="flex1">
                      <div role="top-padding-container" class="flex">
                        <small class="pad025 flex1 flexcenter">
                          <strong>top</strong>
                        </small>
                        <input class="flex1 margin025 pad025 inp-small" type="text" />
                      </div>
                      <div role="bottom-padding-container" class="flex">
                        <small class="pad025 flex1 flexcenter">
                          <strong>bottom</strong>
                        </small>
                        <input class="flex1 margin025 pad025 inp-small" type="text" name id />
                      </div>
                    </div>
                  </div>
                  <div class="flex flex1">
                    <div role="padding-input-container" class="flex1">
                      <div role="left-padding-container" class="flex">
                        <small class="pad025 flex flex1  ">
                          <strong style="display: flex; align-items:center;" class="padleft050" >left</strong>
                        </small>
                        <input class="flex1 margin025 pad025 inp-small" type="text" />
                      </div>
                      <div role="right-oadding-container" class="flex">
                        <small class="pad025 flex flex1  ">
                          <strong style="display: flex; align-items:center;" class="padleft050" >right</strong>
                        </small>
                        <input class="flex1 margin025 pad025 inp-small" type="text" name id />
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
            <small>
              <strong>Dimensions</strong> -
              <strike>(Height & Width)</strike>
            </small>
            <div>
              <i class="fas fa-arrow-circle-up"></i>
              <i class="fas fa-angle-down"></i>
            </div>
          </div>
          <div class="pad050">
            <div>
              <div class="pad050">
                <strong>
                  <small>Absolute dimensions</small>
                </strong>
                <i>
                  <small>(px value and percentage value only)</small>
                </i>
                <div class="pad025 flex">
                  <div class="flex1">
                    <div role="bottom-margin-container" class="flex">
                      <small class="flex1 pad025 flex flexcenter">
                        <strong>width</strong>
                      </small>
                      <input class="flex1 margin025 inp-small pad025" type="text" name id />
                    </div>
                  </div>
                  <div class="flex1">
                    <div role="bottom-margin-container" class="flex">
                      <small class="flex1 pad025 flexcenter flex">
                        <strong  >height</strong>
                      </small>
                      <input class="flex1 margin025 inp-small pad025" type="text" name id />
                    </div>
                  </div>
                </div>
              </div>
              <div class="pad050">
                <strong>
                  <small>Maximum</small>
                </strong>
                <i>
                  <small>(px value and percentage value only)</small>
                </i>
                <div class="pad025 flex">
                  <div class="flex1">
                    <div role="bottom-margin-container" class="flex">
                      <small class="flex1 pad025 flex flexcenter">
                        <strong>width</strong>
                      </small>
                      <input class="flex1 margin025 inp-small pad025" type="text" name id />
                    </div>
                  </div>
                  <div class="flex1">
                    <div role="bottom-margin-container" class="flex">
                      <small class="flex1 pad025 flexcenter flex">
                        <strong  >height</strong>
                      </small>
                      <input class="flex1 margin025 inp-small pad025" type="text" name id />
                    </div>
                  </div>
                </div>
              </div>
              <div class="pad050">
                <strong>
                  <small>Minimum</small>
                </strong>
                <i>
                  <small>(px value and percentage value only)</small>
                </i>
                <div class="pad025 flex">
                  <div class="flex1">
                    <div role="bottom-margin-container" class="flex">
                      <small class="flex1 pad025 flex flexcenter">
                        <strong>width</strong>
                      </small>
                      <input class="flex1 margin025 inp-small pad025" type="text" name id />
                    </div>
                  </div>
                  <div class="flex1">
                    <div role="bottom-margin-container" class="flex">
                      <small class="flex1 pad025 flexcenter flex">
                        <strong  >height</strong>
                      </small>
                      <input class="flex1 margin025 inp-small pad025" type="text" name id />
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
            <small>
              <strong>Custom Style</strong>
            </small>
            <i class="fas fa-angle-down"></i>
          </div>
          <div class="pad050">
            <textarea
              style="resize: vertical"
              name="custom_Style"
              class="pad050 inp-small"
              cols="63"
              rows="3"
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
            <small>
              <strong>Other Attributes</strong>
            </small>
            <i class="fas fa-angle-down"></i>
          </div>
          <div class="pad125">
            <div>
              <div class="padbottom050">
                <strong>
                  <small>Id</small>
                </strong>
                <input type="text" />
              </div>
              <div class="padbottom025">
                <strong>
                  <small>role</small>
                </strong>
                <input type="text" />
              </div>
              <div class="padbottom025">
                <strong>
                  <small>data-attr</small>
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
            <small>
              <strong>Stat</strong>
            </small>
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
  data() {
    return {
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
.inp-small {
  font-size: calc(var(--fontSize) * 0.9);
}
</style>
