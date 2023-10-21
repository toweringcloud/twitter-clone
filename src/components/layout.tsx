import { Link, Outlet, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { auth } from "../firebase";

const Wrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr 4fr;
	gap: 20px;
	padding: 50px 0px;
	width: 100%;
	height: 100%;
	max-width: 860px;
`;
const Menu = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 20px;
`;
const MenuItem = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	border: 2px solid white;
	width: 50px;
	height: 50px;
	border-radius: 50%;
	cursor: pointer;
	svg {
		width: 30px;
		fill: white;
	}
	&.log-out {
		border-color: tomato;
		svg {
			fill: tomato;
		}
	}
`;

export default function Layout() {
	// svg icon resource -> https://heroicons.com -> home, user, arrow-left
	const navigate = useNavigate();
	const onLogOut = async () => {
		const ok = confirm("Are you sure you want to log out?");
		if (ok) {
			await auth.signOut();
			navigate("/login");
		} else {
			navigate("/");
		}
	};

	return (
		<Wrapper>
			<Menu>
				<Link to="/">
					<MenuItem>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							className="w-6 h-6"
						>
							<path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
							<path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
						</svg>
					</MenuItem>
				</Link>
				<Link to="/profile">
					<MenuItem>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							className="w-6 h-6"
						>
							<path
								fillRule="evenodd"
								d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
								clipRule="evenodd"
							/>
						</svg>
					</MenuItem>
				</Link>
				<Link to="/logout" onClick={onLogOut}>
					<MenuItem className="log-out">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							className="w-6 h-6"
						>
							<path
								fillRule="evenodd"
								d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm5.03 4.72a.75.75 0 010 1.06l-1.72 1.72h10.94a.75.75 0 010 1.5H10.81l1.72 1.72a.75.75 0 11-1.06 1.06l-3-3a.75.75 0 010-1.06l3-3a.75.75 0 011.06 0z"
								clipRule="evenodd"
							/>
						</svg>
					</MenuItem>
				</Link>
			</Menu>
			<Outlet />
		</Wrapper>
	);
}
