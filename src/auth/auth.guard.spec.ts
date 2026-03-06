import { AuthGuard } from './auth.guard';
import { JwtService } from '@nestjs/jwt';
describe('AuthGuard', () => {
  it('should be defined', () => {
    const jwtService = {} as JwtService;
    const guard = new AuthGuard(jwtService);

    expect(guard).toBeDefined();
  });
});
