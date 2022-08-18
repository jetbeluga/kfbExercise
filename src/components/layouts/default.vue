<template>
  <div class="MainComponent">
    <nuxt />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component({
  components: {},
})
export default class DefaultLayout extends Vue {}
</script>
<style>
.MainComponent {
  display: flex;
  justify-content: center;
  margin-top: 30vh;
}
</style>
