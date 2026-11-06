export type GameMode = {
	id: string;
	name: string;
	description: string;
	time: number;
	points: number;
	type: "time" | "points";
	order: number;
	disabled?: boolean;
};

export type Target = {
	id: string;
	left: number;
	top: number;
	size: number;
	removing: boolean;
};

export type GameAreaScale = {
	gap: number;
	minSize: number;
	maxSize: number;
};

export type LocalScoreEntry = {
	score: number;
	mode: string;
	timestamp: number;
	isHighscore: boolean;
};
