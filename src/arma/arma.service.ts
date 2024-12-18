import { BadRequestException, Inject, Injectable, InternalServerErrorException, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateArmaDto } from './dto/create-arma.dto';
import { UpdateArmaDto } from './dto/update-arma.dto';
import { DataSource, Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';


import { Arma } from './entities/arma.entity';
import { EstadoFisico, EstadoFisicoService, EstadoLogico, EstadoLogicoService, Marca, MarcaService, Modelo, ModeloService, TipoArticulo, TipoArticuloService } from 'src/articulo-general-references';
import { OnEvent } from '@nestjs/event-emitter';
import { isUUID } from 'class-validator';


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
    private readonly dataSouce: DataSource,

  ) { }

  //actualizamos los datos despues de modificaciones
  @OnEvent('cache.update')
  async handleCacheUpdate(payload: { entity: string }) {
    // console.log(`Evento recibido para actualizar ${payload.entity}`);

    if (payload.entity === 'marca') {
      this.referencias.marca = await this.marcaService.findAllArma();
    }

    if (payload.entity === 'modelo') {
      this.referencias.modelo = await this.modeloService.findAllArma();
    }
    if (payload.entity === 'estadoFisico') {
      this.referencias.estadosFisico = await this.estadoFisicoService.findAllArma();
    }

    if (payload.entity === 'estadoLogico') {
      this.referencias.estadosLogico = await this.estadoLogicoService.findAllArma();
    }

    if (payload.entity === 'tipoArticulo') {
      this.referencias.tiposArticulo = await this.tiposArticuloService.findAllArma();
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
  async getMarcas() {
    return this.referencias.marca;
  }

  async getModelos() {
    return this.referencias.modelo;
  }

  async findAll() {
    return this.armaRepository.find({
      where: {
        deleted_at: null,
      },
      relations: ['marca', 'modelo', 'estado_fisico', 'estado_logico', 'tipo_articulo']
    });
  }

  async findOne(term: string) {
    let arma: Arma;
    if (isUUID(term)) {
      // arma = await this.armaRepository.findOneBy({ id_articulo: term });
      arma = await this.armaRepository.findOne({
        where: {
          id_articulo: term,
        },
        relations: ['marca', 'modelo', 'estado_fisico', 'estado_logico', 'tipo_articulo']
      })
    } else {
      arma = await this.armaRepository.findOne({
        where: {
          cod_registro: term,
        },
        relations: ['marca', 'modelo', 'estado_fisico', 'estado_logico', 'tipo_articulo']
      })
    }
    if (!arma)
      throw new NotFoundException(`arma con id ${term} no encontrado`);
    return arma;
  }

  async findOneById(id: string) {
    const arma = await this.armaRepository.findOneBy({ id_articulo: id });
    if (!arma)
      throw new NotFoundException(`arma con id ${id} no encontrado`);
    return arma;
  }

  async update(id: string, updateArmaDto: UpdateArmaDto) {
    try {

      const { id_marca, id_modelo, id_estado_fisico, id_estado_logico, id_tipo_articulo, ...toUpdate } = updateArmaDto

      // Buscar el arma a actualizar utilizando la función findOneById
      // const arma = await this.findOneById(id); // Convertir el id a string si es necesario

      const arma = await this.armaRepository.preload({
        id_articulo: id,
        ...toUpdate,
      })
      if (!arma) {
        throw new NotFoundException(`Arma con id ${id} no encontrado`);
      }
      // Buscar las referencias en el cache para actualizar el arma
      const marca = this.referencias.marca.find(
        (m) => m.id_marca === id_marca
      );
      const modelo = this.referencias.modelo.find(
        (m) => m.id_modelo === id_modelo
      );
      const estado_fisico = this.referencias.estadosFisico.find(
        (m) => m.id_estado_fisico === id_estado_fisico
      );
      const estado_logico = this.referencias.estadosLogico.find(
        (m) => m.id_estado_logico === id_estado_logico
      );
      const tipo_articulo = this.referencias.tiposArticulo.find(
        (m) => m.id_tipo_articulo === id_tipo_articulo
      );

      // Actualizar las propiedades del arma
      arma.marca = marca;
      arma.modelo = modelo;
      arma.estado_fisico = estado_fisico;
      arma.estado_logico = estado_logico;
      arma.tipo_articulo = tipo_articulo;

      // Guardar los cambios en la base de datos
      await this.armaRepository.save(arma);

      return this.findOne(id); // Devuelve el arma actualizada
    } catch (error) {
      this.handleDBExceptions(error);
    }
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

  async truncateArmas(): Promise<void> {
    const queryRunner = this.dataSouce.createQueryRunner();
    await queryRunner.connect();
    try {
      await queryRunner.query(`TRUNCATE TABLE "armas" RESTART IDENTITY CASCADE`)
    } catch (error) {
      this.handleDBExceptions(error);
    } finally {
      await queryRunner.release();
    }
  }
}
