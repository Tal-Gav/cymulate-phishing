import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
interface AuthResponse {
    user: {
        id: string;
        email: string;
    };
    accessToken: string;
    refreshToken: string;
}
export declare class UserService {
    private readonly model;
    constructor(model: Model<UserDocument>);
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User>;
    create(createUserDto: CreateUserDto): Promise<AuthResponse>;
    loginUser(loginUserDto: CreateUserDto): Promise<AuthResponse>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<User>;
    delete(id: string): Promise<User>;
    getNewAccessToken(refreshToken: string): Promise<{
        accessToken: string;
    }>;
}
export {};
