import { FC } from "react";
import Head from "next/head";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { client } from "../libs/client";
import { BlogListResponse, BlogResponse } from "../types/api";

interface Props {
    blog: BlogResponse[];
}

const TopPage: FC<Props> = ({ blog }) => {
    return (
        <>
            <Head>
                <title>淵野アタリのブログ</title>
                <meta name="og:title" content="淵野アタリのブログ" />
                <meta name="twitter:card" content="summary" />
            </Head>
            <Header />
            <main>
                <h2>最新3記事</h2>
                <ul>
                    {blog.map((blog: BlogResponse) => (
                        <li key={blog.id}>
                            <Link href={`/blog/${blog.id}`}>
                                <a>{blog.title}</a>
                            </Link>
                        </li>
                    ))}
                </ul>
                <p>
                    <Link href="/blog">
                        <a>もっと見る</a>
                    </Link>
                </p>
            </main>
            <Footer />
        </>
    );
};

export const getStaticProps = async () => {
    const data = await client.get<BlogListResponse>({
        endpoint: "blog",
        queries: { limit: 3 },
    });

    return {
        props: {
            blog: data.contents,
        },
    };
};

export default TopPage;
