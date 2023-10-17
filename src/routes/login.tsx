import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

import {
	Error,
	Form,
	Input,
	Switcher,
	Title,
	Wrapper,
} from "../components/auth-components";
import GithubButton from "../components/github-button";

const errors = {
	"auth/wrong-password": "Wrong password.",
};

export default function Login() {
	const navigate = useNavigate();
	const [isLoading, setLoading] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const {
			target: { name, value },
		} = e;

		if (name === "email") {
			setEmail(value);
		} else if (name === "password") {
			setPassword(value);
		}
	};

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError("");
		console.log(email, password);

		if (isLoading || email === "" || password === "") return;

		try {
			setLoading(true);
			await signInWithEmailAndPassword(auth, email, password);
			navigate("/");
		} catch (err) {
			if (err instanceof FirebaseError) {
				setError(err.message);
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<Wrapper>
			<Title>Log into X</Title>
			<Form onSubmit={onSubmit}>
				<Input
					onChange={onChange}
					name="email"
					value={email}
					placeholder="Email"
					type="email"
					required
				/>
				<Input
					onChange={onChange}
					name="password"
					value={password}
					placeholder="Password"
					type="password"
					required
				/>
				<Input
					type="submit"
					value={isLoading ? "Loading..." : "Sign In"}
				/>
			</Form>
			{error !== "" ? <Error>{error}</Error> : null}
			<Switcher>
				Don't have an account?{" "}
				<Link to="/create-account">Create one &rarr;</Link>
			</Switcher>
			<GithubButton />
		</Wrapper>
	);
}
