import { UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "./auth.guard";

describe("AuthGuard", () => {
	let guard: AuthGuard;
	let jwtService: jest.Mocked<Pick<JwtService, "verifyAsync">>;
	let reflector: jest.Mocked<Pick<Reflector, "getAllAndOverride">>;
	let config: jest.Mocked<Pick<ConfigService, "getOrThrow">>;

	const createMockContext = (cookies: Record<string, string> = {}) => {
		const request: any = { cookies, user: undefined };
		return {
			getHandler: jest.fn(),
			getClass: jest.fn(),
			switchToHttp: () => ({
				getRequest: () => request,
			}),
			_request: request,
		} as any;
	};

	beforeEach(() => {
		jwtService = { verifyAsync: jest.fn() };
		reflector = { getAllAndOverride: jest.fn() };
		config = { getOrThrow: jest.fn().mockReturnValue("test-secret") };

		guard = new AuthGuard(
			jwtService as unknown as JwtService,
			reflector as unknown as Reflector,
			config as unknown as ConfigService,
		);
	});

	it("should allow access to public routes", async () => {
		reflector.getAllAndOverride.mockReturnValue(true);
		const ctx = createMockContext();

		const result = await guard.canActivate(ctx);

		expect(result).toBe(true);
	});

	it("should throw UnauthorizedException if no token", async () => {
		reflector.getAllAndOverride.mockReturnValue(false);
		const ctx = createMockContext();

		await expect(guard.canActivate(ctx)).rejects.toThrow(
			UnauthorizedException,
		);
	});

	it("should set user on request for valid token", async () => {
		reflector.getAllAndOverride.mockReturnValue(false);
		const payload = { _id: "user123", name: "test" };
		jwtService.verifyAsync.mockResolvedValue(payload);

		const ctx = createMockContext({ access_token: "valid-token" });
		const result = await guard.canActivate(ctx);

		expect(result).toBe(true);
		expect(ctx._request.user).toEqual(payload);
	});

	it("should throw UnauthorizedException on invalid token", async () => {
		reflector.getAllAndOverride.mockReturnValue(false);
		jwtService.verifyAsync.mockRejectedValue(new Error("invalid"));

		const ctx = createMockContext({ access_token: "bad-token" });

		await expect(guard.canActivate(ctx)).rejects.toThrow(
			UnauthorizedException,
		);
	});
});
