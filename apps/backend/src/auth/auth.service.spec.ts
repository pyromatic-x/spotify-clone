import { UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { UserService } from "src/user/user.service";
import { AuthService } from "./auth.service";

jest.mock("bcryptjs");

describe("AuthService", () => {
	let service: AuthService;
	let users: jest.Mocked<Pick<UserService, "findOne">>;
	let jwt: jest.Mocked<Pick<JwtService, "verifyAsync">>;
	let config: jest.Mocked<Pick<ConfigService, "getOrThrow">>;

	beforeEach(() => {
		users = { findOne: jest.fn() };
		jwt = { verifyAsync: jest.fn() };
		config = { getOrThrow: jest.fn().mockReturnValue("test-secret") };

		service = new AuthService(
			users as unknown as UserService,
			jwt as unknown as JwtService,
			config as unknown as ConfigService,
		);
	});

	describe("getSafeUser", () => {
		it("should return user id on valid credentials", async () => {
			const mockUser = { _id: "user123", password: "hashed" };
			users.findOne.mockResolvedValue(mockUser as any);
			(bcrypt.compare as jest.Mock).mockResolvedValue(true);

			const result = await service.getSafeUser({
				name: "test",
				password: "pass",
			});

			expect(result).toBe("user123");
			expect(users.findOne).toHaveBeenCalledWith(
				{ name: "test" },
				{ withPassword: true },
			);
		});

		it("should throw UnauthorizedException if user not found", async () => {
			users.findOne.mockRejectedValue(new Error("not found"));

			await expect(
				service.getSafeUser({ name: "test", password: "pass" }),
			).rejects.toThrow(UnauthorizedException);
		});

		it("should throw UnauthorizedException if password is missing", async () => {
			users.findOne.mockResolvedValue({ _id: "user123" } as any);

			await expect(
				service.getSafeUser({ name: "test", password: "pass" }),
			).rejects.toThrow(UnauthorizedException);
		});

		it("should throw UnauthorizedException if password does not match", async () => {
			users.findOne.mockResolvedValue({
				_id: "user123",
				password: "hashed",
			} as any);
			(bcrypt.compare as jest.Mock).mockResolvedValue(false);

			await expect(
				service.getSafeUser({ name: "test", password: "wrong" }),
			).rejects.toThrow(UnauthorizedException);
		});
	});

	describe("verify", () => {
		it("should verify token and return payload", async () => {
			const payload = { _id: "user123", name: "test" };
			jwt.verifyAsync.mockResolvedValue(payload);

			const result = await service.verify("valid-token");

			expect(result).toEqual(payload);
			expect(jwt.verifyAsync).toHaveBeenCalledWith("valid-token", {
				secret: "test-secret",
			});
		});

		it("should throw on invalid token", async () => {
			jwt.verifyAsync.mockRejectedValue(new Error("invalid token"));

			await expect(service.verify("bad-token")).rejects.toThrow();
		});
	});
});
