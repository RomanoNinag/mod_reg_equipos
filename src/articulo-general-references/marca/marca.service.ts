import { BadRequestException, Inject, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateMarcaDto } from './dto/create-marca.dto';
import { UpdateMarcaDto } from './dto/update-marca.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Marca } from './entities/marca.entity';
import { DataSource, ILike, In, Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class MarcaService {
  private readonly logger = new Logger('MarcaService');
  constructor(
    @InjectRepository(Marca)
    private readonly marcaRepository: Repository<Marca>,
    private readonly dataSource: DataSource,
    private readonly eventEmitter: EventEmitter2,
  ) {

  }
  async create(createMarcaDto: CreateMarcaDto) {

    try {
      const marca = this.marcaRepository.create(createMarcaDto);

      //impactamos la bd (esperamos siempre)
      await this.marcaRepository.save(marca);
      //emitimos even
      this.eventEmitter.emit('cache.update', { entity: 'marcas' });

      return marca;
    } catch (error) {
      this.handleDBExceptions(error);
    }

  }

  async findAll() {
    return this.marcaRepository.find({
      where: {
        deleted_at: null,
      }
    });
  }

  async findAllArma() {
    return await this.marcaRepository.find({
      where: {
        tipo: In([1, 3]),
        deleted_at: null,
      }
    })
  }
  async findAllEquipo() {
    return await this.marcaRepository.find({
      where: {
        tipo: In([2, 3]),
        deleted_at: null,
      }
    })
  }

  async findOne(term: string) {
    console.log(term);

    let marca;
    if (!isNaN(+term)) {
      marca = await this.marcaRepository.findOneBy({ id_marca: +term });
    } else {
      marca = await this.marcaRepository.find({
        where: {
          nombre_marca: ILike(term),
        }
      })
    }
    if (!marca)
      throw new NotFoundException(`marca con id ${term} no encontrado`)
    return marca;
  }
  async findOneById(id: number) {
    const marca = await this.marcaRepository.findOneBy({ id_marca: id });
    if (!marca)
      throw new NotFoundException(`marca con id ${id} no encontrado`)
    return marca;
  }

  update(id: number, updateMarcaDto: UpdateMarcaDto) {
    return `This action updates a #${id} marca`;
  }

  async remove(id: number) {
    const marca = await this.findOneById(id);
    await this.marcaRepository.remove(marca);
    return marca;
  }

  async softDelete(id: number) {
    const marca = await this.findOneById(id);
    marca.deleted_at = new Date(); // Actualiza el campo deleted_at con la fecha actual
    await this.marcaRepository.save(marca);
    return marca;
  }

  // handle errors
  private handleDBExceptions(error) {
    if (error.code === '23505')
      throw new BadRequestException(error.detail);
    if (error.code === '23502') {
      console.log(error)
      throw new BadRequestException(error.detail);
    }
    console.log(error)
    throw new InternalServerErrorException('Otro tipo de error de base de datos!')
  }

  //other methods
  async resetSequence(): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    try {
      await queryRunner.query(`ALTER SEQUENCE marcas_id_marca_seq RESTART WITH 1`);
    } finally {
      await queryRunner.release();
    }
  }
  async deleteAllMarcas() {
    const query = this.marcaRepository.createQueryBuilder('marca');
    try {
      await query
        .delete()
        .where({})
        .execute();
      this.resetSequence();
      return
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async truncateMarcas(): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    try {
      await queryRunner.query(`TRUNCATE TABLE "marcas" RESTART IDENTITY CASCADE`);
    } catch (error) {
      this.handleDBExceptions(error);
    } finally {
      await queryRunner.release();
    }
  }
}
