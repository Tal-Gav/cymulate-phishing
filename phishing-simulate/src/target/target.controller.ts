import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateTargetDto } from './dto/create-target.dto';
import { UpdateTargetDto } from './dto/update-target.dto';
import { TargetService } from './target.service';

@Controller('phishing')
export class TargetController {
  constructor(private readonly service: TargetService) {}
  @Get()
  async index() {
    return await this.service.findAll();
  }
  @Get(':id')
  async find(@Param('id') id: string) {
    return await this.service.findOne(id);
  }
  @Post('send')
  async create(@Body() createTargetDto: CreateTargetDto) {
    return await this.service.create(createTargetDto);
  }
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTargetDto: UpdateTargetDto,
  ) {
    return await this.service.update(id, updateTargetDto);
  }
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }
}
