import { Inject, Injectable } from '@nestjs/common';
import { CreateSeedDto } from './dto/create-seed.dto';
import { UpdateSeedDto } from './dto/update-seed.dto';
import { initialData } from './data/seed-data';
import { MarcaService } from 'src/articulo-general-references/marca/marca.service';
import { ModeloService } from 'src/articulo-general-references/modelo/modelo.service';
import { EstadoFisicoService } from 'src/articulo-general-references/estado-fisico/estado-fisico.service';
import { EstadoLogicoService } from 'src/articulo-general-references/estado-logico/estado-logico.service';
import { TipoArticuloService } from 'src/articulo-general-references/tipo-articulo/tipo-articulo.service';

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
  ) { }
  async runSeedRelaciones() {
    await this.deleteRelTables();
    await this.insertMarcas();
    await this.insertModelos();
    await this.insertEstadosFisicos();
    await this.insertEstadosLogicos();
    await this.insertTiposArticulos();
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

  // private async insertMarcas() {
  //   const marcas = initialData.marcas;

  //   const inserPromises = [];

  //   marcas.forEach(marca => {
  //     inserPromises.push(this.marcaService.create(marca));
  //   });
  //   //esperamos la insercion
  //   await Promise.all(inserPromises);

  //   return true;
  // }
  // private async insertModelos() {
  //   const modelos = initialData.modelos;

  //   const inserPromises = [];

  //   modelos.forEach(modelo => {
  //     inserPromises.push(this.modeloService.create(modelo));
  //   });
  //   //esperamos la insercion
  //   await Promise.all(inserPromises);

  //   return true;
  // }
  // private async insertEstadosFisicos() {
  //   const estadosFisicos = initialData.estadosFisicos;

  //   const inserPromises = [];

  //   estadosFisicos.forEach(estadoFisico => {
  //     inserPromises.push(this.estadoFisicoService.create(estadoFisico));
  //   });
  //   //esperamos la insercion
  //   await Promise.all(inserPromises);

  //   return true;
  // }
  // private async insertEstadosLogicos() {
  //   const estadosLogicos = initialData.estadosLogicos;

  //   for (const estadoLogico of estadosLogicos) {
  //     await this.estadoLogicoService.create(estadoLogico); // Espera a que cada inserción se complete antes de continuar
  //   }
  //   return true;
  // }
}
