import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ModeloService } from './modelo.service';
import { CreateModeloDto } from './dto/create-modelo.dto';
import { UpdateModeloDto } from './dto/update-modelo.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('modelo')
export class ModeloController {
  constructor(private readonly modeloService: ModeloService) { }

  @Post()
  create(@Body() createModeloDto: CreateModeloDto) {
    return this.modeloService.create(createModeloDto);
  }

  @Get()
  @MessagePattern('get.articulo.modelo')
  findAll() {
    return this.modeloService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.modeloService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateModeloDto: UpdateModeloDto) {
    return this.modeloService.update(+id, updateModeloDto);
  }

  @Delete(':id')
  @MessagePattern('delete.articulo.modelo')
  remove(@Payload('id') id: number) {
    return this.modeloService.softDelete(id);
  }

  //other methods
  @Post('reset-sequence')
  async resetSequence(): Promise<void> {
    await this.modeloService.resetSequence();
  }

}
