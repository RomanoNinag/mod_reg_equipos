import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EstadoFisicoService } from './estado-fisico.service';
import { CreateEstadoFisicoDto } from './dto/create-estado-fisico.dto';
import { UpdateEstadoFisicoDto } from './dto/update-estado-fisico.dto';

@Controller('estado-fisico')
export class EstadoFisicoController {
  constructor(private readonly estadoFisicoService: EstadoFisicoService) {}

  @Post()
  create(@Body() createEstadoFisicoDto: CreateEstadoFisicoDto) {
    return this.estadoFisicoService.create(createEstadoFisicoDto);
  }

  @Get()
  findAll() {
    return this.estadoFisicoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.estadoFisicoService.findOneById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEstadoFisicoDto: UpdateEstadoFisicoDto) {
    return this.estadoFisicoService.update(+id, updateEstadoFisicoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.estadoFisicoService.remove(+id);
  }
}
