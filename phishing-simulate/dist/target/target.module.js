"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TargetModule = void 0;
const common_1 = require("@nestjs/common");
const target_service_1 = require("./target.service");
const target_controller_1 = require("./target.controller");
const mongoose_1 = require("@nestjs/mongoose");
const target_schema_1 = require("./schemas/target.schema");
let TargetModule = class TargetModule {
};
exports.TargetModule = TargetModule;
exports.TargetModule = TargetModule = __decorate([
    (0, common_1.Module)({
        providers: [target_service_1.TargetService],
        controllers: [target_controller_1.TargetController],
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: target_schema_1.Target.name, schema: target_schema_1.TargetSchema }]),
        ],
    })
], TargetModule);
//# sourceMappingURL=target.module.js.map