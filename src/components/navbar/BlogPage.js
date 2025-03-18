import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BASE_URL } from '../helpers/Contants';
import { apiRequest } from '../helpers/helper';

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [expandedPost, setExpandedPost] = useState(null);

  // Simulate fetching blog posts from an API
  useEffect(() => {
    const fetchPosts = async () => {

      try{
        const blogsData = await apiRequest(BASE_URL + "blogs/all", "GET");
        if(blogsData && blogsData.length > 0){
          setPosts(blogsData);

        }


      }catch(e){
        console.log('Blog error: ', e)
      }


      // Replace with actual API call
      // const mockPosts = [
      //   {
      //     id: 1,
      //     title: 'Top 10 Fashion Trends for 2025',
      //     excerpt: 'Explore the latest trends and styles shaping 2025 fashion.',
      //     details: 'This year’s fashion is all about bold colors, sustainable fabrics, and vintage-inspired designs. Key pieces include oversized blazers, pastel tones, and retro sneakers.',
      //     image: '/images/fashion-trends.jpg',
      //     author: 'Jane Doe',
      //     date: 'March 7, 2025'
      //   },
      //   {
      //     id: 2,
      //     title: 'The Future of Smart Gadgets',
      //     excerpt: 'Discover the upcoming innovations in the world of smart technology.',
      //     details: 'Smart gadgets in 2025 are expected to be more connected than ever, integrating AI, smart assistants, and wearable tech to improve everyday life.',
      //     image: '/images/smart-gadgets.jpg',
      //     author: 'John Smith',
      //     date: 'March 5, 2025'
      //   },
      //   {
      //     id: 3,
      //     title: 'The Future of Smart Gadgets',
      //     excerpt: 'Discover the upcoming innovations in the world of smart technology.',
      //     details: 'Smart gadgets in 2025 are expected to be more connected than ever, integrating AI, smart assistants, and wearable tech to improve everyday life.',
      //     image: '/images/smart-gadgets.jpg',
      //     author: 'John Smith',
      //     date: 'March 5, 2025'
      //   },
      //   {
      //     id: 4,
      //     title: 'The Future of Smart Gadgets',
      //     excerpt: 'Discover the upcoming innovations in the world of smart technology.',
      //     details: 'Smart gadgets in 2025 are expected to be more connected than ever, integrating AI, smart assistants, and wearable tech to improve everyday life.',
      //     image: '/images/smart-gadgets.jpg',
      //     author: 'John Smith',
      //     date: 'March 5, 2025'
      //   }
      // ];
      // setPosts(mockPosts);
    };

    fetchPosts();
  }, []);

  const toggleReadMore = (id) => {
    setExpandedPost(expandedPost === id ? null : id);
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">OUR BLOGS !!</h1>

      <div className="row">
        {posts.map((post) => (
          <div key={post?.id} className="col-md-6 mb-4">
            <div className="card shadow-sm">
              <img src={post?.image} className="card-img-top" alt={post?.title} />
              <div className="card-body">
                <h5 className="card-title">{post?.title}</h5>
                <p className="card-text">{post?.excerpt}</p>
                {expandedPost === post?.id && (
                  <p className="card-text">{post?.details}</p>
                )}
                <p className="text-muted">By {post?.author} | {post?.date}</p>
                <button onClick={() => toggleReadMore(post?.id)} className="btn btn-primary">
                  {expandedPost === post?.id ? 'Read Less' : 'Read More'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;