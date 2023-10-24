import { useEffect, useState } from "react";
import { styled } from "styled-components";

import { auth, db, storage } from "../firebase";
import { updateProfile } from "firebase/auth";
import {
	collection,
	getDocs,
	limit,
	orderBy,
	query,
	where,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { ITweet } from "../components/timeline";
import Tweet from "../components/tweet";

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 20px;
`;
const AvatarUpload = styled.label`
	width: 80px;
	height: 80px;
	overflow: hidden;
	border-radius: 50%;
	background-color: #07553b;
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;
	svg {
		width: 50px;
	}
`;
const AvatarImg = styled.img`
	width: 100%;
`;
const AvatarInput = styled.input`
	display: none;
`;
const Name = styled.span`
	font-size: 22px;
`;
const Tweets = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

export default function Profile() {
	const user = auth.currentUser;
	const [avatar, setAvatar] = useState(user?.photoURL);
	const [tweets, setTweets] = useState<ITweet[]>([]);

	const onAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const { files } = e.target;
		if (files && files.length === 1) {
			const file = files[0];
			if (file.size <= 1024 * 1024) {
				const locationRef = ref(storage, `avatars/${user?.uid}`);
				const result = await uploadBytes(locationRef, file);
				const avatarUrl = await getDownloadURL(result.ref);
				setAvatar(avatarUrl);
				await updateProfile(user, { photoURL: avatarUrl });
			} else {
				console.log(`file size more than 1MB : ${file.size}`);
			}
		}
	};
	const fetchTweets = async () => {
		const tweetsQuery = query(
			collection(db, "tweets"),
			where("userId", "==", user?.uid),
			orderBy("createdAt", "desc"),
			limit(25)
		);
		const snapshot = await getDocs(tweetsQuery);
		const tweets = snapshot.docs.map((doc) => {
			const { tweet, createdAt, userId, username, photo } = doc.data();
			return {
				tweet,
				createdAt,
				userId,
				username,
				photo,
				id: doc.id,
			};
		});
		setTweets(tweets);
	};
	useEffect(() => {
		fetchTweets();
	}, []);

	// FirebaseError: The query requires an index. You can create it here: https://console.firebase.google.com/v1/r/project/nwitter-reloaded-6f54d/firestore/indexes?create_composite=ClVwcm9qZWN0cy9ud2l0dGVyLXJlbG9hZGVkLTZmNTRkL2RhdGFiYXNlcy8oZGVmYXVsdCkvY29sbGVjdGlvbkdyb3Vwcy90d2VldHMvaW5kZXhlcy9fEAEaCgoGdXNlcklkEAEaDQoJY3JlYXRlZEF0EAIaDAoIX19uYW1lX18QAg
	// Go to fibase console url and create or update index to recommend

	return (
		<Wrapper>
			<AvatarUpload htmlFor="avatar">
				{Boolean(avatar) ? (
					<AvatarImg src={avatar} />
				) : (
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
				)}
			</AvatarUpload>
			<AvatarInput
				onChange={onAvatarChange}
				id="avatar"
				type="file"
				accept="image/*"
			/>
			<Name>{user?.displayName ?? "Anonymous"}</Name>
			<Tweets>
				{tweets.map((tweet) => (
					<Tweet key={tweet.id} {...tweet} />
				))}
			</Tweets>
		</Wrapper>
	);
}
