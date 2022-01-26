import Head from "next/head";
import { styled } from "goober";
import Header from "../components/header";
import { getAllPosts } from "../lib/api";
import Link from "next/link";
import PostGrid from "../components/post-grid";
import { formatDate } from "../utils/functions";
import Image from "next/image";

export default function Home({ posts }) {
    const featured = posts[0];
    const morePosts = [];
    var count = 1;
    posts?.map((post, index) => {
        count > 4 || (index === count && (morePosts.push(post), count++));
    });
    var count2 = 5
    const evenMorePosts = [];
    posts?.map((post, index) => {
        count2 > 1000 || index === count2 && (evenMorePosts.push(post), count2 ++ );
    })
    return (
        <>
            <Head>
                <title>Brainify blogg</title>
                <meta
                    name="description"
                    content="Brainify blogg"
                />
            </Head>

            <Header />

            <Main>
                <div className="grid">
                    <Card key={featured.node.slug}>
                        {featured.node.featuredImage && (
                            <Image
                                src={featured.node.featuredImage.node.sourceUrl}
                                height={
                                    featured.node.featuredImage.node
                                        .mediaDetails.height
                                }
                                width={
                                    featured.node.featuredImage.node
                                        .mediaDetails.width
                                }
                                alt="Hero image"
                                priority
                            />
                        )}
                        <h2>{featured.node.title}</h2>
                        <span>{formatDate(featured.node.date)}</span>
                        <Link href={`/blog/` + featured.node.slug} passHref>
                            <a aria-label={featured.node.title}></a>
                        </Link>
                    </Card>
                    <div>
                        {morePosts.map(({ node }) => {
                            return (
                                <CardAlt key={node.slug}>
                                    {node.featuredImage && (
                                        <Image
                                            src={
                                                node.featuredImage.node
                                                    .sourceUrl
                                            }
                                            height={100}
                                            width={150}
                                            alt="Hero image"
                                            priority
                                        />
                                    )}
                                    <div>
                                        <h2> {node.title}</h2>
                                        <span>{formatDate(node.date)}</span>
                                    </div>
                                    <Link href={`/blog/` + node.slug} passHref>
                                        <a aria-label={node.title}></a>
                                    </Link>
                                </CardAlt>
                            );
                        })}
                    </div>
                </div>
                <div>
                    <PostGrid posts={evenMorePosts} />
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
    const posts = await getAllPosts();

    return {
        props: { posts: posts.edges }
    };
}

const Main = styled("div")`
    width: 100%;
    max-width: 1122px;
    margin: 0 auto;
    padding: 0 15px;
    padding-bottom: 2rem;

    .grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 24px;
    }
`;

const Card = styled("div")`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    position: relative;

    a {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 0;
        opacity: 0;
        height: 100%;
        width: 100%;
        text-decoration: none;
    }

    img {
        border-radius: 5px;
    }
`;

const CardAlt = styled("div")`
    display: grid;
    grid-template-columns: 150px auto;
    position: relative;
    gap: 10px;
    margin-bottom: 24px;

    a {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 0;
        opacity: 0;
        height: 100%;
        width: 100%;
        text-decoration: none;
    }

    img {
        border-radius: 10px;
    }
`;
