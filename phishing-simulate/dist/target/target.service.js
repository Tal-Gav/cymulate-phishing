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
exports.TargetService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const target_schema_1 = require("./schemas/target.schema");
const emailHelper_1 = require("../helpers/emailHelper");
let TargetService = class TargetService {
    constructor(model) {
        this.model = model;
    }
    async findAll() {
        return await this.model.find().exec();
    }
    async findOne(id) {
        return await this.model.findById(id).exec();
    }
    async create(createTargetDto) {
        const newTarget = await new this.model({
            ...createTargetDto,
            createdAt: new Date(),
        }).save();
        await (0, emailHelper_1.sendEmail)({
            to: newTarget.email,
            subject: 'Free Bitcoin!! Get it now!',
            text: 'Click the link below to get free bitcoin!',
            html: `<p>Click the link below to get free bitcoin!</p>
             <p><a href="http://localhost:5173/free-bitcoin/${newTarget.id}">Get Free Bitcoin</a></p>`,
        });
        return newTarget;
    }
    async update(id, updateTargetDto) {
        return await this.model
            .findByIdAndUpdate(id, {
            ...updateTargetDto,
            isClickedUrl: true,
        }, { new: true })
            .exec();
    }
    async delete(id) {
        return await this.model.findByIdAndDelete(id).exec();
    }
};
exports.TargetService = TargetService;
exports.TargetService = TargetService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(target_schema_1.Target.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], TargetService);
//# sourceMappingURL=target.service.js.map