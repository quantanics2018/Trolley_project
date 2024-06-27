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
exports.SessionService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const session_schema_1 = require("../schema/session.schema");
const razorpay_1 = __importDefault(require("razorpay"));
const uuid_1 = require("uuid");
let SessionService = class SessionService {
    constructor(sessionModel) {
        this.sessionModel = sessionModel;
    }
    async createRazorpay(request) {
        console.log('hello');
        const razorpayInstance = new razorpay_1.default({
            key_id: 'rzp_test_0MsloSAqW3knPj',
            key_secret: "ePKlU8Hq8PUqSGHAvHNO0iir"
        });
        try {
            const options = {
                amount: request.amount,
                currency: request.currency,
                receipt: `or_${(0, uuid_1.v4)()}`,
                payment_capture: 1
            };
            const order = await razorpayInstance.orders.create(options);
            return { id: order.id, amount: order.amount, currency: order.currency };
        }
        catch (error) {
            console.error('Error creating Razorpay order:', error);
            throw new common_1.ServiceUnavailableException('Error creating Razorpay order');
        }
    }
    async create(createSessionDto) {
        try {
            const sesssion = new this.sessionModel(createSessionDto);
            return sesssion.save();
        }
        catch (error) {
            console.log(error);
            throw new common_1.ServiceUnavailableException(`Unable to create session data : ${error}`);
        }
    }
    async getAllSessionDetails() {
        const allitems = await this.sessionModel.find();
        console.log('allsession', allitems);
        return allitems;
    }
    getSessionDetailsById(id) {
        const returnproduct = this.sessionModel.findById(id);
        return returnproduct;
    }
    editSessionDetailsById(id, newData) {
        const updatedproduct = this.sessionModel.findByIdAndUpdate(id, newData, { new: true });
        return updatedproduct;
    }
    deleteSessionDetailsById(id) {
        return this.sessionModel.findByIdAndDelete(id);
    }
};
exports.SessionService = SessionService;
exports.SessionService = SessionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(session_schema_1.Session.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], SessionService);
//# sourceMappingURL=session.service.js.map