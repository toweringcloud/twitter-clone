import { styled } from "styled-components";

import { auth, db, storage } from "../firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";

import { ITweet } from "./timeline";

const Wrapper = styled.div`
	display: grid;
	grid-template-columns: 3fr 1fr;
	padding: 20px;
	border: 1px solid rgba(255, 255, 255, 0.5);
	border-radius: 15px;
`;
const Column = styled.div``;
const Username = styled.span`
	font-size: 18px;
	font-weight: 600;
`;
const Payload = styled.p`
	font-size: 18px;
	margin: 10px 0px;
`;
const Photo = styled.img`
	width: 100px;
	height: 100px;
	border-radius: 15px;
`;
const DeleteButton = styled.button`
	font-size: 12px;
	font-weight: 600;
	color: white;
	background-color: tomato;
	border: 0;
	border-radius: 5px;
	padding: 5px 10px;
	text-transform: uppercase;
	cursor: pointer;
`;

export default function Tweet({ id, userId, username, photo, tweet }: ITweet) {
	const user = auth.currentUser;

	const onDelete = async () => {
		const ok = confirm("Are you sure you want to delete this tweet?");
		if (!ok || user?.uid !== userId) return;

		try {
			await deleteDoc(doc(db, "tweets", id));
			if (photo) {
				const photoRef = ref(storage, `tweets/${user.uid}/${id}}`);
				await deleteObject(photoRef);
			}
		} catch (ex) {
			console.log(ex);
		}
	};

	return (
		<Wrapper>
			<Column>
				<Username>{username}</Username>
				<Payload>{tweet}</Payload>
				{user?.uid === userId ? (
					<DeleteButton onClick={onDelete}>Delete</DeleteButton>
				) : null}
			</Column>
			{photo ? (
				<Column>
					<Photo src={photo}></Photo>
				</Column>
			) : null}
		</Wrapper>
	);
}
