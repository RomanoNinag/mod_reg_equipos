import { Module } from '@nestjs/common';
import { EquipoService } from './equipo.service';
import { EquipoController } from './equipo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Equipo } from './entities/equipo.entity';
import { ArticuloGeneralModule } from 'src/articulo-general/articulo-general.module';
import { EstadoFisicoModule, EstadoLogicoModule, MarcaModule, ModeloModule, TipoArticuloModule } from 'src/articulo-general-references';

@Module({
  controllers: [EquipoController],
  providers: [EquipoService],
  imports: [
    TypeOrmModule.forFeature([Equipo]),
    ArticuloGeneralModule,
    MarcaModule,
    ModeloModule,
    EstadoFisicoModule,
    EstadoLogicoModule,
    TipoArticuloModule
  ],
  exports: [
    EquipoService,
  ]
})
export class EquipoModule { }
