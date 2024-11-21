import { Module } from '@nestjs/common';
import { ModeloService } from './modelo.service';
import { ModeloController } from './modelo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Modelo } from './entities/modelo.entity';

@Module({
  controllers: [ModeloController],
  providers: [ModeloService],
  imports: [
    TypeOrmModule.forFeature([Modelo])
  ],
  exports: [
    ModeloService,

  ]
})
export class ModeloModule { }
