import Head from "next/head";
import { styled } from "goober";
import Header from "../components/header";
import { getPostsForHome } from "../lib/api";
import Link from "next/link";
import PostGrid from "../components/post-grid";

export default function Home({ posts }) {
    return (
        <>
            <Head>
                <title>Kasper Aamodt - Founder, Developer, writer.</title>
                <meta
                    name="description"
                    content="Founder, developer and writer."
                />
            </Head>

            <Header />

            <Main>
                <div className="post-div">
                    <PostGrid posts={posts} />
                </div>
                <div style={{ textAlign: "center", paddingTop: "12px" }}>
                    <Link href="/blog" passHref>
                        <a style={{ fontWeight: "500" }}>View all</a>
                    </Link>
                </div>
            </Main>
        </>
    );
}

export async function getStaticProps() {
    const posts = await getPostsForHome();

    return {
        props: { posts: posts.edges }
    };
}

const Main = styled("div")`
    width: 100%;
    max-width: 700px;
    margin: 0 auto;
    padding: 0 15px;
    padding-bottom: 2rem;

    .post-div {
        margin-top: 4rem;
    }
`;
