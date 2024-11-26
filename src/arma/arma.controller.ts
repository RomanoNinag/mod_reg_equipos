import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { ArmaService } from './arma.service';
import { CreateArmaDto } from './dto/create-arma.dto';
import { UpdateArmaDto } from './dto/update-arma.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('arma')
export class ArmaController {
  constructor(private readonly armaService: ArmaService) { }

  @Post()
  create(@Body() createArmaDto: CreateArmaDto) {
    return this.armaService.create(createArmaDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.armaService.findAll(paginationDto);
  }
  // @Get()
  // findAll() {
  //   return this.armaService.findAll();
  // }

  // @Get()

  @Get('referencia')
  findReferences() {
    return this.armaService.getReferencias();
  }
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.armaService.findOneById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArmaDto: UpdateArmaDto) {
    return this.armaService.update(+id, updateArmaDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.armaService.softDelete(id);
  }
}
