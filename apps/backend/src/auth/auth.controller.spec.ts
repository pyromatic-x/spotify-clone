import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

describe("AuthController", () => {
	let controller: AuthController;
	let authService: jest.Mocked<Pick<AuthService, "getSafeUser">>;
	let jwt: jest.Mocked<Pick<JwtService, "signAsync" | "verifyAsync">>;
	let config: jest.Mocked<Pick<ConfigService, "get">>;

	const mockResponse = () => {
		const res: any = {};
		res.cookie = jest.fn().mockReturnValue(res);
		res.clearCookie = jest.fn().mockReturnValue(res);
		return res;
	};

	const mockRequest = (cookies: Record<string, string> = {}) =>
		({ cookies } as any);

	beforeEach(() => {
		authService = { getSafeUser: jest.fn() };
		jwt = { signAsync: jest.fn(), verifyAsync: jest.fn() };
		config = { get: jest.fn().mockReturnValue("development") };

		controller = new AuthController(
			authService as unknown as AuthService,
			jwt as unknown as JwtService,
			config as unknown as ConfigService,
		);
	});

	describe("login", () => {
		it("should set access_token cookie and return true", async () => {
			authService.getSafeUser.mockResolvedValue("user123");
			jwt.signAsync.mockResolvedValue("jwt-token");
			const res = mockResponse();

			const result = await controller.login(
				{ name: "test", password: "pass1234" },
				res,
			);

			expect(result).toBe(true);
			expect(res.cookie).toHaveBeenCalledWith(
				"access_token",
				"jwt-token",
				expect.objectContaining({ httpOnly: true }),
			);
		});

		it("should use non-production cookie options in dev", async () => {
			authService.getSafeUser.mockResolvedValue("user123");
			jwt.signAsync.mockResolvedValue("jwt-token");
			const res = mockResponse();

			await controller.login({ name: "test", password: "pass1234" }, res);

			expect(res.cookie).toHaveBeenCalledWith(
				"access_token",
				"jwt-token",
				expect.objectContaining({
					secure: false,
					sameSite: "lax",
				}),
			);
		});

		it("should use production cookie options", async () => {
			config.get.mockReturnValue("production");
			authService.getSafeUser.mockResolvedValue("user123");
			jwt.signAsync.mockResolvedValue("jwt-token");
			const res = mockResponse();

			await controller.login({ name: "test", password: "pass1234" }, res);

			expect(res.cookie).toHaveBeenCalledWith(
				"access_token",
				"jwt-token",
				expect.objectContaining({
					secure: true,
					sameSite: "none",
				}),
			);
		});
	});

	describe("verify", () => {
		it("should return true for valid token", async () => {
			jwt.verifyAsync.mockResolvedValue({ _id: "user123" });

			const result = await controller.verify(
				mockRequest({ access_token: "valid" }),
			);

			expect(result).toBe(true);
		});

		it("should return false if no token", async () => {
			const result = await controller.verify(mockRequest());

			expect(result).toBe(false);
		});

		it("should return false on verification error", async () => {
			jwt.verifyAsync.mockRejectedValue(new Error("expired"));

			const result = await controller.verify(
				mockRequest({ access_token: "bad" }),
			);

			expect(result).toBe(false);
		});
	});

	describe("logout", () => {
		it("should clear access_token cookie and return true", async () => {
			const res = mockResponse();

			const result = await controller.logout(res);

			expect(result).toBe(true);
			expect(res.clearCookie).toHaveBeenCalledWith(
				"access_token",
				expect.objectContaining({ httpOnly: true }),
			);
		});
	});
});
