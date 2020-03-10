<template>
  <div>
    <!-- Margin -->
    <section class="padbottom125">
      <div class="marginbottom125">
        <strong class="dq-editor-els-text-color">
          <i>CONTAINER MARGIN</i>
        </strong>
      </div>
      <div class="dq-editor-els-el borderRad4 pad125">
        <conInp :name="'Margin top'" />
        <conInp :name="'Margin bottom'" />
        <conInp :name="'Margin Left'" />
        <conInp :name="'Margin Right'" />
      </div>
    </section>
    <!-- Padding -->
    <section class="margintop125">
      <div class="marginbottom125">
        <strong class="dq-editor-els-text-color">
          <i>CONTAINER PADDING</i>
        </strong>
      </div>
      <div class="dq-editor-els-el borderRad4 pad125">
        <!--  -->
        <conInp :name="'Padding top'" />
        <conInp :name="'Padding bottom'" />
        <conInp :name="'Padding left'" />
        <conInp :name="'Padding right'" />
      </div>
    </section>
    <!-- Class -->
    <section class="margintop125">
      <div class="marginbottom125">
        <strong class="dq-editor-els-text-color">
          <i>CONTAINER CLASS</i>
        </strong>
      </div>
      <div class="dq-editor-els-el borderRad4 pad125">
        <conInp :name="'Classes'" />
      </div>
    </section>
    <!-- id -->
    <section class="margintop125">
      <div class="marginbottom125">
        <strong class="dq-editor-els-text-color">
          <i>CONTAINER ID</i>
        </strong>
      </div>
      <div class="dq-editor-els-el borderRad4 pad125">
        <conInp :name="'Id'" />
      </div>
    </section>
  </div>
</template>

<script>
import conInp from "./con-inps";
export default {
  components: {
    conInp
  }
};
</script>
