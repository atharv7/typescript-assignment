import { JsonController, Get,Put,Body, Param,Post,HttpCode,NotFoundError } from 'routing-controllers'
import Game from './entity'



@JsonController()
export default class GameController {

    @Get('/games')
    async allGames() {
        const games = await Game.find()
        return { games }
    }

    @Get('/games/:id')
        getGame(
        @Param('id') id: number
        ) {
        return Game.findOne(id)
        }

    @Put('/games/:id')
    async updateGame(
        @Param('id') id: number,
        @Body() update: Partial<Game>
    ) {
        const game = await Game.findOne(id)
        if (!game) throw new NotFoundError('Invalid game ID')
        if(update.color && !(update.color==='red'||
            update.color==='blue'||
            update.color==='green'||
            update.color==='yellow'||
            update.color==='magenta')) 
            {   
                return 'Invalid Color!'
            }
        if(update.board){
            const boardStringing = JSON.stringify(update.board)
            let bsFilter = boardStringing.replace(/[\[\]']/g,'').replace(/"/g,'')
            const bsArray = bsFilter.split(',')
            const bsArrayRewrap = [
                [bsArray[0],bsArray[1],bsArray[2]],
                [bsArray[3],bsArray[4],bsArray[5]],
                [bsArray[6],bsArray[7],bsArray[8]]
            ]
            update.board = bsArrayRewrap

            const moves =  game.board
                .map((row, y) => row.filter((cell, x) => bsArrayRewrap[y][x] !== cell))
                .reduce((a, b) => a.concat(b))
                .length
            if(moves>1) {
                return 'Invalid Move!'
            } 
        }
        return Game.merge(game, update).save()

    }
    
    @Post('/games')
    @HttpCode(201)
    createGame(
    @Body() game: Game
    ) { 
        const colors = ['red','blue','yellow','green','magenta']
        const defaultBoard = [
            ['o', 'o', 'o'],
            ['o', 'o', 'o'],
            ['o', 'o', 'o']
        ]
        game.color = colors[Math.floor(Math.random()*colors.length)] 
        game.board = defaultBoard       
        return game.save()
    }
}