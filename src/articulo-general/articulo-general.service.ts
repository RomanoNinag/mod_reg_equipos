import { Injectable } from '@nestjs/common';
import { CreateArticuloGeneralDto } from './dto/create-articulo-general.dto';
import { UpdateArticuloGeneralDto } from './dto/update-articulo-general.dto';

@Injectable()
export class ArticuloGeneralService {
  create(createArticuloGeneralDto: CreateArticuloGeneralDto) {
    return 'This action adds a new articuloGeneral';
  }

  findAll() {
    return `This action returns all articuloGeneral`;
  }

  findOne(id: number) {
    return `This action returns a #${id} articuloGeneral`;
  }

  update(id: number, updateArticuloGeneralDto: UpdateArticuloGeneralDto) {
    return `This action updates a #${id} articuloGeneral`;
  }

  remove(id: number) {
    return `This action removes a #${id} articuloGeneral`;
  }
}
