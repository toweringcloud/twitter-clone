import { useState } from "react";
import { styled } from "styled-components";

import { auth, db, storage } from "../firebase";
import { addDoc, collection, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const Form = styled.form`
	display: flex;
	flex-direction: column;
	gap: 10px;
`;
const TextArea = styled.textarea`
	font-size: 16px;
	color: #CED46A;
	background-color: #07553B;
	padding: 20px;
	border: 2px solid #CED46A;
	border-radius: 20px;
	width: 100%;
	resize: none;
	&:focus {
		outline: none;
		color: white;
		border-color: white;
	}
	&::placeholder {
		font-size: 16px;
		font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
			Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
			sans-serif;
	}
`;
const AttachFileButton = styled.label`
	font-size: 14px;
	font-weight: 600;
	color: #CED46A;
	background-color: #07553B;
	padding: 10px 0px;
	text-align: center;
	border: 1px solid #CED46A;
	border-radius: 20px;
	cursor: pointer;
`;
const AttachFileInput = styled.input`
	display: none;
`;
const SubmitButton = styled.input`
	font-size: 16px;
	color: #07553B;
	background-color: #CED46A;
	padding: 10px 0px;
	text-align: center;
	border: none;
	border-radius: 20px;
	cursor: pointer;
	&:hover,
	&:active {
		opacity: 0.8;
	}
`;

export default function PostTweetForm() {
	const [isLoading, setLoading] = useState(false);
	const [tweet, setTweet] = useState("");
	const [file, setFile] = useState<File | null>(null);

	const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setTweet(e.target.value);
	};
	const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { files } = e.target;
		if (files && files.length === 1) {
			setFile(files[0]);
		}
	};
	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const user = auth.currentUser;
		if (isLoading || tweet === "" || tweet.length > 180) return;

		try {
			setLoading(true);
			const doc = await addDoc(collection(db, "tweets"), {
				tweet,
				createdAt: Date.now(),
				username: user?.displayName || "Anonymous",
				userId: user?.uid || "guest",
			});
			if (file) {
				//-check size of file to upload
				if (file.size <= 1024 * 1024) {
					const locationRef = ref(
						storage,
						`tweets/${user?.uid || "guest"}/${doc.id}}`
					);
					const reFileUp = await uploadBytes(locationRef, file);
					const fileLink = await getDownloadURL(reFileUp.ref);
					await updateDoc(doc, { photo: fileLink });
				} else {
					console.log(`file size more than 1MB : ${file.size}`);
				}
			}
			setTweet("");
			setFile(null);
		} catch (ex) {
			console.log(ex);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Form onSubmit={onSubmit}>
			<TextArea
				required
				value={tweet}
				onChange={onChange}
				rows={5}
				maxLength={180}
				placeholder="What is happening?!"
			/>
			<AttachFileButton htmlFor="file">
				{file ? "Photo added ✅" : "Add Photo"}
			</AttachFileButton>
			<AttachFileInput
				type="file"
				id="file"
				onChange={onFileChange}
				accept="image/*"
			/>
			<SubmitButton
				type="submit"
				value={isLoading ? "Posting..." : "Post Tweet"}
			/>
		</Form>
	);
}
