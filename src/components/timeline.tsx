import { useEffect, useState } from "react";
import { styled } from "styled-components";

import { db } from "../firebase";
import { Unsubscribe } from "firebase/auth";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

import Tweet from "./tweet";

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

export interface ITweet {
	photo: string;
	userId: string;
	username: string;
	createdAt: number;
}

export default function Timeline() {
	const [tweets, setTweets] = useState<ITweet[]>([]);

	useEffect(() => {
		let unsubscribe: Unsubscribe | null = null;

		const fetchTweets = async () => {
			const tweetsQuery = query(
				collection(db, "tweets"),
				orderBy("createdAt", "desc")
			);
			unsubscribe = await onSnapshot(tweetsQuery, (snapshot) => {
				const tweets = snapshot.docs.map((doc) => {
					const { tweet, createdAt, userId, username, photo } =
						doc.data();
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
			});
		};
		fetchTweets();
		return () => {
			unsubscribe && unsubscribe();
		};
	}, []);

	return (
		<Wrapper>
			{tweets.map((tweet) => (
				<Tweet key={tweet.id} {...tweet} />
			))}
		</Wrapper>
	);
}
