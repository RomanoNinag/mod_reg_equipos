import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ArticuloGeneralService } from './articulo-general.service';
import { CreateArticuloGeneralDto } from './dto/create-articulo-general.dto';
import { UpdateArticuloGeneralDto } from './dto/update-articulo-general.dto';

@Controller('articulo-general')
export class ArticuloGeneralController {
  constructor(private readonly articuloGeneralService: ArticuloGeneralService) {}

  @Post()
  create(@Body() createArticuloGeneralDto: CreateArticuloGeneralDto) {
    return this.articuloGeneralService.create(createArticuloGeneralDto);
  }

  @Get()
  findAll() {
    return this.articuloGeneralService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articuloGeneralService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArticuloGeneralDto: UpdateArticuloGeneralDto) {
    return this.articuloGeneralService.update(+id, updateArticuloGeneralDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articuloGeneralService.remove(+id);
  }
}
