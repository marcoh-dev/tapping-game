import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import Game from "@/components/Game";
import { getGameMode } from "@/lib/gameModes";

vi.mock("@/app/actions", () => ({ saveScore: vi.fn() }));

function advance(ms: number) {
	for (let elapsed = 0; elapsed < ms; elapsed += 100) {
		act(() => {
			vi.advanceTimersByTime(Math.min(100, ms - elapsed));
		});
	}
}

function playRound(hits: number) {
	advance(3000);

	for (let i = 0; i < hits; i++) {
		const [target] = screen.getAllByRole("button", { name: "target" });
		fireEvent.click(target!);
		advance(20);
	}

	advance(30_000);
}

describe("Game", () => {
	beforeEach(() => {
		vi.useFakeTimers();
		localStorage.clear();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it("only announces a new highscore when the previous one is beaten", () => {
		render(<Game mode={getGameMode("30s")} isSignedIn={false} initialHighscore={0} />);

		playRound(3);

		expect(screen.getByRole("heading", { name: "Game over" })).toBeInTheDocument();
		expect(screen.getByText("New Highscore!")).toBeInTheDocument();

		fireEvent.click(screen.getByRole("button", { name: "Try again" }));
		playRound(2);

		expect(screen.queryByText("New Highscore!")).not.toBeInTheDocument();
		expect(screen.getByText("Your Highscore")).toBeInTheDocument();
		expect(screen.getByText("3")).toBeInTheDocument();
	});

	it("compares the first round against the highscore from the database", () => {
		render(<Game mode={getGameMode("30s")} isSignedIn initialHighscore={10} />);

		playRound(2);

		expect(screen.queryByText("New Highscore!")).not.toBeInTheDocument();
		expect(screen.getByText("10")).toBeInTheDocument();
	});
});
