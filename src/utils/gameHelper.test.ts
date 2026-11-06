import { describe, expect, it } from "vitest";

import {
	createFixedPositionTarget,
	createTarget,
	getScale,
	isOverlapping,
} from "@/utils/gameHelper";

describe("getScale", () => {
	it("derives gap and target sizes from the shorter side", () => {
		expect(getScale(400, 200)).toEqual({ gap: 10, minSize: 20, maxSize: 50 });
	});
});

describe("isOverlapping", () => {
	const target = { left: 0, top: 0, size: 10 };

	it("detects targets that touch within the gap", () => {
		expect(isOverlapping(target, { left: 12, top: 0, size: 10 }, 5)).toBe(true);
	});

	it("allows targets that are further apart than the gap", () => {
		expect(isOverlapping(target, { left: 20, top: 20, size: 10 }, 5)).toBe(false);
	});
});

describe("createTarget", () => {
	const scale = getScale(500, 500);

	it("creates a target inside the game area with a size within the scale", () => {
		for (let i = 0; i < 50; i++) {
			const target = createTarget([], 500, 500, scale);

			expect(target.size).toBeGreaterThanOrEqual(scale.minSize);
			expect(target.size).toBeLessThanOrEqual(scale.maxSize);
			expect(target.left).toBeGreaterThanOrEqual(0);
			expect(target.top).toBeGreaterThanOrEqual(0);
			expect(target.left + target.size).toBeLessThanOrEqual(500);
			expect(target.top + target.size).toBeLessThanOrEqual(500);
			expect(target.removing).toBe(true);
		}
	});

	it("does not overlap existing targets when there is room", () => {
		const existingTarget = createTarget([], 500, 500, scale);

		for (let i = 0; i < 50; i++) {
			const target = createTarget([existingTarget], 500, 500, scale);

			expect(isOverlapping(target, existingTarget, scale.gap)).toBe(false);
		}
	});
});

describe("createFixedPositionTarget", () => {
	it("places the target at the given percentage of the game area", () => {
		const target = createFixedPositionTarget([], 400, 200, getScale(400, 200), {
			top: 50,
			left: 25,
		});

		expect(target.left).toBe(100);
		expect(target.top).toBe(100);
	});
});
