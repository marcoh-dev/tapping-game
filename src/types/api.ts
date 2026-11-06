export type User = {
	_id: string;
	name: string;
	image?: string;
};

export type Score = {
	_id: string;
	userId: string;
	score: number;
	mode: string;
	isHighscore: boolean;
	createdAt: string;
	updatedAt: string;
};

export type LeaderboardScore = Score & {
	user: User;
};
