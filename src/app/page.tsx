import Header from "@/components/Header";
import HomeMenu from "@/components/HomeMenu";
import { getSession } from "@/lib/auth";

export default async function HomePage() {
	const session = await getSession();

	return (
		<>
			<Header />
			<main>
				<HomeMenu userId={session?.user.id} />
			</main>
		</>
	);
}
