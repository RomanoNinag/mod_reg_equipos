import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EstadoLogicoService } from './estado-logico.service';
import { CreateEstadoLogicoDto } from './dto/create-estado-logico.dto';
import { UpdateEstadoLogicoDto } from './dto/update-estado-logico.dto';

@Controller('estado-logico')
export class EstadoLogicoController {
  constructor(private readonly estadoLogicoService: EstadoLogicoService) { }

  @Post()
  create(@Body() createEstadoLogicoDto: CreateEstadoLogicoDto) {
    return this.estadoLogicoService.create(createEstadoLogicoDto);
  }

  @Get()
  findAll() {
    return this.estadoLogicoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.estadoLogicoService.findOneById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEstadoLogicoDto: UpdateEstadoLogicoDto) {
    return this.estadoLogicoService.update(+id, updateEstadoLogicoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.estadoLogicoService.remove(+id);
  }
}
