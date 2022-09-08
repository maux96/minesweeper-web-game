<template>
<div style="position: absolute; right: 0px; top: 20px; padding: 20px; color: white;">
  <div v-if="game.youLose" style="color: red;"> GameOver!</div>
  <div v-else-if="game.isGameWin" style="color: greenyellow;"> YouWin! </div>

  <div>SecondsPassed:{{statics.seconds}}</div>
</div>
<div style="min-height: calc( 100vh - 100px );">
  <div style="display: flex; justify-content: center;">
    <div class="grid-container" :style="{'grid-template-columns': getColumnsForGrid() }">
      <Cell class="grid-item" v-for="x,k in game.AllBoard()" :key="k" :value="x[0]" :mask="x[1]" @click="touchCell(k)"></Cell>
    </div>
  </div>
</div>
<form style="width: 100vw; height: 100px; background: black; display: flex;justify-content: space-around; padding: 20px; color: white; ">
  <div>
    <label for="x">X</label>
    <input type="number" name="x" min="5" max="16" v-model="newX">
  </div>
  <div>
    <label for="y">Y</label>
    <input type="number" name="y" min="5" max="16" v-model="newY">
  </div>
  <div>
    <label for="mines">Mines</label>
    <input type="number" name="mines" min="5" max="16" v-model="newMines">
  </div>
  <div>
    <input type="button" value="new game!" @click="createGame()">
  </div>
</form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Cell from './components/Cell.vue';
import { Game, CellMask } from './core';

export default defineComponent({
  name: 'App',
  components: {
    Cell,
  },
  data(){
    return {
      game: Object() as Game,
      CellMask: CellMask,
      newX:8, 
      newY:8,
      newMines:16,
      statics:{
        seconds:0,
        started:false,
      }
    }
  },
  methods:{
    getColumnsForGrid() :string{
      let cols=this.game.sizeX;
      return Array(cols).fill("auto").join(" ");
    },
    touchCell(index : number){
      if(this.game.isGameOver){
        if (this.game.youLose)
          alert("You lose :(");
        else if (this.game.isGameWin)
          alert("you win :D")
        else alert("I realy don't know what's happening here... the thing is... game over!")
        return
      }

      if(!this.statics.started){
        this.statics.started = true;
        setTimeout(this.timeFunction,1000);
      }


      this.game.touchCell(index);
      if (this.game.youLose)
        this.game.setMinesVisibility();
      if(this.game.isGameOver){
        // parar cronometros...

      }
    },
    timeFunction(){
      if(!this.statics.started || this.game.isGameOver)
        return; 
      this.statics.seconds++;
      setTimeout(this.timeFunction,1000);
    },
    createGame(){
      this.statics = {seconds:0, started:false};
      this.game = new Game(this.newX,this.newY,this.newMines);
    }
  },
  beforeMount(){
    this.createGame();
  },
});
</script>

<style>
.grid-container {
  display: grid;
  gap: 5px;
  text-align: center;
  max-width: 70vw;
  min-width: 400px;
  padding: 40px;  
}
.grid-item{

}

body{
  background-image: linear-gradient(black, rgb(51, 51, 51));
  min-height: 100vh;
  margin: 0px;
}

</style>
