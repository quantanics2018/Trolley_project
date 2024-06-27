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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionController = void 0;
const common_1 = require("@nestjs/common");
const session_service_1 = require("./session.service");
const mongoose_1 = __importDefault(require("mongoose"));
const session_dto_1 = require("../dto/session.dto");
const uuid_1 = require("uuid");
let SessionController = class SessionController {
    constructor(sessionService) {
        this.sessionService = sessionService;
    }
    async createPayment(request) {
        return this.sessionService.createRazorpay(request);
    }
    async createSession(createSessionDto) {
        console.log((0, uuid_1.v4)());
        const newproduct = await this.sessionService.create(createSessionDto);
        return newproduct;
    }
    async getAllSession() {
        const allSession = this.sessionService.getAllSessionDetails();
        console.log('allsession', allSession);
        return allSession;
    }
    async getSessionById(id) {
        const isValid = mongoose_1.default.Types.ObjectId.isValid(id);
        if (!isValid)
            throw new common_1.HttpException('Invalid Id', 400);
        const getSession = await this.sessionService.getSessionDetailsById(id);
        if (!getSession) {
            throw new common_1.HttpException('session does not exist!', 400);
        }
        else {
            return getSession;
        }
    }
    async editSessionById(id, newData) {
        const isValid = mongoose_1.default.Types.ObjectId.isValid(id);
        if (!isValid)
            throw new common_1.HttpException('Invalid Id', 400);
        const updatedSession = await this.sessionService.editSessionDetailsById(id, newData);
        if (!updatedSession)
            throw new common_1.HttpException('session not found', 404);
        return updatedSession;
    }
    async deleteSession(id) {
        const isValid = mongoose_1.default.Types.ObjectId.isValid(id);
        if (!isValid)
            throw new common_1.HttpException('Invalid Id', 400);
        const deletedSession = await this.sessionService.deleteSessionDetailsById(id);
        if (!deletedSession)
            throw new common_1.HttpException('session not found', 404);
        return deletedSession;
    }
};
exports.SessionController = SessionController;
__decorate([
    (0, common_1.Post)('/create-razorpay-order'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [session_dto_1.PaymentDto]),
    __metadata("design:returntype", Promise)
], SessionController.prototype, "createPayment", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [session_dto_1.CreateSessionDto]),
    __metadata("design:returntype", Promise)
], SessionController.prototype, "createSession", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SessionController.prototype, "getAllSession", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SessionController.prototype, "getSessionById", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, session_dto_1.CreateSessionDto]),
    __metadata("design:returntype", Promise)
], SessionController.prototype, "editSessionById", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SessionController.prototype, "deleteSession", null);
exports.SessionController = SessionController = __decorate([
    (0, common_1.Controller)('session'),
    __metadata("design:paramtypes", [session_service_1.SessionService])
], SessionController);
//# sourceMappingURL=session.controller.js.map