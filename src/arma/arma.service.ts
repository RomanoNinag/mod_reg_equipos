import { BadRequestException, Inject, Injectable, InternalServerErrorException, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateArmaDto } from './dto/create-arma.dto';
import { UpdateArmaDto } from './dto/update-arma.dto';
import { Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';


import { Arma } from './entities/arma.entity';
import { EstadoFisico, EstadoFisicoService, EstadoLogico, EstadoLogicoService, Marca, MarcaService, Modelo, ModeloService, TipoArticulo, TipoArticuloService } from 'src/articulo-general-references';
import { OnEvent } from '@nestjs/event-emitter';


@Injectable()
export class ArmaService implements OnModuleInit {

  private referencias: {
    marca: Marca[],
    modelo: Modelo[],
    estadosFisico: EstadoFisico[],
    estadosLogico: EstadoLogico[],
    tiposArticulo: TipoArticulo[]
  };

  async onModuleInit() {
    await this.initializeCache();
  }

  private async initializeCache() {
    const marca = await this.marcaService.findAllArma();
    const modelo = await this.modeloService.findAllArma();
    const estadosFisico = await this.estadoFisicoService.findAllArma();
    const estadosLogico = await this.estadoLogicoService.findAllArma();
    const tiposArticulo = await this.tiposArticuloService.findAllArma();

    this.referencias = { marca, modelo, estadosFisico, estadosLogico, tiposArticulo };
  }


  constructor(
    @InjectRepository(Arma)
    private readonly armaRepository: Repository<Arma>,

    @Inject()
    private readonly marcaService: MarcaService,
    @Inject()
    private readonly modeloService: ModeloService,
    @Inject()
    private readonly estadoFisicoService: EstadoFisicoService,
    @Inject()
    private readonly estadoLogicoService: EstadoLogicoService,
    @Inject()
    private readonly tiposArticuloService: TipoArticuloService,

  ) { }

  //actualizamos los datos despues de modificaciones
  @OnEvent('cache.update')
  async handleCacheUpdate(payload: { entity: string }) {
    console.log(`Evento recibido para actualizar ${payload.entity}`);

    if (payload.entity === 'marcas') {
      this.referencias.marca = await this.marcaService.findAllArma();
    }

    if (payload.entity === 'modelos') {
      this.referencias.modelo = await this.modeloService.findAllArma();
    }
  }

  async create(createArmaDto: CreateArmaDto) {
    try {
      const marca = this.referencias.marca.find(
        (m) => m.id_marca === createArmaDto.id_marca
      );
      const modelo = this.referencias.modelo.find(
        (m) => m.id_modelo === createArmaDto.id_modelo
      );
      const estado_fisico = this.referencias.estadosFisico.find(
        (m) => m.id_estado_fisico === createArmaDto.id_estado_fisico
      );
      const estado_logico = this.referencias.estadosLogico.find(
        (m) => m.id_estado_logico === createArmaDto.id_estado_logico
      );
      const tipo_articulo = this.referencias.tiposArticulo.find(
        (m) => m.id_tipo_articulo === createArmaDto.id_tipo_articulo
      );
      const newArma = this.armaRepository.create({
        ...createArmaDto,
        marca,
        modelo,
        estado_fisico,
        estado_logico,
        tipo_articulo
      });
      return await this.armaRepository.save(newArma);

    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async getReferencias() {
    return {
      marca: this.referencias.marca,
      modelo: this.referencias.modelo,
      estado_fisico: this.referencias.estadosFisico,
      estado_logico: this.referencias.estadosLogico,
      tipo_articulo: this.referencias.tiposArticulo
    }
  }
  async findAll() {
    // const { pagina = 1, limite = 10 } = paginationDto;

    // const [armas, total] = await this.armaRepository.findAndCount({
    //   skip: (pagina - 1) * limite,
    //   take: limite,
    //   where: {
    //     deleted_at: null,
    //   }
    // })
    // return armas;

    return this.armaRepository.find({
      where: {
        deleted_at: null,
      }
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} arma`;
  }
  async findOneById(id: string) {
    const arma = await this.armaRepository.findOneBy({ id_articulo: id });
    if (!arma)
      throw new NotFoundException(`arma con id ${id} no encontrado`);
    return arma;
  }

  update(id: number, updateArmaDto: UpdateArmaDto) {
    return `This action updates a #${id} arma`;
  }

  remove(id: number) {
    return `This action removes a #${id} arma`;
  }
  async softDelete(id: string) {
    const arma = await this.findOneById(id);
    arma.deleted_at = new Date(); // Actualiza el campo deleted_at con la fecha actual
    await this.armaRepository.save(arma);
    return arma;
  }
  private handleDBExceptions(error) {
    if (error.code === '23505')
      throw new BadRequestException(error.detail);
    if (error.code === '23502') {
      console.log(error)
      throw new BadRequestException(error.detail);
    }
    // console.log(error)
    throw new InternalServerErrorException('Otro tipo de error de base de datos!')
  }
}
