import { BadRequestException, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateEquipoDto } from './dto/create-equipo.dto';
import { UpdateEquipoDto } from './dto/update-equipo.dto';
import { EstadoFisico, EstadoFisicoService, EstadoLogico, EstadoLogicoService, Marca, MarcaService, Modelo, ModeloService, TipoArticulo, TipoArticuloService } from 'src/articulo-general-references';
import { InjectRepository } from '@nestjs/typeorm';
import { Equipo } from './entities/equipo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EquipoService {

  private marcaCache: { [id: number]: Marca } = {};
  private modeloCache: { [id: number]: Modelo } = {};
  private estadoFisicoCache: { [id: number]: EstadoFisico } = {};
  private estadoLogicoCache: { [id: number]: EstadoLogico } = {};
  private tipoArticuloCache: { [id: number]: TipoArticulo } = {};
  constructor(
    @InjectRepository(Equipo)
    private readonly equipoRepository: Repository<Equipo>,

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
    const marcas = await this.marcaService.findAllEquipo();
    this.marcaCache = Object.fromEntries(marcas.map(marca => [marca.id_marca, marca]));

    const modelos = await this.modeloService.findAllEquipo();
    this.modeloCache = Object.fromEntries(modelos.map(modelo => [modelo.id_modelo, modelo]));

    const estadosFisicos = await this.estadoFisicoService.findAllEquipo();
    this.estadoFisicoCache = Object.fromEntries(estadosFisicos.map(estado => [estado.id_estado_fisico, estado]));

    const estadosLogicos = await this.estadoLogicoService.findAllEquipo();
    this.estadoLogicoCache = Object.fromEntries(estadosLogicos.map(estado => [estado.id_estado_logico, estado]));

    const tiposArticulos = await this.tiposArticuloService.findAllEquipo();
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

  async create(createEquipoDto: CreateEquipoDto) {
    try {
      const marca = await this.getCachedEntity(
        createEquipoDto.id_marca,
        this.marcaCache,
        this.marcaService.findOneById.bind(this.marcaService)
      );

      const modelo = await this.getCachedEntity(
        createEquipoDto.id_modelo,
        this.modeloCache,
        this.modeloService.findOneById.bind(this.modeloService)
      );

      const estadoFisico = await this.getCachedEntity(
        createEquipoDto.id_estado_fisico,
        this.estadoFisicoCache,
        this.estadoFisicoService.findOneById.bind(this.estadoFisicoService)
      );

      const estadoLogico = await this.getCachedEntity(
        createEquipoDto.id_estado_logico,
        this.estadoLogicoCache,
        this.estadoLogicoService.findOneById.bind(this.estadoLogicoService)
      );

      const tipoArticulo = await this.getCachedEntity(
        createEquipoDto.id_tipo_articulo,
        this.tipoArticuloCache,
        this.tiposArticuloService.findOneById.bind(this.tiposArticuloService)
      );

      const newEquipo = this.equipoRepository.create({
        ...createEquipoDto,
        marca,
        modelo,
        estado_fisico: estadoFisico,
        estado_logico: estadoLogico,
        tipo_articulo: tipoArticulo,
      });
      return await this.equipoRepository.save(newEquipo);

    } catch (error) {
      this.handleDBExceptions(error);
    }
    // return 'This action adds a new equipo';
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
    return `This action returns all equipo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} equipo`;
  }

  update(id: number, updateEquipoDto: UpdateEquipoDto) {
    return `This action updates a #${id} equipo`;
  }

  remove(id: number) {
    return `This action removes a #${id} equipo`;
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
