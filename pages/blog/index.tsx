import Layout from "@components/layout";
import matter from "gray-matter";
import { readdirSync, readFileSync } from "fs";
import {GetStaticProps, NextPage} from "next";
import Link from "next/link";

interface Post {
    title: string;
    date: string;
    category: string;
    slug:string;
}

const Blog:NextPage<{posts:Post[]}> = ({posts}) => {
  return (
    <Layout title="Blog" seoTitle="Blog">
      <h1 className="font-semibold text-center text-xl mb-10">Latest Posts:</h1>
        {posts.map((post, index) => (
            <div key={index} className='mb-5'>
                <span className="text-lg text-red-500">{post.title}</span>
                    <Link href={`/blog/${post.slug}`}>
                        <a>
                            <div>
                                <span>
                                    {post.date} / {post.category}
                                </span>
                            </div>
                        </a>
                    </Link>
            </div>
        ))}
    </Layout>
  );
}
export const getStaticProps: GetStaticProps = async() => {
    const blogPosts = readdirSync("./posts").map((file) => {
        const content = readFileSync(`./posts/${file}`, "utf-8");
        const [slug, _] = file.split(".")
        return {...matter(content).data, slug};
    });
    return {
        props: {
            posts: blogPosts,
        },
    };
}

export default Blog;