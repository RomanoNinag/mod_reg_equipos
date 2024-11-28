import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateModeloDto } from './dto/create-modelo.dto';
import { UpdateModeloDto } from './dto/update-modelo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Modelo } from './entities/modelo.entity';
import { DataSource, getConnection, In, QueryRunner, Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class ModeloService {

  constructor(
    @InjectRepository(Modelo)
    private readonly modeloRepository: Repository<Modelo>,
    private readonly dataSource: DataSource,
    private readonly eventEmitter: EventEmitter2

  ) { }

  async create(createModeloDto: CreateModeloDto) {
    try {
      const modelo = this.modeloRepository.create(createModeloDto);

      await this.modeloRepository.save(modelo);

      this.eventEmitter.emit('cache.update', { entity: 'modelos' })
      return modelo;

    } catch (error) {
      this.handleDBExceptions(error);
    }
    // return 'This action adds a new modelo';
  }

  findAll() {
    return this.modeloRepository.find({
      where: {
        deleted_at: null,
      }
    });
    // return `This action returns all modelo`;
  }

  async findAllArma() {
    return await this.modeloRepository.find({
      where: {
        tipo: In([1, 3]),
        deleted_at: null,
      }
    })
  }
  async findAllEquipo() {
    return await this.modeloRepository.find({
      where: {
        tipo: In([2, 3]),
        deleted_at: null,
      }
    })
  }

  async findOne(id: number) {
    const modelo = await this.modeloRepository.findOneBy({ id_modelo: id });
    if (!modelo)
      throw new NotFoundException(`Modelo con el id ${id} no encontrado`);
    return modelo;
  }
  async findOneById(id: number) {
    const modelo = await this.modeloRepository.findOneBy({ id_modelo: id });
    if (!modelo)
      throw new NotFoundException(`Modelo con el id ${id} no encontrado`);
    return modelo;
  }
  update(id: number, updateModeloDto: UpdateModeloDto) {
    return `This action updates a #${id} modelo`;
  }

  async remove(id: number) {
    const modelo = await this.findOne(id);
    await this.modeloRepository.remove(modelo);
    return modelo;
  }

  async softDelete(id: string) {
    // const marca = await this.marcaRepository.findOne({ where: { id_marca: id } });
    const modelo = await this.findOne(+id);
    // if (!marca) {
    //   throw new NotFoundException(`Marca con ID ${id} no encontrada`);
    // }
    modelo.deleted_at = new Date(); // Actualiza el campo deleted_at con la fecha actual
    await this.modeloRepository.save(modelo);
    return modelo;
  }

  private handleDBExceptions(error) {
    if (error.code === '23505')
      throw new BadRequestException(error.detail);
    // this.logger.error(error);
    console.log(error)
    throw new InternalServerErrorException('Otro tipo de error de base de datos!')
  }

  //other methods
  async resetSequence(): Promise<void> {
    const queryRunner: QueryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();

    try {
      // Cambia `arma_id_seq` por el nombre de la secuencia real de tu columna ID
      await queryRunner.query(`ALTER SEQUENCE modelos_id_modelo_seq RESTART WITH 1`);
    } finally {
      await queryRunner.release();
    }
  }
  async deleteAllModelos() {
    const query = this.modeloRepository.createQueryBuilder('modelo');

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
  async truncateModelos(): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    try {
      await queryRunner.query(`TRUNCATE TABLE "modelos" RESTART IDENTITY CASCADE`);
    } catch (error) {
      this.handleDBExceptions(error);
    } finally {
      await queryRunner.release();
    }
  }
}
