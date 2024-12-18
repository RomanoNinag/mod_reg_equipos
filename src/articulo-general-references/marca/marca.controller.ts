import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, UseInterceptors } from '@nestjs/common';
import { MarcaService } from './marca.service';
import { CreateMarcaDto } from './dto/create-marca.dto';
import { UpdateMarcaDto } from './dto/update-marca.dto';

@Controller('marca')
export class MarcaController {
  constructor(private readonly marcaService: MarcaService) { }

  @Post()
  // @HttpCode(200)
  create(@Body() createMarcaDto: CreateMarcaDto) {
    //const { nombre_marca, tipo } = createMarcaDto;
    // const dtoToSend = {
    //   ...createMarcaDto,
    //   tipo: createMarcaDto.tipo.code,
    // };
    return this.marcaService.create(createMarcaDto);
  }

  // @Get()
  // async findAll() {
  //   // console.log('Iside controller');

  //   return this.marcaService.findAll();
  // }

  // @Get()
  // async findAllArma() {
  //   // console.log('Iside controller');

  //   return this.marcaService.findAllArma();
  // }
  @Get()
  async findAllEquipo() {
    // console.log('Iside controller');

    return this.marcaService.findAllEquipo();
  }
  @Get(':term')
  findOne(@Param('term') term: string) {
    // console.log(id);

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
  remove(@Param('id') id: string) {
    return this.marcaService.softDelete(+id);
  }
  //other methods
  @Post('reset-sequence')
  async resetSequence(): Promise<void> {
    await this.marcaService.resetSequence();
  }

}
