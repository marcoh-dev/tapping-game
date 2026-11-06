import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";

import { StyledButton } from "../global/Buttons.styled";

export default function Login() {
	const { data: session } = useSession();

	return (
		<>
			{session ? (
				<StyledButton onClick={() => signOut()}>Sign out</StyledButton>
			) : (
				<StyledButton onClick={() => signIn()}>Sign in</StyledButton>
			)}
		</>
	);
}
