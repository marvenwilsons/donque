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
            <textarea name="text_conent" class="pad050" id cols="55" rows="5"></textarea>
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
                <div class="pad025 flex">
                  <div class="flex flex1">
                    <div role="margin-input-container" class="flex1">
                      <div role="top-margin-container" class="flex">
                        <span class="flex1 pad025">
                          <small>
                            <strong>top</strong>
                          </small>
                        </span>
                        <input class="flex1 margin025" type="text" />
                      </div>
                      <div role="bottom-margin-container" class="flex">
                        <small class="flex1 pad025">
                          <strong>bottom</strong>
                        </small>
                        <input class="flex1 margin025" type="text" name id />
                      </div>
                    </div>
                  </div>
                  <div class="flex flex1">
                    <div role="margin-input-container" class="flex1">
                      <div role="left-margin-container" class="flex">
                        <span class="flex1 pad025">
                          <small>
                            <strong>left</strong>
                          </small>
                        </span>
                        <input class="flex1 margin025" type="text" />
                      </div>
                      <div role="right-margin-container" class="flex">
                        <small class="flex1 pad025">
                          <strong>right</strong>
                        </small>
                        <input class="flex1 margin025" type="text" name id />
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
                <div class="pad025 flex">
                  <div class="flex flex1">
                    <div role="padding-input-container" class="flex1">
                      <div role="top-padding-container" class="flex">
                        <span class="flex1 pad025">
                          <small>
                            <strong>top</strong>
                          </small>
                        </span>
                        <input class="flex1 margin025" type="text" />
                      </div>
                      <div role="bottom-padding-container" class="flex">
                        <small class="flex1 pad025">
                          <strong>bottom</strong>
                        </small>
                        <input class="flex1 margin025" type="text" name id />
                      </div>
                    </div>
                  </div>
                  <div class="flex flex1">
                    <div role="padding-input-container" class="flex1">
                      <div role="left-margin-container" class="flex">
                        <span class="flex1 pad025">
                          <small>
                            <strong>left</strong>
                          </small>
                        </span>
                        <input class="flex1 margin025" type="text" />
                      </div>
                      <div role="right-margin-container" class="flex">
                        <small class="flex1 pad025"><strong>right</strong></small>
                        <input class="flex1 margin025" type="text" name id />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Spacing -->
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
            <i class="fas fa-angle-down"></i>
          </div>
          <div class="pad050">Margins and paddins</div>
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
            <textarea name="custom_Style" class="pad050" id cols="55" rows="10"></textarea>
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
              <small>
                <div class="flex padbottom125">
                  <pre>ID:</pre>
                  <input type="text" />
                </div>
                <div class="flex">
                  <pre>role:</pre>
                  <input type="text" />
                </div>
              </small>
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
export default {};
</script>

<style>
</style>
