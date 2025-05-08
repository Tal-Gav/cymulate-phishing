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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("./schemas/user.schema");
const bcrypt = require("bcrypt");
const jwt_1 = require("../utils/jwt");
let UserService = class UserService {
    constructor(model) {
        this.model = model;
    }
    async findAll() {
        return await this.model.find().exec();
    }
    async findOne(id) {
        return await this.model.findById({ _id: id }).exec();
    }
    async create(createUserDto) {
        const existingUser = await this.model.findOne({
            email: createUserDto.email,
        });
        if (existingUser) {
            throw new Error('Email is already in use');
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(createUserDto.password, saltRounds);
        const newUser = await new this.model({
            ...createUserDto,
            password: hashedPassword,
            createdAt: new Date(),
        }).save();
        const user = {
            id: newUser.id.toString(),
            email: newUser.email,
        };
        const refreshToken = (0, jwt_1.generateRefreshToken)(user.id);
        const accessToken = (0, jwt_1.generateAccessToken)(user);
        return { user, accessToken, refreshToken };
    }
    async loginUser(loginUserDto) {
        const existingUser = await this.model.findOne({
            email: loginUserDto.email,
        });
        if (!existingUser) {
            throw new Error('Email is not registered');
        }
        const isPasswordValid = await bcrypt.compare(loginUserDto.password, existingUser.password);
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }
        const user = {
            id: existingUser._id.toString(),
            email: existingUser.email,
        };
        const refreshToken = (0, jwt_1.generateRefreshToken)(user.id.toString());
        const accessToken = (0, jwt_1.generateAccessToken)(user);
        return { user, accessToken, refreshToken };
    }
    async update(id, updateUserDto) {
        return await this.model
            .findByIdAndUpdate(id, {
            ...updateUserDto,
            isClickedUrl: true,
        }, { new: true })
            .exec();
    }
    async delete(id) {
        return await this.model.findByIdAndDelete(id).exec();
    }
    async getNewAccessToken(refreshToken) {
        try {
            if (!refreshToken) {
                throw new Error('No access');
            }
            const { decoded, expired, valid, msg: errorMsg, } = (0, jwt_1.verifyRefreshToken)(refreshToken);
            if (valid && !expired) {
                const userId = decoded.id;
                const userDocument = await this.model.findById(userId);
                if (!userDocument) {
                    throw new Error('User not found');
                }
                const user = {
                    id: userDocument._id,
                    email: userDocument.email,
                };
                const accessToken = (0, jwt_1.generateAccessToken)(user);
                return { accessToken };
            }
            else {
                throw new Error(errorMsg);
            }
        }
        catch (error) {
            console.error('Failed to refresh token', error);
            throw new Error('Failed to refresh token');
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserService);
//# sourceMappingURL=user.service.js.map