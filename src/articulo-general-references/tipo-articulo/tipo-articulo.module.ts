import { Module } from '@nestjs/common';
import { TipoArticuloService } from './tipo-articulo.service';
import { TipoArticuloController } from './tipo-articulo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoArticulo } from './entities/tipo-articulo.entity';

@Module({
  controllers: [TipoArticuloController],
  providers: [TipoArticuloService],
  imports: [
    TypeOrmModule.forFeature([TipoArticulo])
  ],
  exports: [
    TipoArticuloService,

  ]
})
export class TipoArticuloModule { }
