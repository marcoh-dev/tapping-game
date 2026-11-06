import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
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
