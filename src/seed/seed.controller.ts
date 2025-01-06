import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SeedService } from './seed.service';
import { CreateSeedDto } from './dto/create-seed.dto';
import { UpdateSeedDto } from './dto/update-seed.dto';
import { MessagePattern } from '@nestjs/microservices';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) { }

  @Get()
  @MessagePattern('seed.articulo')
  executedSeed() {
    return this.seedService.runSeedRelaciones();
  }
}
