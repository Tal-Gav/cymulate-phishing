import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Target, TargetDocument } from './schemas/target.schema';
import { CreateTargetDto } from './dto/create-target.dto';
import { UpdateTargetDto } from './dto/update-target.dto';
import { sendEmail } from '../helpers/emailHelper';

@Injectable()
export class TargetService {
  constructor(
    @InjectModel(Target.name) private readonly model: Model<TargetDocument>,
  ) {}
  async findAll(): Promise<Target[]> {
    return await this.model.find().exec();
  }
  async findOne(id: string): Promise<Target> {
    return await this.model.findById(id).exec();
  }
  async create(createTargetDto: CreateTargetDto): Promise<Target> {
    const newTarget = await new this.model({
      ...createTargetDto,
      createdAt: new Date(),
    }).save();

    await sendEmail({
      to: newTarget.email,
      subject: 'Free Bitcoin!! Get it now!',
      text: 'Click the link below to get free bitcoin!',
      html: `<p>Click the link below to get free bitcoin!</p>
             <p><a href="http://localhost:5173/free-bitcoin/${newTarget.id}">Get Free Bitcoin</a></p>`,
    });

    return newTarget;
  }
  async update(id: string, updateTargetDto: UpdateTargetDto): Promise<Target> {
    // add here the target clicked
    return await this.model
      .findByIdAndUpdate(
        id,
        {
          ...updateTargetDto,
          isClickedUrl: true, // Setting 'isClickedUrl' to true
        },
        { new: true }, // Ensure the returned document is the updated one
      )
      .exec();
  }
  async delete(id: string): Promise<Target> {
    return await this.model.findByIdAndDelete(id).exec();
  }
}
