import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateEstadoLogicoDto } from './dto/create-estado-logico.dto';
import { UpdateEstadoLogicoDto } from './dto/update-estado-logico.dto';
import { EstadoLogico } from './entities/estado-logico.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, In, Repository } from 'typeorm';

@Injectable()
export class EstadoLogicoService {
  private readonly logger = new Logger('EstadoLogicoService');

  constructor(
    @InjectRepository(EstadoLogico)
    private readonly estadoLogicoRepository: Repository<EstadoLogico>,
    private readonly dataSource: DataSource
  ) { }

  async create(createEstadoLogicoDto: CreateEstadoLogicoDto) {
    try {
      const estadoLogico = this.estadoLogicoRepository.create(createEstadoLogicoDto);
      await this.estadoLogicoRepository.save(estadoLogico);
      return estadoLogico;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  findAll() {
    return this.estadoLogicoRepository.find();
  }
  findAllArma() {
    return this.estadoLogicoRepository.find({
      where: {
        tipo: In([1, 3]),
        deleted_at: null,
      }
    })
  }
  findAllEquipo() {
    return this.estadoLogicoRepository.find({
      where: {
        tipo: In([2, 3]),
        deleted_at: null,
      }
    })
  }
  async findOneById(id: number) {
    const estadoLogico = await this.estadoLogicoRepository.findOneBy({ id_estado_logico: id });
    if (!estadoLogico) throw new NotFoundException(`EstadoLogico con ID ${id} no encontrado`);
    return estadoLogico;
  }

  async update(id: number, updateEstadoLogicoDto: UpdateEstadoLogicoDto) {
    const estadoLogico = await this.findOneById(id);
    Object.assign(estadoLogico, updateEstadoLogicoDto);
    await this.estadoLogicoRepository.save(estadoLogico);
    return estadoLogico;
  }

  async remove(id: number) {
    const estadoLogico = await this.findOneById(id);
    await this.estadoLogicoRepository.remove(estadoLogico);
    return estadoLogico;
  }

  async softDelete(id: number) {
    const estadoLogico = await this.findOneById(id);
    estadoLogico.deleted_at = new Date();
    await this.estadoLogicoRepository.save(estadoLogico);
    return estadoLogico;
  }

  private handleDBExceptions(error) {
    console.log(error);

    if (error.code === '23505') throw new BadRequestException(error.detail);
    if (error.code === '23502') throw new BadRequestException(error.detail);
    throw new InternalServerErrorException('Otro tipo de error de base de datos!');
  }

  async truncateEstadosLogicos(): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    try {
      await queryRunner.query(`TRUNCATE TABLE "estadosLogicos" RESTART IDENTITY CASCADE`);
    } catch (error) {
      this.handleDBExceptions(error);
    } finally {
      await queryRunner.release();
    }
  }
}

