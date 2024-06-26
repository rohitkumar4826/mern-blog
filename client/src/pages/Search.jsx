import { Button, Select, TextInput } from 'flowbite-react';
import { useEffect, useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PostCard from '../components/PostCard';

export default function Search() {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: '',
    sort: 'desc',
    category: 'uncategorized',
  });
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    const urlParams = new URLSearchParams(location.search);
    const res = await fetch(`http://localhost:3000/api/post/getposts?${urlParams}`);
    if (res.ok) {
      const data = await res.json();
      setPosts(data.posts);
      setShowMore(data.posts.length === 9);
    }
    setLoading(false);
  }, [location.search]);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    setSidebarData((prevData) => ({
      ...prevData,
      searchTerm: urlParams.get('searchTerm') || '',
      sort: urlParams.get('sort') || 'desc',
      category: urlParams.get('category') || 'uncategorized',
    }));
    fetchPosts();
  }, [location.search, fetchPosts]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setSidebarData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(sidebarData);
    navigate(`/search?${urlParams}`);
  };

  const handleShowMore = async () => {
    const startIndex = posts.length;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const res = await fetch(`http://localhost:3000/api/post/getposts?${urlParams}`);
    if (res.ok) {
      const data = await res.json();
      setPosts((prevPosts) => [...prevPosts, ...data.posts]);
      setShowMore(data.posts.length === 9);
    }
  };

  return (
    <div className='flex flex-col md:flex-row'>
      <div className='p-7 border-b md:border-r md:min-h-screen border-gray-500'>
        <form className='flex flex-col gap-8' onSubmit={handleSubmit}>
          <div className='flex items-center gap-2'>
            <label className='whitespace-nowrap font-semibold' htmlFor='searchTerm'>
              Search Term:
            </label>
            <TextInput
              placeholder='Search...'
              id='searchTerm'
              type='text'
              value={sidebarData.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className='flex items-center gap-2'>
            <label className='font-semibold' htmlFor='sort'>
              Sort:
            </label>
            <Select id='sort' value={sidebarData.sort} onChange={handleChange}>
              <option value='desc'>Latest</option>
              <option value='asc'>Oldest</option>
            </Select>
          </div>
          <div className='flex items-center gap-2'>
            <label className='font-semibold' htmlFor='category'>
              Category:
            </label>
            <Select id='category' value={sidebarData.category} onChange={handleChange}>
              <option value='uncategorized'>Uncategorized</option>
              <option value='reactjs'>React.js</option>
              <option value='nextjs'>Next.js</option>
              <option value='javascript'>JavaScript</option>
            </Select>
          </div>
          <Button type='submit' outline gradientDuoTone='purpleToPink'>
            Apply Filters
          </Button>
        </form>
      </div>
      <div className='w-full'>
        <h1 className='text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5'>
          Posts results:
        </h1>
        <div className='p-7 flex flex-wrap gap-4'>
          {loading ? (
            <p className='text-xl text-gray-500'>Loading...</p>
          ) : (
            <>
              {posts.length === 0 && <p className='text-xl text-gray-500'>No posts found.</p>}
              {posts.map((post) => <PostCard key={post._id} post={post} />)}
              {showMore && (
                <button onClick={handleShowMore} className='text-sky-400 text-lg hover:underline p-7 w-full'>
                  Show More
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
