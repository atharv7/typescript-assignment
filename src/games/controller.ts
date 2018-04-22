import { JsonController, Get,Put,Body, Param,Post,HttpCode } from 'routing-controllers'
import gamesById, { Game } from './data'
type GameList = { games: Game[] }


@JsonController()
export default class GameController {

    @Get('/games')
    allGames(): GameList {
        return {games: []}
    }

    @Get('/games/:id')
    getGame(
        @Param('id') id: number
    ): Game {
        return gamesById[id]
    }

    @Put('/games/:id')
    updatePage(
    @Param('id') id: number,
    @Body() body: Partial<Game>
    ): Game { 
        console.log(`Incoming PUT body param:`, body)
    return gamesById[id]
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