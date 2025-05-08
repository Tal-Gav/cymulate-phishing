import { Document } from 'mongoose';
export type TargetDocument = Target & Document;
export declare class Target {
    email: string;
    isClickedUrl: boolean;
}
export declare const TargetSchema: import("mongoose").Schema<Target, import("mongoose").Model<Target, any, any, any, Document<unknown, any, Target, any> & Target & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Target, Document<unknown, {}, import("mongoose").FlatRecord<Target>, {}> & import("mongoose").FlatRecord<Target> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
