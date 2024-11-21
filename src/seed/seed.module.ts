import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { MarcaModule } from 'src/articulo-general-references/marca/marca.module';
import { ModeloModule } from 'src/articulo-general-references/modelo/modelo.module';
import { EstadoFisicoModule } from 'src/articulo-general-references/estado-fisico/estado-fisico.module';
import { EstadoLogicoModule } from 'src/articulo-general-references/estado-logico/estado-logico.module';
import { TipoArticuloModule } from 'src/articulo-general-references/tipo-articulo/tipo-articulo.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [
    MarcaModule,
    ModeloModule,
    EstadoFisicoModule,
    EstadoLogicoModule,
    TipoArticuloModule
  ]
})
export class SeedModule { }
