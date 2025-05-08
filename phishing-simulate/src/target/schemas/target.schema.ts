import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TargetDocument = Target & Document;

@Schema({ timestamps: true }) // Enable automatic createdAt and updatedAt
export class Target {
  @Prop({ required: true })
  email: string;

  @Prop({ default: false })
  isClickedUrl: boolean;
}

export const TargetSchema = SchemaFactory.createForClass(Target);
