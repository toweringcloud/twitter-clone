import { styled } from "styled-components";

export const Wrapper = styled.div`
	height: 100%;
	width: 420px;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 50px 0px;
`;

export const Title = styled.h1`
	font-size: 42px;
`;

export const Form = styled.form`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 10px;
	margin-top: 50px;
	margin-bottom: 10px;
`;

export const Input = styled.input`
	font-size: 16px;
	width: 100%;
	padding: 10px 20px;
	border-radius: 50px;
	border: none;
	&[type="submit"] {
		background-color: #CED46A;
		cursor: pointer;
		&:hover {
			opacity: 0.8;
		}
	}
`;

export const Error = styled.span`
	font-weight: 600;
	color: tomato;
`;

export const Switcher = styled.span`
	margin-top: 20px;
	a {
		color: #1d9bf0;
	}
`;
