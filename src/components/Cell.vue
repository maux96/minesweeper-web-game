<template>
  <div >
    <div class="cell" v-if="mask == CellMask.Visible" :style="{'background-color': color()}" >
      {{ value }}
    </div>
    <div class="cell hovereable" v-else-if="mask== CellMask.Hidden">
     
    </div>
    <div class="cell hovereable" v-else-if="mask== CellMask.Flag">
      F 
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { CellMask } from '../core';

export default defineComponent({
  name: 'Cell',
  props: {
    value : {type: Number, required: true},
    mask : Number as PropType<CellMask>
  },
  methods:{
    color() : string{
      if (this.value == -1) return `rgb(255,0,0)`;
      let [r,g,b] = [ this.value*Math.floor(254 / 9),255/(9-this.value),255/(9-this.value)]
      return `rgb(${r},${g},${b})`;
    }
  },
  data(){
    return {
      CellMask
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .cell{
  color: whitesmoke;
  background-color: rgb(155, 155, 255, 0.5);
  padding: 5px;
  user-select: none;
  border-radius: 5px;
  min-width: 20px;
  min-height: 20px;
  /* backdrop-filter: blur(20px); */
  }
 .hovereable:hover{
  transform: scale(1.2);
  background-color: rgb(186, 125, 255);
  box-shadow: 0px 0px 10px black;
  z-index: 5;
  transition: all 0.1s;
 }

</style>
