import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";

const Button = styled.span`
	background-color: white;
	color: black;
	font-weight: 600;
	margin-top: 50px;
	padding: 10px 20px;
	border-radius: 50px;
	border: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 5px;
	cursor: pointer;
`;

const Logo = styled.img`
	height: 25px;
`;

export default function GithubButton() {
	const navigate = useNavigate();
	const onClick = async () => {
		try {
			const provider = new GithubAuthProvider();
			await signInWithPopup(auth, provider);
			navigate("/");
		} catch (ex) {
			console.log(ex);
		}
	};
	return (
		<Button onClick={onClick}>
			<Logo src="/github-logo.svg" />
			Continue with Github
		</Button>
	);
}
