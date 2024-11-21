import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { ArmaModule } from './arma/arma.module';
import { ArticuloGeneralModule } from './articulo-general/articulo-general.module';
import { SeedModule } from './seed/seed.module';
import { EstadoFisicoModule } from './articulo-general-references/estado-fisico/estado-fisico.module';
import { EstadoLogicoModule } from './articulo-general-references/estado-logico/estado-logico.module';
import { TipoArticuloModule } from './articulo-general-references/tipo-articulo/tipo-articulo.module';
import { MarcaModule } from './articulo-general-references/marca/marca.module';
import { ModeloModule } from './articulo-general-references/modelo/modelo.module';
import { EquipoModule } from './equipo/equipo.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
    }),
    MarcaModule,
    ModeloModule,
    ArmaModule,
    ArticuloGeneralModule,
    SeedModule,
    EstadoFisicoModule,
    EstadoLogicoModule,
    TipoArticuloModule,
    EquipoModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
