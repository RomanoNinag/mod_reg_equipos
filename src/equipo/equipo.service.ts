import { BadRequestException, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateEquipoDto } from './dto/create-equipo.dto';
import { UpdateEquipoDto } from './dto/update-equipo.dto';
import { EstadoFisico, EstadoFisicoService, EstadoLogico, EstadoLogicoService, Marca, MarcaService, Modelo, ModeloService, TipoArticulo, TipoArticuloService } from 'src/articulo-general-references';
import { InjectRepository } from '@nestjs/typeorm';
import { Equipo } from './entities/equipo.entity';
import { DataSource, Repository } from 'typeorm';
import { OnEvent } from '@nestjs/event-emitter';
import { isUUID } from 'class-validator';

@Injectable()
export class EquipoService {

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
    private readonly dataSouce: DataSource,

  ) { }

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
    const marca = await this.marcaService.findAllEquipo();
    const modelo = await this.modeloService.findAllEquipo();
    const estadosFisico = await this.estadoFisicoService.findAllEquipo();
    const estadosLogico = await this.estadoLogicoService.findAllEquipo();
    const tiposArticulo = await this.tiposArticuloService.findAllEquipo();

    this.referencias = { marca, modelo, estadosFisico, estadosLogico, tiposArticulo };
  }

  // async onModuleInit() {
  //   await this.initializeCache(); // Tipo 1 para armas
  // }
  @OnEvent('cache.update')
  async handleCacheUpdate(payload: { entity: string }) {
    // Actualizar las referencias del cache según la entidad
    if (payload.entity === 'marca') {
      this.referencias.marca = await this.marcaService.findAllEquipo();
    }

    if (payload.entity === 'modelo') {
      this.referencias.modelo = await this.modeloService.findAllEquipo();
    }

    if (payload.entity === 'estadoFisico') {
      this.referencias.estadosFisico = await this.estadoFisicoService.findAllEquipo();
    }

    if (payload.entity === 'estadoLogico') {
      this.referencias.estadosLogico = await this.estadoLogicoService.findAllEquipo();
    }

    if (payload.entity === 'tipoArticulo') {
      this.referencias.tiposArticulo = await this.tiposArticuloService.findAllEquipo();
    }
  }

  async create(createEquipoDto: CreateEquipoDto) {
    try {
      // Buscar las referencias en el cache
      const marca = this.referencias.marca.find(
        (m) => m.id_marca === createEquipoDto.id_marca
      );
      const modelo = this.referencias.modelo.find(
        (m) => m.id_modelo === createEquipoDto.id_modelo
      );
      const estado_fisico = this.referencias.estadosFisico.find(
        (m) => m.id_estado_fisico === createEquipoDto.id_estado_fisico
      );
      const estado_logico = this.referencias.estadosLogico.find(
        (m) => m.id_estado_logico === createEquipoDto.id_estado_logico
      );
      const tipo_articulo = this.referencias.tiposArticulo.find(
        (m) => m.id_tipo_articulo === createEquipoDto.id_tipo_articulo
      );

      // Crear un nuevo equipo utilizando las referencias encontradas
      const newEquipo = this.equipoRepository.create({
        ...createEquipoDto,
        marca,
        modelo,
        estado_fisico,
        estado_logico,
        tipo_articulo
      });

      // Guardar el nuevo equipo en la base de datos
      return await this.equipoRepository.save(newEquipo);

    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async getCachedData() {
    return {
      marca: this.referencias.marca,
      modelo: this.referencias.modelo,
      estado_fisico: this.referencias.estadosFisico,
      estado_logico: this.referencias.estadosLogico,
      tipo_articulo: this.referencias.tiposArticulo,
    };
  }
  async findAll() {
    return await this.equipoRepository.find({
      where: {
        deleted_at: null,
      },
      relations: ['marca', 'modelo', 'estado_fisico', 'estado_logico', 'tipo_articulo']
    });
  }

  async findOne(term: string) {
    let equipo: Equipo;
    if (isUUID(term)) {
      equipo = await this.equipoRepository.findOne({
        where: {
          id_articulo: term,
        },
        relations: ['marca', 'modelo', 'estado_fisico', 'estado_logico', 'tipo_articulo']
      })
    } else {
      equipo = await this.equipoRepository.findOne({
        where: {
          cod_registro: term,
        },
        relations: ['marca', 'modelo', 'estado_fisico', 'estado_logico', 'tipo_articulo']
      })
    }
    return equipo;
  }
  async findOneById(id: string) {
    const equipo = await this.equipoRepository.findOneBy({ id_articulo: id });
    if (!equipo)
      throw new NotFoundException(`equipo con id ${id} no encontrado`);
    return equipo;
  }
  async update(id: string, updateEquipoDto: UpdateEquipoDto) {
    try {
      const { id_marca, id_modelo, id_estado_fisico, id_estado_logico, id_tipo_articulo, ...toUpdate } = updateEquipoDto;

      const equipo = await this.equipoRepository.preload({
        id_articulo: id,
        ...toUpdate,
      });

      if (!equipo)
        throw new NotFoundException(`Equipo con id ${id} no encontrado`);

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
      equipo.marca = marca;
      equipo.modelo = modelo;
      equipo.estado_fisico = estado_fisico;
      equipo.estado_logico = estado_logico;
      equipo.tipo_articulo = tipo_articulo;

      await this.equipoRepository.save(equipo);

      return this.findOne(id);
    } catch (error) {
      this.handleDBExceptions(error);

    }
  }

  remove(id: number) {
    return `This action removes a #${id} equipo`;
  }
  async softDelete(id: string) {
    const equipo = await this.findOneById(id);
    equipo.deleted_at = new Date(); // Actualiza el campo deleted_at con la fecha actual
    await this.equipoRepository.save(equipo);
    return equipo;
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
  async truncateEquipos(): Promise<void> {
    const queryRunner = this.dataSouce.createQueryRunner();
    await queryRunner.connect();
    try {
      await queryRunner.query(`TRUNCATE TABLE "equipos" RESTART IDENTITY CASCADE`)
    } catch (error) {
      this.handleDBExceptions(error);
    } finally {
      await queryRunner.release();
    }
  }

}
