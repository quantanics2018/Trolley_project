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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSessionDto = exports.PaymentDto = exports.UserDetails = exports.Product = void 0;
const class_validator_1 = require("class-validator");
class Product {
}
exports.Product = Product;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Product.prototype, "product_name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Product.prototype, "product_price", void 0);
class UserDetails {
}
exports.UserDetails = UserDetails;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserDetails.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserDetails.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserDetails.prototype, "phonenumbe", void 0);
class PaymentDto {
}
exports.PaymentDto = PaymentDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PaymentDto.prototype, "amount", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PaymentDto.prototype, "currency", void 0);
class CreateSessionDto {
}
exports.CreateSessionDto = CreateSessionDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSessionDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSessionDto.prototype, "payment_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSessionDto.prototype, "session_id", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", UserDetails)
], CreateSessionDto.prototype, "user", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreateSessionDto.prototype, "products", void 0);
//# sourceMappingURL=session.dto.js.map