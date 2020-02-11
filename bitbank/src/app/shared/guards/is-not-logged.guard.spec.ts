import { IsNotLoggedGuard } from './is-not-logged.guard';

class MockRouter {
  navigate(path) {}
}

describe('IsNotLoggedGuard', () => {
  describe('canActivate', () => {
    let isLoggedGuard: IsNotLoggedGuard;
    let authService;
    let router;

    it('should return true for is not a logged in user', () => {
      authService = { isLogged: () => true };
      router = new MockRouter();
      isLoggedGuard = new IsNotLoggedGuard(authService, router);

      expect(isLoggedGuard.canActivate()).toEqual(false);
    });

    it('should navigate to extract for a logged out user', () => {
      authService = { isLogged: () => true };
      router = new MockRouter();
      isLoggedGuard = new IsNotLoggedGuard(authService, router);
      spyOn(router, 'navigate');
      expect(isLoggedGuard.canActivate()).toEqual(false);
      expect(router.navigate).toHaveBeenCalledWith(['extrato']);
    });
  });
});
