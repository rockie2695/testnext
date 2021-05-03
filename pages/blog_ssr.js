import Link from "next/link";
// TODO: Need to fetch `posts` (by calling some API endpoint)
//       before this page can be pre-rendered.
function Blog({ posts }) {
  return (
    <ul>
      {posts.map(({ id, title }, index) => (
        <li key={index}>
          <Link href={`/posts/${id}`}>
            <a>{title}</a>
          </Link>
        </li>
      ))}
    </ul>
  );
}

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`https://testnext-rockie2695.vercel.app/api/blog`);
  const posts = await res.json();

  /*
    if (!data) {
        return {
        notFound: true,
        }
    }
    */

  // Pass data to the page via props
  return { props: { posts } };
}

export default Blog;
