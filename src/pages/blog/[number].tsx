import { Inter } from "next/font/google";
import { getPostByNumber } from "@/lib/api/posts";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { extractPostContent } from "@/lib/post";

const inter = Inter({ subsets: ["latin"] });

export const getServerSideProps: GetServerSideProps<{
  post: any;
}> = async (context) => {
  try {
    const num = Number.parseInt(String(context.params?.number));
    const post = await getPostByNumber(num);

    if (!post) {
      throw new Error("No such post");
    }

    return { props: { post } };
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    return {
      props: {
        post: null,
      },
    };
  }
};

export default function BlogPost({
  post,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (!post) {
    return <div>No such post</div>;
  }

  const { title, description, imageSrc, contentHTML } =
    extractPostContent(post);

  return (
    <main
      className={`flex min-h-screen flex-col bg-gradient-to-b from-black to-[#2C1630] p-24 ${inter.className}`}
    >
      <article className="post">
        <h1 className="text-5xl font-bold mb-6">{title}</h1>
        <p className="mb-12">{description}</p>
        <img src={imageSrc} alt={`${title} image`} />
        <div
          dangerouslySetInnerHTML={{
            __html: contentHTML,
          }}
        ></div>
      </article>
    </main>
  );
}
