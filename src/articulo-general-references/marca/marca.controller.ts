import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, UseInterceptors } from '@nestjs/common';
import { MarcaService } from './marca.service';
import { CreateMarcaDto } from './dto/create-marca.dto';
import { UpdateMarcaDto } from './dto/update-marca.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('marca')
export class MarcaController {
  constructor(private readonly marcaService: MarcaService) { }

  @Post()
  create(@Body() createMarcaDto: CreateMarcaDto) {
    return this.marcaService.create(createMarcaDto);
  }
  @Get()
  @MessagePattern('get.articulo.marca')
  async findAll() {
    return this.marcaService.findAll();
  }
  @Get()
  async findAllEquipo() {

    return this.marcaService.findAllEquipo();
  }
  @Get(':term')
  findOne(@Param('term') term: string) {

    return this.marcaService.findOne(term);
  }
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   console.log(id);

  //   return this.marcaService.findOne(+id);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMarcaDto: UpdateMarcaDto) {
    return this.marcaService.update(+id, updateMarcaDto);
  }

  @Delete(':id')
  @MessagePattern('delete.articulo.marca')
  remove(@Payload('id') id: string) {
    return this.marcaService.softDelete(+id);
  }
  //other methods
  @Post('reset-sequence')
  async resetSequence(): Promise<void> {
    await this.marcaService.resetSequence();
  }

}
