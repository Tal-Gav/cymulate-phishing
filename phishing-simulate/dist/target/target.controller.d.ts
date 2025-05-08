import { CreateTargetDto } from './dto/create-target.dto';
import { UpdateTargetDto } from './dto/update-target.dto';
import { TargetService } from './target.service';
export declare class TargetController {
    private readonly service;
    constructor(service: TargetService);
    index(): Promise<import("./schemas/target.schema").Target[]>;
    find(id: string): Promise<import("./schemas/target.schema").Target>;
    create(createTargetDto: CreateTargetDto): Promise<import("./schemas/target.schema").Target>;
    update(id: string, updateTargetDto: UpdateTargetDto): Promise<import("./schemas/target.schema").Target>;
    delete(id: string): Promise<import("./schemas/target.schema").Target>;
}
