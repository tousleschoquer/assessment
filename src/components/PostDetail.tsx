import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';

// Styled component for the article container
const Article = styled.article`
  padding: 20px; /* Increased padding for consistency */
  background-color: #6A0DAD; /* Violet background for details */
  border-radius: 10px; /* Match PostList */
  box-shadow: 0 0 15px rgba(138, 43, 226, 0.8), 0 0 30px rgba(138, 43, 226, 0.5); /* Neon-violet outline */
  transition: box-shadow 0.3s;

  &:hover {
    box-shadow: 0 0 20px rgba(138, 43, 226, 1), 0 0 40px rgba(138, 43, 226, 0.7); /* Intensify the neon glow on hover */
  }
`;

// Styled component for the post title
const Title = styled.h1`
  color: #ffffff; /* White text for title */
  margin-bottom: 10px; /* Space below the title */
`;

// Styled component for the back link
const BackLink = styled(Link)`
  color: #ffffff; /* White link */
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

// Styled component for the header section
const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px; /* Space below header */
`;

// Styled component for the author's avatar
const AuthorAvatar = styled.img`
  border-radius: 50%;
  width: 50px;
  height: 50px;
  margin-right: 10px; /* Space to the right of the avatar */
`;

// Styled component for the author info section
const AuthorInfo = styled.div`
  font-size: 14px;
  color: #dbfee5; /* Matching color for author info */
`;

// Styled component for displaying the publish date of the post
const PublishDate = styled.div`
  font-size: 16px;
  color: #fefefe; /* White color for publish date */
`;

// Interface defining the structure of a Post object corresponding to the mock/data.json
interface Post {
  id: string;
  title: string;
  publishDate: string;
  summary: string;
  categories: { id: string; name: string }[];
  author: { name: string; avatar?: string };
}

// PostDetail component fetches and displays the details of a specific post
const PostDetail: React.FC = () => {
  const { postId } = useParams<{ postId: string }>(); // Retrieves the postId from the URL parameters
  const [post, setPost] = useState<Post | null>(null); // Manages the post data
  const [error, setError] = useState(''); // Manages any error message during the fetch
  const [isLoading, setIsLoading] = useState(true); // Manages the loading state

  // useEffect hook to fetch the post details when the component mounts or when postId changes
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/posts/${postId}`); // Fetches the post data from the mock
        const data = await response.json();
        setPost(data.post || null); // Sets the post data or null if no post is found
      } catch (error) {
        setError('Error fetching post.'); // Sets an error message if the fetch fails
      } finally {
        setIsLoading(false); // Stops the loading state once fetch is done
      }
    };
    fetchPost();
  }, [postId]); // The hook depends on postId

  // Display a loading message while data is being fetched
  if (isLoading) return <p>Loading...</p>;
  // Display the error message if any occurred during fetching
  if (error) return <p>{error}</p>;

  // If the post data exists, display the post details
  return post ? (
    <Article>
      <Header>
        {/* Conditionally renders the author's avatar if it exists */}
        {post.author.avatar && <AuthorAvatar src={post.author.avatar} alt={`${post.author.name}'s avatar`} />}
        {/* Displays the author's name and info */}
        <AuthorInfo>{post.author.name} posted</AuthorInfo>
      </Header>
      {/* Displays the post title */}
      <Title>{post.title}</Title>
      {/* Formats and displays the publish date */}
      <PublishDate>Published on: {new Date(post.publishDate).toLocaleDateString()}</PublishDate>
      {/* Displays the post summary */}
      <p>{post.summary}</p>
      {/* Link to go back to the list of posts */}
      <BackLink to="/">Back to Posts</BackLink>
    </Article>
  ) : (
    // Display a message if no post is found
    <p>Post not found.</p>
  );
};

export default PostDetail;
