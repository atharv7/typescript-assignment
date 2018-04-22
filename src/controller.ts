// src/controller.ts
import {Controller, Get} from 'routing-controllers'

@Controller()
export default class MainController {

    @Get("/games")
    main() {
       return {
         games: 'games go here...'
       }
    }

}