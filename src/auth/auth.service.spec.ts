import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { AuthModule } from './auth.module';
import { LoginWithPasswordDto } from './dto/sigin-user.dto';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', async () => {

    jest.spyOn(service, 'login').mockImplementation((user: LoginWithPasswordDto) => {
      return Promise.resolve({token: 'token', user: 'user', id:'id'});
    });
    const result = await service.login({ email: 'gabriel.rskm@gmail.com', password: 'pass123' });
    expect(result).toHaveProperty('token');
  });
});
