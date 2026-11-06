"use client";

import { signOut } from "next-auth/react";

import { StyledButton } from "@/components/global/Buttons.styled";

export default function SignOutButton() {
	return <StyledButton onClick={() => signOut({ callbackUrl: "/" })}>Sign out</StyledButton>;
}
