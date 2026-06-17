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
exports.ContestantsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const contestants_service_1 = require("./contestants.service");
const contestants_dto_1 = require("./dto/contestants.dto");
const decorators_1 = require("../../common/decorators");
const parse_object_id_pipe_1 = require("../../common/pipes/parse-object-id.pipe");
let ContestantsController = class ContestantsController {
    contestantsService;
    constructor(contestantsService) {
        this.contestantsService = contestantsService;
    }
    findAll(query) {
        return this.contestantsService.findAll(query);
    }
    findOne(id) {
        return this.contestantsService.findOne(id);
    }
};
exports.ContestantsController = ContestantsController;
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'List contestants with search, filter, sort, pagination',
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [contestants_dto_1.ContestantQueryDto]),
    __metadata("design:returntype", void 0)
], ContestantsController.prototype, "findAll", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get contestant by ID' }),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ContestantsController.prototype, "findOne", null);
exports.ContestantsController = ContestantsController = __decorate([
    (0, swagger_1.ApiTags)('Contestants'),
    (0, common_1.Controller)('contestants'),
    __metadata("design:paramtypes", [contestants_service_1.ContestantsService])
], ContestantsController);
//# sourceMappingURL=contestants.controller.js.map