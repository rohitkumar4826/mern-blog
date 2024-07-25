import { Button, Spinner } from 'flowbite-react';
import { useEffect, useState, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import CallToAction from '../components/CallToAction';
import CommentSection from '../components/CommentSection';
import PostCard from '../components/PostCard';

export default function PostPage() {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState(null);

  const fetchPost = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:3000/api/post/getposts?slug=${postSlug}`);
      if (!res.ok) {
        setError(true);
        setLoading(false);
        return;
      }
      const data = await res.json();
      setPost(data.posts[0]);
      setLoading(false);
      setError(false);
    } catch (err) {
      setError(true);
      setLoading(false);
    }
  }, [postSlug]);

  const fetchRecentPosts = useCallback(async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/post/getposts?limit=3`);
      if (res.ok) {
        const data = await res.json();
        setRecentPosts(data.posts);
      }
    } catch (err) {
      console.log(err.message);
    }
  }, []);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  useEffect(() => {
    fetchRecentPosts();
  }, [fetchRecentPosts]);

  if (loading) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <Spinner size='xl' />
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <p className='text-xl text-red-500'>Error loading post. Please try again later.</p>
      </div>
    );
  }

  return (
    <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
      <h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>
        {post?.title}
      </h1>
      <Link
        to={`/search?category=${post?.category}`}
        className='self-center mt-5'
      >
        <Button color='gray' pill size='xs'>
          {post?.category}
        </Button>
      </Link>
      <img
        src={post?.image}
        alt={post?.title}
        className='mt-10 p-3 max-h-[600px] w-full object-cover'
      />
      <div className='flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs'>
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span className='italic'>
          {(post?.content.length / 1000).toFixed(0)} mins read
        </span>
      </div>
      <div
        className='p-3 max-w-2xl mx-auto w-full post-content'
        dangerouslySetInnerHTML={{ __html: post?.content }}
      ></div>
      <div className='max-w-4xl mx-auto w-full'>
        <CallToAction />
      </div>
      <CommentSection postId={post?._id} />
      <div className='flex flex-col justify-center items-center mb-5'>
        <h1 className='text-xl mt-5'>Recent articles</h1>
        <div className='flex flex-wrap gap-5 mt-5 justify-center'>
          {recentPosts?.map((recentPost) => (
            <PostCard key={recentPost._id} post={recentPost} />
          ))}
        </div>
      </div>
    </main>
  );
}
