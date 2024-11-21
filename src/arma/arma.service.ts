import { BadRequestException, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateArmaDto } from './dto/create-arma.dto';
import { UpdateArmaDto } from './dto/update-arma.dto';
import { Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';


import { Arma } from './entities/arma.entity';
import { EstadoFisico, EstadoFisicoService, EstadoLogico, EstadoLogicoService, Marca, MarcaService, Modelo, ModeloService, TipoArticulo, TipoArticuloService } from 'src/articulo-general-references';

@Injectable()
export class ArmaService {

  private marcaCache: { [id: number]: Marca } = {};
  private modeloCache: { [id: number]: Modelo } = {};
  private estadoFisicoCache: { [id: number]: EstadoFisico } = {};
  private estadoLogicoCache: { [id: number]: EstadoLogico } = {};
  private tipoArticuloCache: { [id: number]: TipoArticulo } = {};

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
  async onModuleInit() {
    await this.initializeCache(); // Tipo 1 para armas
  }
  async initializeCache() {
    const marcas = await this.marcaService.findAllArma();
    this.marcaCache = Object.fromEntries(marcas.map(marca => [marca.id_marca, marca]));

    const modelos = await this.modeloService.findAllArma();
    this.modeloCache = Object.fromEntries(modelos.map(modelo => [modelo.id_modelo, modelo]));

    const estadosFisicos = await this.estadoFisicoService.findAllArma();
    this.estadoFisicoCache = Object.fromEntries(estadosFisicos.map(estado => [estado.id_estado_fisico, estado]));

    const estadosLogicos = await this.estadoLogicoService.findAllArma();
    this.estadoLogicoCache = Object.fromEntries(estadosLogicos.map(estado => [estado.id_estado_logico, estado]));

    const tiposArticulos = await this.tiposArticuloService.findAllArma();
    this.tipoArticuloCache = Object.fromEntries(tiposArticulos.map(tipo => [tipo.id_tipo_articulo, tipo]));
  }
  private async getCachedEntity<T>(
    id: number,
    cache: { [id: number]: T },
    fetchFunction: (id: number) => Promise<T>
  ): Promise<T> {
    if (cache[id]) return cache[id];
    const entity = await fetchFunction(id);
    cache[id] = entity;
    return entity;
  }

  async create(createArmaDto: CreateArmaDto) {
    try {
      const marca = await this.getCachedEntity(
        createArmaDto.id_marca,
        this.marcaCache,
        this.marcaService.findOneById.bind(this.marcaService)
      );

      const modelo = await this.getCachedEntity(
        createArmaDto.id_modelo,
        this.modeloCache,
        this.modeloService.findOneById.bind(this.modeloService)
      );

      const estadoFisico = await this.getCachedEntity(
        createArmaDto.id_estado_fisico,
        this.estadoFisicoCache,
        this.estadoFisicoService.findOneById.bind(this.estadoFisicoService)
      );

      const estadoLogico = await this.getCachedEntity(
        createArmaDto.id_estado_logico,
        this.estadoLogicoCache,
        this.estadoLogicoService.findOneById.bind(this.estadoLogicoService)
      );

      const tipoArticulo = await this.getCachedEntity(
        createArmaDto.id_tipo_articulo,
        this.tipoArticuloCache,
        this.tiposArticuloService.findOneById.bind(this.tiposArticuloService)
      );

      const newArma = this.armaRepository.create({
        ...createArmaDto,
        marca,
        modelo,
        estado_fisico: estadoFisico,
        estado_logico: estadoLogico,
        tipo_articulo: tipoArticulo,
      });
      return await this.armaRepository.save(newArma);

    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async getCachedData() {
    const data = {
      marca: Object.values(this.marcaCache),
      modelo: Object.values(this.modeloCache),
      estado_fisico: Object.values(this.estadoFisicoCache),
      estado_logico: Object.values(this.estadoLogicoCache),
      tipo_articulo: Object.values(this.tipoArticuloCache),
    }
    // console.log(data);

    return data;
  }

  findAll() {
    return this.armaRepository.find({
      where: {
        deleted_at: null,
      }
    });
    // return `This action returns all arma`;
  }

  findOne(id: number) {
    return `This action returns a #${id} arma`;
  }

  update(id: number, updateArmaDto: UpdateArmaDto) {
    return `This action updates a #${id} arma`;
  }

  remove(id: number) {
    return `This action removes a #${id} arma`;
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
