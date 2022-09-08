

enum CellMask {
	Hidden,
	Visible,			
	Flag
}

class Game {

	private _board :number[];
	private _mask : CellMask[];
	private _totalMines : number;
	private _sizeX :number;
	private _sizeY :number;
	private _youLose :boolean;
	private _visibleCells :number;

	constructor(sizeX :number, sizeY :number, totalMines :number){
		this._sizeX = sizeX;
		this._sizeY = sizeY;

		this._board =  Array<number>(sizeX*sizeY).fill(0);
		this._mask =  Array<number>(sizeX*sizeY).fill(0);

		this._totalMines = totalMines;

		this._youLose = false;
		this._visibleCells = 0;
	}

	get isGameWin(){
		return this._visibleCells >= this._sizeX*this.sizeY - this._totalMines
	}
	get isGameOver(){
		return this.isGameWin || this._youLose;
	}
	get youLose(){
		return this._youLose;
	}
	get sizeX(){
		return this._sizeX ;
	}
	get sizeY(){
		return this._sizeY ;
	}
	get totalMines(){
		return this._totalMines;
	}

	AllBoard() :[value :number,maskValue: number][] {
		return this._board.map((x,i)=>[x,this._mask[i]]); //copia :D porq no se hacer generadores XD
		//return this._board
	}

	getCell(x :number, y:number) :number{
		return this._board[y * this.sizeX + x];
	}
	setCell(x :number, y :number, value :number){
		this._board[y * this.sizeX + x] = value;
	}
	incrCell(x :number, y :number){
		this.setCell(x,y, this.getCell(x,y)+1);
	}

	setCellVisibility(x :number, y:number, value :CellMask){
		this._mask[y* this.sizeX + x] = value;
	}
	getCellVisibility(x :number, y:number){
		return this._mask[y* this.sizeX + x];
	}
	getPointFromIndex(index :number) :[x :number,y :number] {
		let x = index%this.sizeX;
		let y = Math.floor(index/this.sizeX);
		return [x,y];
	}

	setMinesVisibility(){
		for(let i :number = 0; i < this._board.length;i++){
			if(this._board[i] == -1){
				this._mask[i] = CellMask.Visible;
			}
		}
	}


	touchCell(index :number) :void {	
		if (this._visibleCells == 0 ){
			this.buildBoard(index);
		}

		switch ( this._mask[index] ) {
			case CellMask.Visible: 
				// nothing...
			break;
			case CellMask.Hidden:
				// release visibility
				let [x , y] = this.getPointFromIndex(index)

				this.setCellVisibility(x,y,CellMask.Visible)
				if (this.getCell(x,y) == -1){
					this._youLose = true;
					return;
				}
				this._visibleCells++;
				this.releaseVisibility(x,y);
			break;
			case CellMask.Flag:
				// set Hidden
			break;
		}
	}		
	private releaseVisibility(x :number, y:number){
		for( let k=0; k < 8; k++ ) {
			let xk = x + Game._dirX[k];
			let yk = y + Game._dirY[k];
			if (this.verifyPos(xk,yk) && this.getCellVisibility(xk,yk) == CellMask.Hidden ){
				if( this.getCell(x,y)==0 || this.getCell(xk,yk)==0 ){
					this.setCellVisibility(xk,yk,CellMask.Visible)
					this._visibleCells++;
				}
				if(this.getCell(xk,yk)==0 )
					this.releaseVisibility(xk,yk)
			}
		}
	}

	private static _dirX :number[] = [1,1,0,-1,-1,-1,0,1];
	private static _dirY :number[] = [0,1,1,1,0,-1,-1,-1];


	private buildBoard(index :number) :void {
		for( let i= 0; i < this.totalMines ;i++){
			let rx = Math.floor(Math.random() * this.sizeX);
			let ry = Math.floor(Math.random() * this.sizeY);
			// si es una mina ya existente o es el primer click del jugador 
			if ( this.getCell(rx,ry) == -1 || index == ry*this._sizeX + rx){
				i--;
				continue;
			}
			this.setCell(rx,ry,-1);
		}

		for( let x=0; x<this.sizeX; x++){
			for( let y=0; y<this.sizeY; y++){
				if (this.getCell(x,y) == -1){
					for( let k=0; k < 8; k++ ) {
						let xk = x + Game._dirX[k];
						let yk = y + Game._dirY[k];
						if (this.verifyPos(xk,yk) && this.getCell(xk,yk)!=-1){
							this.incrCell(xk,yk);
						}
					}			
				}
			}
		}
	}


	private verifyPos(x :number, y :number) :boolean{
		return 	0 <= x && x < this.sizeX &&
				0 <= y && y < this.sizeY
	}
}

export {
	CellMask,
	Game
}