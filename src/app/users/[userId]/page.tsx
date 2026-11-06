import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
	StyledBackLink,
	StyledTextpageHeader,
	StyledTextpageSection,
} from "@/components/global/Global.styled";
import {
	StyledProfileActions,
	StyledProfileDataImage,
	StyledProfileDataWrap,
} from "@/components/global/Profile.styled";
import ProfileRecords from "@/components/ProfileRecords";
import SignOutButton from "@/components/SignOutButton";
import { getSession } from "@/lib/auth";
import { getLeaderboardScores, getUser } from "@/lib/scores";

export const metadata: Metadata = {
	title: "Profile page",
};

async function loadProfile(userId: string) {
	try {
		const [user, scores] = await Promise.all([getUser(userId), getLeaderboardScores()]);
		return { user, scores };
	} catch (error) {
		console.error(error);
		return null;
	}
}

export default async function ProfilePage({ params, searchParams }: PageProps<"/users/[userId]">) {
	const { userId } = await params;
	const { back } = await searchParams;
	const [profile, session] = await Promise.all([loadProfile(userId), getSession()]);
	const isOwnProfile = session?.user.id === userId;

	if (profile && !profile.user) {
		notFound();
	}

	return (
		<>
			<StyledTextpageHeader>
				<StyledBackLink href={back === "home" ? "/" : "/leaderboards"}>&lt;</StyledBackLink>
				<h1>Profile</h1>
			</StyledTextpageHeader>
			<main>
				{profile?.user ? (
					<>
						<StyledTextpageSection>
							<StyledProfileDataWrap>
								{profile.user.image && (
									<StyledProfileDataImage
										loading="eager"
										width={100}
										height={100}
										src={profile.user.image}
										alt=""
									/>
								)}
								<h2>{profile.user.name}</h2>
								{isOwnProfile && (
									<StyledProfileActions>
										<SignOutButton />
									</StyledProfileActions>
								)}
							</StyledProfileDataWrap>
						</StyledTextpageSection>
						<ProfileRecords userId={userId} scores={profile.scores} />
					</>
				) : (
					<StyledTextpageSection>
						<p>User data could not be loaded.</p>
					</StyledTextpageSection>
				)}
			</main>
		</>
	);
}
