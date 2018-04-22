import { JsonController, Get,Put,Body, Param,Post,HttpCode } from 'routing-controllers'
import Game from './entity'
type GameList = { games: Game[] }


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
    updatePage(
    @Param('id') id: number,
    @Body() body: Partial<Game>
    ): Game { 
        console.log(`Incoming PUT body param:`, body)
    return Game.findOne[id]
    }

    @Post('/games')
    @HttpCode(201)
    createGame(
    @Body() body: Game
    ): Game {
    console.log(`Incoming POST body param:`, body)
    return body
}   
}