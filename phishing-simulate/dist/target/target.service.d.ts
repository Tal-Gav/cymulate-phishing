import { Model } from 'mongoose';
import { Target, TargetDocument } from './schemas/target.schema';
import { CreateTargetDto } from './dto/create-target.dto';
import { UpdateTargetDto } from './dto/update-target.dto';
export declare class TargetService {
    private readonly model;
    constructor(model: Model<TargetDocument>);
    findAll(): Promise<Target[]>;
    findOne(id: string): Promise<Target>;
    create(createTargetDto: CreateTargetDto): Promise<Target>;
    update(id: string, updateTargetDto: UpdateTargetDto): Promise<Target>;
    delete(id: string): Promise<Target>;
}
