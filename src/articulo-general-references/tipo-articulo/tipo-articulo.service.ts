import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateTipoArticuloDto } from './dto/create-tipo-articulo.dto';
import { UpdateTipoArticuloDto } from './dto/update-tipo-articulo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, In, Repository } from 'typeorm';
import { TipoArticulo } from './entities/tipo-articulo.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class TipoArticuloService {
  private readonly logger = new Logger('TipoArticuloService');

  constructor(
    @InjectRepository(TipoArticulo)
    private readonly tipoArticuloRepository: Repository<TipoArticulo>,
    private readonly dataSource: DataSource,
    private readonly eventEmitter: EventEmitter2,
  ) { }

  async create(createTipoArticuloDto: CreateTipoArticuloDto) {
    try {
      const tipoArticulo = this.tipoArticuloRepository.create(createTipoArticuloDto);
      await this.tipoArticuloRepository.save(tipoArticulo);
      this.eventEmitter.emit('cache.update', { entity: 'tipoArticulo' });
      return tipoArticulo;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  findAll() {
    return this.tipoArticuloRepository.find();
  }

  async findAllArma() {
    return await this.tipoArticuloRepository.find({
      where: {
        tipo: In([1, 3]),
        deleted_at: null,
      }
    })
  }
  async findAllEquipo() {
    return await this.tipoArticuloRepository.find({
      where: {
        tipo: In([2, 3]),
        deleted_at: null,
      }
    })
  }
  async findOneById(id: number) {
    const tipoArticulo = await this.tipoArticuloRepository.findOneBy({ id_tipo_articulo: id });
    if (!tipoArticulo) throw new NotFoundException(`TipoArticulo con ID ${id} no encontrado`);
    return tipoArticulo;
  }

  async update(id: number, updateTipoArticuloDto: UpdateTipoArticuloDto) {
    const tipoArticulo = await this.findOneById(id);
    Object.assign(tipoArticulo, updateTipoArticuloDto);
    await this.tipoArticuloRepository.save(tipoArticulo);
    return tipoArticulo;
  }

  async remove(id: number) {
    const tipoArticulo = await this.findOneById(id);
    await this.tipoArticuloRepository.remove(tipoArticulo);
    return tipoArticulo;
  }

  async softDelete(id: number) {
    const tipoArticulo = await this.findOneById(id);
    tipoArticulo.deleted_at = new Date();
    await this.tipoArticuloRepository.save(tipoArticulo);
    return tipoArticulo;
  }

  private handleDBExceptions(error) {
    console.log(error);

    if (error.code === '23505') throw new BadRequestException(error.detail);
    if (error.code === '23502') throw new BadRequestException(error.detail);
    throw new InternalServerErrorException('Otro tipo de error de base de datos!');
  }

  async truncateTiposArticulos(): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    try {
      await queryRunner.query(`TRUNCATE TABLE "tiposArticulos" RESTART IDENTITY CASCADE`);
    } catch (error) {
      this.handleDBExceptions(error);
    } finally {
      await queryRunner.release();
    }
  }
}

