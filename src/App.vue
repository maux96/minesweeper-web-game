<template>
<div  style="width: 100%; padding: 5px; color: white; display: flex; flex-direction: row-reverse;">
  <div style="display: flex; padding: 20px; align-items: center; ">
    <div class="nav-item" v-if="game.youLose" style="color: red;"> GameOver!</div>
    <div class="nav-item" v-else-if="game.isGameWin" style="color: greenyellow;"> YouWin! </div>
    <div class="nav-item">SecondsPassed:{{stadistics.seconds}} </div> 
    <div class="nav-item"> Mines: {{game.minesWithNoFlag}}</div>
    <div class="nav-item" style="z-index: 10;">
      <button  @click="isPanelActive=!isPanelActive"> NewGame</button>

      <div v-if="isPanelActive" style="position: absolute; right: 10px; backdrop-filter: blur(10px); background-color: rgba(240, 248, 255, 0.3); padding:20px; border-radius: 5px;">
        <form>
          <p>Create new game:</p>
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
      </div>
    </div> 
    
  </div>
</div>

<div style="display: flex; justify-content: space-between;">

  <div style="width: 1px; "></div>

  <div style="padding: 100px; padding-bottom: 10px; padding-top: 50px;">
    <div class="grid-container" :style="{'grid-template-columns': getColumnsAndRowsForGrid.columns,'grid-template-rows': getColumnsAndRowsForGrid.rows  }">
      <Cell v-for="x,k in game.AllBoard()" :key="k" :value="x[0]" :mask="x[1]" @click="touchCell(k)"  @contextmenu.prevent="setFlag(k)"></Cell>
    </div>
  </div>

  <div style="width: 1px; "></div>

</div>

<div style="padding:50px; padding-top: 5px; color: white;">
  <p>LeftClick or touch: reveal terrain.</p>
  <p>RightClick or holdTouch: set flag.</p>
</div>

<hr style="width: 100%;">
<div style="font-size: smaller;">
<a target="_blank" href="https://icons8.com/icon/117130/naval-mine">Naval Mine</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a><br>
    <a target="_blank" href="https://icons8.com/icon/13802/flag-filled">Flag Filled</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
  </div>
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
      stadistics:{
        seconds:0,
        started:false,
      },
      toogleAllPanel: true,
      isPanelActive: false
    }
  },
  methods:{
    
    touchCell(index : number){
      if(this.game.isGameOver){
        if (this.game.youLose)
          alert("You lose :(");
        else if (this.game.isGameWin)
          alert("you win :D")
        return
      }

      if(!this.stadistics.started){
        this.stadistics.started = true;
        setTimeout(this.timeFunction,1000);
      }


      this.game.touchCell(index);
      if (this.game.youLose)
        this.game.setMinesVisibility();
      if(this.game.isGameOver){
        // parar cronometros...

      }
    },
    setFlag(index :number){
      this.game.touchCell(index, true);
    },
    timeFunction(){
      if(!this.stadistics.started || this.game.isGameOver)
        return; 
      this.stadistics.seconds++;
      setTimeout(this.timeFunction,1000);
    },
    createGame(){
      this.isPanelActive = false;
      this.stadistics = {seconds:0, started:false};
      this.game = new Game(this.newX,this.newY,this.newMines);
    }
  },
  computed:{
    getColumnsAndRowsForGrid() : {columns:string, rows:string, gap:string}{
      let cols=this.game.sizeX;
      let rows=this.game.sizeY;
  
      const size = String((window.visualViewport.width/4)/cols) +"px";
      return {columns:Array(cols).fill(size).join(" "), rows:Array(rows).fill(size).join(" "),gap:size};
    },
  },
  beforeMount(){
    this.createGame();
  },
});
</script>

<style>
.grid-container {
  display: grid;
  text-align: center;

  gap:15px;
  justify-content: center;


}

.nav-item{
  margin-left: 10px;
}

body{
  font-family: Arial, Helvetica, sans-serif;
  background-image: linear-gradient(black, rgb(51, 51, 51));
  min-height: 100vh;
  margin: 0px;
}

</style>
