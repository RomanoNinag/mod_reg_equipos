import { Module } from '@nestjs/common';
import { ArmaService } from './arma.service';
import { ArmaController } from './arma.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Arma } from './entities/arma.entity';
import { ArticuloGeneralModule } from 'src/articulo-general/articulo-general.module';
import { MarcaModule } from 'src/articulo-general-references/marca/marca.module';
import { ModeloModule } from 'src/articulo-general-references/modelo/modelo.module';
import { EstadoFisicoModule } from 'src/articulo-general-references/estado-fisico/estado-fisico.module';
import { EstadoLogicoModule } from 'src/articulo-general-references/estado-logico/estado-logico.module';
import { TipoArticuloModule } from 'src/articulo-general-references/tipo-articulo/tipo-articulo.module';
@Module({
  controllers: [ArmaController],
  providers: [ArmaService],
  imports: [
    TypeOrmModule.forFeature([
      Arma
    ]),
    // EstadoModule,
    ArticuloGeneralModule,
    MarcaModule,
    ModeloModule,
    EstadoFisicoModule,
    EstadoLogicoModule,
    TipoArticuloModule
  ],
  exports: [ArmaService]
})
export class ArmaModule { }
