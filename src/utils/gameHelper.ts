import type { GameAreaScale, Target } from "@/types/game";

type Position = Pick<Target, "left" | "top">;
type Box = Pick<Target, "left" | "top" | "size">;

const MAX_PLACEMENT_ATTEMPTS = 1000;

export function getScale(width: number, height: number): GameAreaScale {
	const unit = Math.min(width, height);

	return {
		gap: unit * 0.05,
		minSize: unit * 0.1,
		maxSize: unit * 0.25,
	};
}

export function random(min: number, max: number): number {
	return Math.random() * (max - min) + min;
}

export function isOverlapping(a: Box, b: Box, gap: number): boolean {
	return !(
		a.left + a.size + gap < b.left ||
		a.left > b.left + b.size + gap ||
		a.top + a.size + gap < b.top ||
		a.top > b.top + b.size + gap
	);
}

function buildTarget(scale: GameAreaScale, getPosition: (size: number) => Position): Target {
	const size = random(scale.minSize, scale.maxSize);

	return {
		id: crypto.randomUUID(),
		...getPosition(size),
		size,
		removing: true,
	};
}

function placeTarget(
	existingTargets: Box[],
	scale: GameAreaScale,
	getPosition: (size: number) => Position,
): Target {
	let target = buildTarget(scale, getPosition);

	for (
		let attempt = 1;
		attempt < MAX_PLACEMENT_ATTEMPTS &&
		existingTargets.some((existing) => isOverlapping(target, existing, scale.gap));
		attempt++
	) {
		target = buildTarget(scale, getPosition);
	}

	return target;
}

export function createTarget(
	existingTargets: Box[],
	gameAreaWidth: number,
	gameAreaHeight: number,
	gameAreaScale: GameAreaScale,
): Target {
	return placeTarget(existingTargets, gameAreaScale, (size) => ({
		left: random(0, gameAreaWidth - size),
		top: random(0, gameAreaHeight - size),
	}));
}

export function createFixedPositionTarget(
	existingTargets: Box[],
	gameAreaWidth: number,
	gameAreaHeight: number,
	gameAreaScale: GameAreaScale,
	positionInPercent: Position,
): Target {
	return placeTarget(existingTargets, gameAreaScale, () => ({
		left: (gameAreaWidth / 100) * positionInPercent.left,
		top: (gameAreaHeight / 100) * positionInPercent.top,
	}));
}
