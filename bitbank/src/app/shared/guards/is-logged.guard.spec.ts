import { IsLoggedGuard } from './is-logged.guard';

class MockRouter {
  navigate(path) {}
}

describe('IsLoggedGuard', () => {
  describe('canActivate', () => {
    let isLoggedGuard: IsLoggedGuard;
    let authService;
    let router;

    it('should return true for a logged in user', () => {
      authService = { isLogged: () => true };
      router = new MockRouter();
      isLoggedGuard = new IsLoggedGuard(authService, router);

      expect(isLoggedGuard.canActivate()).toEqual(true);
    });

    it('should navigate to home for a logged out user', () => {
      authService = { isLogged: () => false };
      router = new MockRouter();
      isLoggedGuard = new IsLoggedGuard(authService, router);
      spyOn(router, 'navigate');
      expect(isLoggedGuard.canActivate()).toEqual(false);
      expect(router.navigate).toHaveBeenCalledWith(['login']);
    });
  });
});
