import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { Request, Response } from 'express';
export declare class UserController {
    private readonly service;
    constructor(service: UserService);
    index(): Promise<import("./schemas/user.schema").User[]>;
    create(createUserDto: CreateUserDto, req: Request, res: Response): Promise<void>;
    login(loginUserDto: CreateUserDto, req: Request, res: Response): Promise<void>;
    refresh(req: Request, res: Response): Promise<void>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import("./schemas/user.schema").User>;
    delete(id: string): Promise<import("./schemas/user.schema").User>;
}
