import { Test, TestingModule } from '@nestjs/testing';
import { ArticuloGeneralController } from './articulo-general.controller';
import { ArticuloGeneralService } from './articulo-general.service';

describe('ArticuloGeneralController', () => {
  let controller: ArticuloGeneralController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticuloGeneralController],
      providers: [ArticuloGeneralService],
    }).compile();

    controller = module.get<ArticuloGeneralController>(ArticuloGeneralController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
