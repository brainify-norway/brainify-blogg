import { styled } from "goober";
import { formatDate, metaDescription, removeTags } from "../utils/functions";
import Link from "next/link";
import Image from "next/image";

export default function PostGrid({ posts }) {
    function makeExcerpt(desc) {
        var excerpt = removeTags(desc);
        return excerpt;
    }
    return (
        <>
            {posts.map(({ node }) => {
                return (
                    <Card key={node.slug}>
                        <h3>{node.title}</h3>
                        {node.featuredImage && (
                            <Image
                                src={node.featuredImage.node.sourceUrl}
                                height={
                                    node.featuredImage.node.mediaDetails.height
                                }
                                width={
                                    node.featuredImage.node.mediaDetails.width
                                }
                                alt="Hero image"
                                priority
                            />
                        )}
                        <p>{makeExcerpt(node.excerpt)}</p>
                        <span>{formatDate(node.date)}</span>
                        <Link href={`/blog/` + node.slug} passHref>
                            <a aria-label={node.title}></a>
                        </Link>
                    </Card>
                );
            })}
        </>
    );
}

const Card = styled("div")`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    padding: 20px 0;
    gap: 10px;

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
