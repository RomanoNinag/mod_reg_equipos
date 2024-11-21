import { Module } from '@nestjs/common';
import { EstadoFisicoService } from './estado-fisico.service';
import { EstadoFisicoController } from './estado-fisico.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstadoFisico } from './entities/estado-fisico.entity';

@Module({
  controllers: [EstadoFisicoController],
  providers: [EstadoFisicoService],
  imports: [
    TypeOrmModule.forFeature([EstadoFisico])
  ],
  exports: [
    EstadoFisicoService,
  ]
})
export class EstadoFisicoModule { }
