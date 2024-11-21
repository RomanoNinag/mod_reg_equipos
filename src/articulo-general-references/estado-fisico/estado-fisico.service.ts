import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateEstadoFisicoDto } from './dto/create-estado-fisico.dto';
import { UpdateEstadoFisicoDto } from './dto/update-estado-fisico.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EstadoFisico } from './entities/estado-fisico.entity';
import { DataSource, In, Repository } from 'typeorm';

@Injectable()
export class EstadoFisicoService {
  private readonly logger = new Logger('EstadoFisicoService');

  constructor(
    @InjectRepository(EstadoFisico)
    private readonly estadoFisicoRepository: Repository<EstadoFisico>,
    private readonly dataSource: DataSource
  ) { }

  async create(createEstadoFisicoDto: CreateEstadoFisicoDto) {
    try {
      const estadoFisico = this.estadoFisicoRepository.create(createEstadoFisicoDto);
      await this.estadoFisicoRepository.save(estadoFisico);
      return estadoFisico;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  findAll() {
    return this.estadoFisicoRepository.find();
  }
  findAllArma() {
    return this.estadoFisicoRepository.find({
      where: {
        tipo: In([1, 3]),
        deleted_at: null,
      }
    })
  }
  findAllEquipo() {
    return this.estadoFisicoRepository.find({
      where: {
        tipo: In([2, 3]),
        deleted_at: null,
      }
    })
  }
  async findOneById(id: number) {
    const estadoFisico = await this.estadoFisicoRepository.findOneBy({ id_estado_fisico: id });
    if (!estadoFisico) throw new NotFoundException(`EstadoFisico con ID ${id} no encontrado`);
    return estadoFisico;
  }

  async update(id: number, updateEstadoFisicoDto: UpdateEstadoFisicoDto) {
    const estadoFisico = await this.findOneById(id);
    Object.assign(estadoFisico, updateEstadoFisicoDto);
    await this.estadoFisicoRepository.save(estadoFisico);
    return estadoFisico;
  }

  async remove(id: number) {
    const estadoFisico = await this.findOneById(id);
    await this.estadoFisicoRepository.remove(estadoFisico);
    return estadoFisico;
  }

  async softDelete(id: number) {
    const estadoFisico = await this.findOneById(id);
    estadoFisico.deleted_at = new Date();
    await this.estadoFisicoRepository.save(estadoFisico);
    return estadoFisico;
  }

  private handleDBExceptions(error) {
    console.log(error);

    if (error.code === '23505') throw new BadRequestException(error.detail);
    if (error.code === '23502') throw new BadRequestException(error.detail);
    throw new InternalServerErrorException('Otro tipo de error de base de datos!');
  }

  async truncateEstadosFisicos(): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    try {
      await queryRunner.query(`TRUNCATE TABLE "estadosFisicos" RESTART IDENTITY CASCADE`);
    } catch (error) {
      this.handleDBExceptions(error);
    } finally {
      await queryRunner.release();
    }
  }
}
