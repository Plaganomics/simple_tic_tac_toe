class Game {
  #cells;

  xDim = 3;
  yDim = 3;

  cellEnum = {
    X: 'X',
    O: 'O',
    EMPTY: 'EMPTY',
  };

  domGameContainer;

  playerDetails;
  currentPlayer;
  turns;
  hasWon;

  constructor() {
    Object.freeze(this.cellEnum);
    this.domGameContainer = document.getElementById('game-container');
    //initialise cells
    this.initCellState();
    this.renderCells();

    //init Player
    this.currentPlayer = 1;
    this.turns = 9;
    this.hasWon = false;
  }

  initCellState() {
    this.#cells = [];
    for (let i = 0; i < this.yDim; i++) {
      //Row Level Loop

      this.#cells.push([]);

      for (let x = 0; x < this.xDim; x++) {
        //Column Level Loop
        this.#cells[i].push(this.cellEnum.EMPTY);
      }
    }
  }

  renderCells() {
    for (let i = 0; i < this.#cells.length; i++) {
      //Row
      let row = document.createElement('div');
      row.setAttribute('class', 'cell-row');

      for (let x = 0; x < this.#cells[i].length; x++) {
        let cell = document.createElement('DIV');
        cell.setAttribute('id', `cell-${i}-${x}`);
        cell.setAttribute('class', 'cell');

        cell.addEventListener('click', (data) => {
          this.handPlayerClick(data);
        });

        row.appendChild(cell);
      }

      this.domGameContainer.appendChild(row);
    }
  }

  handPlayerClick(data) {
    let cellCoordinates = data.target.id.match(/\d+/g);

    if (this.hasWon !== true && this.turns > 0) {
        if (data.target.innerHTML === '') {
            if (this.currentPlayer === 1) {
                data.target.innerHTML = this.cellEnum.X;
                this.#cells[Number(cellCoordinates[0])][Number(cellCoordinates[1])] = this.cellEnum.X;
            } else {
                data.target.innerHTML = this.cellEnum.O;
                this.#cells[Number(cellCoordinates[0])][Number(cellCoordinates[1])] = this.cellEnum.O;
            }
            this.turns--;
            this.handleGameWin();
        } else {
            alert('Cell Played! Choose an empty cell.');
        }
    }

    
  }

  handlePlayerTurn() {
    if (this.currentPlayer === 1) {
      this.currentPlayer = 2;
    } else {
      this.currentPlayer = 1;
    }

    document.getElementById('winning-player-announcement').innerText = `Player ${
      this.currentPlayer === 1 ? 'X' : 'O'
    } turn`;
  }

  handleGameWin() {
    let symbol = this.currentPlayer === 1 ? 'X' : 'O';

    let currentColumnMatches = 0;
    let currentVerticalMatches = 0;
    let currentDiagonalMatches = 0;

    for (let i = 0; i < this.#cells.length; i++) {
      let currentRowMatches = 0;
      currentVerticalMatches = 0;

      if (this.#cells[i][i] === symbol) {
        currentColumnMatches++;
      }

      if (this.#cells[this.#cells.length - 1][i] === symbol) {
        currentDiagonalMatches++;
      }

      for (let x = 0; x < this.#cells[i].length; x++) {
        if (this.#cells[i][x] === symbol) {
          currentRowMatches++;
        }

        if (this.#cells[x][i] === symbol) {
          currentVerticalMatches++;
        }
      }

      if (this.#cells[0][2] === symbol && this.#cells[1][1] === symbol && this.#cells[2][0] === symbol) this.hasWon = true;

      if (
        currentColumnMatches === 3 ||
        currentRowMatches === 3 ||
        currentVerticalMatches === 3 ||
        currentDiagonalMatches === 3
      ) {
        this.hasWon = true;
      }
    }

    if (this.hasWon) {
      document.getElementById('winning-player-announcement').innerText = `Player ${symbol} has Won!`;
    } else if (this.turns < 1) {
      document.getElementById('winning-player-announcement').innerText = `It's a DRAW`;
    } else {
      this.handlePlayerTurn();
    }
  }
}
