import { Test, TestingModule } from '@nestjs/testing';
import { ArticuloGeneralService } from './articulo-general.service';

describe('ArticuloGeneralService', () => {
  let service: ArticuloGeneralService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArticuloGeneralService],
    }).compile();

    service = module.get<ArticuloGeneralService>(ArticuloGeneralService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
