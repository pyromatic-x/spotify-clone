import { randomInt } from "node:crypto";
import { BadRequestException } from "@nestjs/common";
import mongoose, { isValidObjectId } from "mongoose";

export function shuffleArray<T>(array: Array<T>): void {
	for (let i = array.length - 1; i >= 0; i--) {
		const j = randomInt(i + 1);
		[array[i], array[j]] = [array[j], array[i]];
	}
}

export function toObjectId(id: string) {
	if (!isValidObjectId(id)) {
		throw new BadRequestException(`Invalid ObjectId: ${id}`);
	}

	return new mongoose.Types.ObjectId(
		id,
	) as unknown as mongoose.Schema.Types.ObjectId;
}

export function escapeRegex(str: string): string {
	return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function generatePassword(length = 12) {
	const lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
	const upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	const numbers = "0123456789";
	const specialCharacters = "!@#$%^&*";
	const allChars =
		lowerCaseLetters + upperCaseLetters + numbers + specialCharacters;

	let password = "";

	password += lowerCaseLetters.charAt(randomInt(lowerCaseLetters.length));
	password += upperCaseLetters.charAt(randomInt(upperCaseLetters.length));
	password += numbers.charAt(randomInt(numbers.length));
	password += specialCharacters.charAt(randomInt(specialCharacters.length));

	while (password.length < length) {
		password += allChars.charAt(randomInt(allChars.length));
	}

	return password;
}
