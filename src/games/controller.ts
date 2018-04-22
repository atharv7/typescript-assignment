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
                return Game.merge(game, update).save()

    }
    
    @Post('/games')
    @HttpCode(201)
    createGame(
    @Body() game: Game
    ) {
        return game.save()
    }
}