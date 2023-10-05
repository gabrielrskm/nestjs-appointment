import { Test, TestingModule } from '@nestjs/testing';
import { SellerService } from './seller.service';
import { SellerModule } from './seller.module';

describe('SellerService', () => {
  let service: SellerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SellerModule],
    }).compile();

    service = module.get<SellerService>(SellerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
