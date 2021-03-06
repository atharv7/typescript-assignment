"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const routing_controllers_1 = require("routing-controllers");
const entity_1 = require("./entity");
let GameController = class GameController {
    async allGames() {
        const games = await entity_1.default.find();
        return { games };
    }
    getGame(id) {
        return entity_1.default.findOne(id);
    }
    async updateGame(id, update) {
        const game = await entity_1.default.findOne(id);
        if (!game)
            throw new routing_controllers_1.NotFoundError('Invalid game ID');
        if (update.color && !(update.color === 'red' ||
            update.color === 'blue' ||
            update.color === 'green' ||
            update.color === 'yellow' ||
            update.color === 'magenta')) {
            throw new routing_controllers_1.BadRequestError('Invalid Color!');
        }
        if (update.board) {
            const boardStringing = JSON.stringify(update.board);
            let bsFilter = boardStringing.replace(/[\[\]']/g, '').replace(/"/g, '');
            const bsArray = bsFilter.split(',');
            const bsArrayRewrap = [
                [bsArray[0], bsArray[1], bsArray[2]],
                [bsArray[3], bsArray[4], bsArray[5]],
                [bsArray[6], bsArray[7], bsArray[8]]
            ];
            update.board = bsArrayRewrap;
            const moves = game.board
                .map((row, y) => row.filter((cell, x) => bsArrayRewrap[y][x] !== cell))
                .reduce((a, b) => a.concat(b))
                .length;
            if (moves > 1) {
                throw new routing_controllers_1.BadRequestError('Invalid Move!');
            }
        }
        return entity_1.default.merge(game, update).save();
    }
    createGame(game) {
        const colors = ['red', 'blue', 'yellow', 'green', 'magenta'];
        const defaultBoard = [
            ['o', 'o', 'o'],
            ['o', 'o', 'o'],
            ['o', 'o', 'o']
        ];
        game.color = colors[Math.floor(Math.random() * colors.length)];
        game.board = defaultBoard;
        return game.save();
    }
};
__decorate([
    routing_controllers_1.Get('/games'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GameController.prototype, "allGames", null);
__decorate([
    routing_controllers_1.Get('/games/:id'),
    __param(0, routing_controllers_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], GameController.prototype, "getGame", null);
__decorate([
    routing_controllers_1.Put('/games/:id'),
    __param(0, routing_controllers_1.Param('id')),
    __param(1, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], GameController.prototype, "updateGame", null);
__decorate([
    routing_controllers_1.Post('/games'),
    routing_controllers_1.HttpCode(201),
    __param(0, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [entity_1.default]),
    __metadata("design:returntype", void 0)
], GameController.prototype, "createGame", null);
GameController = __decorate([
    routing_controllers_1.JsonController()
], GameController);
exports.default = GameController;
//# sourceMappingURL=controller.js.map