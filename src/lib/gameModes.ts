import type { GameMode } from "@/types/game";

const DEFAULT_GAME_MODE: GameMode = {
	id: "30s",
	name: "30 Seconds",
	description: "Get as many points as possible before the 30 second timer runs out",
	time: 30,
	points: 0,
	type: "time",
	order: 1,
};

export const GAME_MODES: GameMode[] = [
	DEFAULT_GAME_MODE,
	{
		id: "60s",
		name: "1 Minute",
		description: "Get as many points as possible before the 60 second timer runs out",
		time: 60,
		points: 0,
		type: "time",
		order: 2,
	},
	{
		id: "100pts",
		name: "100 Points",
		description: "Get to 100 points as fast as possible",
		time: 0,
		points: 100,
		type: "points",
		order: 3,
		disabled: true,
	},
];

export const ACTIVE_GAME_MODES = GAME_MODES.filter((mode) => !mode.disabled).sort(
	(a, b) => a.order - b.order,
);

export function getGameMode(id: string | string[] | undefined): GameMode {
	return GAME_MODES.find((mode) => mode.id === id) ?? DEFAULT_GAME_MODE;
}
