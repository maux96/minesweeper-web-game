<template>
  <div>
    <div class="cell" v-if="mask == CellMask.Visible" :style="{'background-color': color()}" >
      <span v-if="value==-1"> 
        <img src="../assets/icons8-naval-mine-30.png" alt="" style="width: 100%; height: 100%;"> 
      </span>
      <span v-else>{{ value }}</span>
    </div>
    <div class="cell hovereable" v-else style="position: relative;">
      <transition name="fade" mode="out-in">
        <span v-if="mask== CellMask.Hidden">&ThickSpace;</span>
        <img v-else-if="mask== CellMask.Flag"  src="../assets/icons8-flag-64.png" alt="" style="width: 100%; height: 100%;"> 
      </transition>
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
  background-color: rgb(155, 155, 255, 0.3);
  padding: 5px;
  user-select: none;
  border-radius: 5px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  }
 .hovereable:hover{
  transform: scale(1.2);
  background-color: rgb(186, 125, 255);
  box-shadow: 0px 0px 10px black;
  z-index: 5;
  transition: all 0.1s;
 }

  .fade-enter-from, .fade-leave-to{
	 	opacity: 0; 
    transform: translateY(-100px);
  }
  .fade-enter-to, .fade-leave-from {
	  opacity: 1; 
  }
  .fade-enter-active,.fade-leave-active{
    transition: all 0.2s;
  } 

</style>
