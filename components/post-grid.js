import { styled } from "goober";
import { formatDate } from "../utils/functions";
import Link from "next/link";
import Image from "next/image";

export default function PostGrid({ posts }) {
    return (
        <>
            <h3>Kategorier</h3>
            <Buttons>
                <Button>Meninger</Button>
                <Button>Inspirasjon</Button>
            </Buttons>
            <Grid>
                {posts.map(({ node }) => {
                    return (
                        <Card key={node.slug}>
                            {node.featuredImage && (
                                <Image
                                    src={node.featuredImage.node.sourceUrl}
                                    height={250}
                                    width={350}
                                    alt="Hero image"
                                    priority
                                />
                            )}
                            <div className="content">
                                <h3>{node.title}</h3>
                                <span>{formatDate(node.date)}</span>
                            </div>
                            <Link href={`/blog/` + node.slug} passHref>
                                <a aria-label={node.title}></a>
                            </Link>
                        </Card>
                    );
                })}
            </Grid>
        </>
    );
}

const Grid = styled("div")`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
`;

const Card = styled("div")`
    position: relative;
    background-color: var(--background2);
    overflow: hidden;
    border-radius: 5px;

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
        height: 150px;
        object-fit: cover;
    }

    .content {
        padding: 10px;
    }
`;

const Buttons = styled("div")`
    display: flex;
    gap: 24px;
    margin: 12px 0 24px 0;
`;

const Button = styled("div")`
    background-color: transparent;
    padding: 5px 15px;
    border: 1px solid;
    border-radius: 5px;
    width: auto;
    cursor: pointer;
`;
