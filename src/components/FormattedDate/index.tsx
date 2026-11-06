"use client";

import { useSyncExternalStore } from "react";

function subscribe() {
	return () => {};
}

type FormattedDateProps = {
	date: string | number;
};

export default function FormattedDate({ date }: FormattedDateProps) {
	const formatted = useSyncExternalStore(
		subscribe,
		() => new Date(date).toLocaleString(),
		() => null,
	);

	return <time dateTime={new Date(date).toISOString()}>{formatted}</time>;
}
