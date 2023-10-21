import { styled } from "styled-components";

import PostTweetForm from "../components/post-tweet-form";
import Timeline from "../components/timeline";

const Wrapper = styled.div`
	display: grid;
	grid-template-rows: 1fr 5fr;
	overflow-y: scroll;
	gap: 50px;
`;

export default function Home() {
	return (
		<Wrapper>
			<PostTweetForm />
			<Timeline />
		</Wrapper>
	);
}
