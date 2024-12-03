import { Inject, Injectable } from '@nestjs/common';
import { CreateSeedDto } from './dto/create-seed.dto';
import { UpdateSeedDto } from './dto/update-seed.dto';
import { initialData } from './data/seed-data';
import { MarcaService } from 'src/articulo-general-references/marca/marca.service';
import { ModeloService } from 'src/articulo-general-references/modelo/modelo.service';
import { EstadoFisicoService } from 'src/articulo-general-references/estado-fisico/estado-fisico.service';
import { EstadoLogicoService } from 'src/articulo-general-references/estado-logico/estado-logico.service';
import { TipoArticuloService } from 'src/articulo-general-references/tipo-articulo/tipo-articulo.service';
import { ArmaService } from 'src/arma/arma.service';
import { EquipoService } from 'src/equipo/equipo.service';

@Injectable()
export class SeedService {
  constructor(
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
    @Inject()
    private readonly armaService: ArmaService,
    @Inject()
    private readonly equipoService: EquipoService,
  ) { }
  async runSeedRelaciones() {
    //elimina las tablas de armas y equipos
    await this.deleteArmas();
    await this.deleteEquipos();
    //eliminamos las tablas de relaciones
    await this.deleteRelTables();
    //insertamos los datos referencias
    await this.insertMarcas();
    await this.insertModelos();
    await this.insertEstadosFisicos();
    await this.insertEstadosLogicos();
    await this.insertTiposArticulos();
    //insertamos los datos de armas y equipos
    await this.insertArmas();
    await this.insertEquipos();
  }

  private async deleteRelTables() {
    // await this.marcaService.deleteAllMarcas();
    // await this.modeloService.deleteAllModelos();
    await this.marcaService.truncateMarcas();
    await this.modeloService.truncateModelos();
    await this.estadoFisicoService.truncateEstadosFisicos();
    await this.estadoLogicoService.truncateEstadosLogicos();
    await this.tiposArticuloService.truncateTiposArticulos();

  }

  private async deleteArmas() {
    await this.armaService.truncateArmas();
  }
  private async deleteEquipos() {
    await this.equipoService.truncateEquipos();
  }

  private async insertDataSequentially<T>(data: T[], service: { create: (item: T) => Promise<any> }) {
    for (const item of data) {
      await service.create(item);
    }
    return true;
  }

  private async insertMarcas() {
    return this.insertDataSequentially(initialData.marcas, this.marcaService);
  }

  private async insertModelos() {
    return this.insertDataSequentially(initialData.modelos, this.modeloService);
  }

  private async insertEstadosFisicos() {
    return this.insertDataSequentially(initialData.estadosFisicos, this.estadoFisicoService);
  }

  private async insertEstadosLogicos() {
    return this.insertDataSequentially(initialData.estadosLogicos, this.estadoLogicoService);
  }

  private async insertTiposArticulos() {
    return this.insertDataSequentially(initialData.tiposArticulo, this.tiposArticuloService);
  }

  private async insertArmas() {
    return this.insertDataSequentially(initialData.armas, this.armaService);
  }

  private async insertEquipos() {
    return this.insertDataSequentially(initialData.equipos, this.equipoService);
  }

}
