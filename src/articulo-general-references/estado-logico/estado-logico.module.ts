import { Module } from '@nestjs/common';
import { EstadoLogicoService } from './estado-logico.service';
import { EstadoLogicoController } from './estado-logico.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstadoLogico } from './entities/estado-logico.entity';

@Module({
  controllers: [EstadoLogicoController],
  providers: [EstadoLogicoService],
  imports: [
    TypeOrmModule.forFeature([EstadoLogico])
  ],
  exports: [
    EstadoLogicoService,
  ]
})
export class EstadoLogicoModule { }
