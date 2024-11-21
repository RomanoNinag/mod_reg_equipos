import { Module } from '@nestjs/common';
import { ArticuloGeneralService } from './articulo-general.service';
import { ArticuloGeneralController } from './articulo-general.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticuloGeneral } from './entities/articulo-general.entity';
// import { EstadoFisico, EstadoLogico, TipoArticulo } from './entities/';
// import { EstadoFisicoArma } from './entities/estado-fisico.entity';

@Module({
  controllers: [ArticuloGeneralController],
  providers: [ArticuloGeneralService],
  imports: [
    TypeOrmModule.forFeature([ArticuloGeneral])
  ],
  exports: [
    TypeOrmModule,

  ]
})
export class ArticuloGeneralModule { }
