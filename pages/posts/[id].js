import { useRouter } from "next/router";
import { Fragment } from "react";

const Post = ({ post }) => {
  const router = useRouter();
  const { id } = router.query;
  console.log(post);
  return (
    <Fragment>
      <p>Post: {id}</p>
      <p>{post.title}</p>
    </Fragment>
  );
};

// This function gets called at build time
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await fetch("https://testnext-rockie2695.vercel.app/api/blog");
  const posts = await res.json();

  // Get the paths we want to pre-render based on posts
  const paths = posts.map((post) => ({
    params: { id: post.id.toString() },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  console.log(params);
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const res = await fetch(`http://localhost:3000/api/posts/${params.id}`);
  const post = await res.json();

  /*
  if (!data) {
    return {
      notFound: true,
    };
    //return {
    //  redirect: {
    //    destination: '/',
    //    permanent: false,
    //  },
    }
  }
  */

  // Pass post data to the page via props
  return {
    props: { post },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every second
    //revalidate: 1, // In seconds
  };
}

export default Post;
