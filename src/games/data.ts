export interface Game {
    id: number,
    name: string,
    color: string,
    board: string[][]
  }
  
  interface GameDatabase {
    [id: number]: Game
  }

const defaultBoard = [['o','o','o'],['o','o','o'],['o','o','o']]
const gamesById: GameDatabase = {
    1: {
        id: 1,
        name: 'first game',
        color: 'green',
        board: defaultBoard
    },
    2: {
        id: 1,
        name: 'second game',
        color: 'blue',
        board: defaultBoard
    },
    3: {
        id: 1,
        name: 'third game',
        color: 'yellow',
        board: defaultBoard
    }
  }
  
  export default gamesById