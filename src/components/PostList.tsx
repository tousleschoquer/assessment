import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// Interface defining the structure of post data, matching the data provided in the mock/data.json.
// Each post has an id, title, summary, publish date, categories, and author information.
interface PostData {
  id: string;
  title: string;
  summary: string;
  publishDate: string;
  categories: { id: string; name: string }[];  
  author: { name: string; avatar?: string };  
}

// Props for the PostList component, accepting an array of posts that conform to the PostData interface.
interface PostListProps {
  posts: PostData[];  
}

// Styled component for displaying each post.
// The post container includes a neon-violet outline, padding, and spacing, with hover effects.
const PostContainer = styled.div`
  background-color: #6A0DAD;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  color: #dbfee5;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: background-color 0.3s, box-shadow 0.3s;
  
  /* Neon-violet outline */
  box-shadow: 0 0 15px rgba(138, 43, 226, 0.8), 0 0 30px rgba(138, 43, 226, 0.5);

  &:hover {
    background-color: #312e34;
    /* Intensify the neon glow on hover */
    box-shadow: 0 0 20px rgba(138, 43, 226, 1), 0 0 40px rgba(138, 43, 226, 0.7);
  }
`;

// Header styled component to align the author avatar and name horizontally.
const Header = styled.div`
  display: flex;
  align-items: center;
`;

// Styled component for the author's avatar image.
// The image is rounded.
const AuthorAvatar = styled.img`
  border-radius: 50%;
  width: 50px;
  height: 50px;
  margin-right: 10px;
`;

// Author information styled component, for displaying the author's name in a smaller font.
const AuthorInfo = styled.div`
  font-size: 14px;
`;

// Styled component for the post title.
const PostTitle = styled.h2`
  font-size: 20px;
  margin: 10px 0;
  color: #fefefe;
`;

// PostDescription styled component, used to display the description of the post.
const PostDescription = styled.p`
  font-size: 16px;
  margin-bottom: 10px;
  color: #fefefe;
`;

// Footer styled component to align the categories and publish date horizontally, providing space between them.
const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

// Categories styled component, used to display the categories of the post.
// It aligns the category items horizontally .
const Categories = styled.div`
  display: flex;
  gap: 10px;

  span {
    background-color: #0A0A0A;
    border-radius: 4px;
    padding: 4px 8px;
    font-size: 12px;
    color: #6A0DAD;
  }
`;

// Styled component for the publish date.
const PublishDate = styled.div`
  font-size: 16px;
  color: #fefefe;
`;

// PostList component, responsible for rendering the list of posts.
// It iterates over the provided posts array, displaying each post with its title, summary, categories, and publish date.
const PostList: React.FC<PostListProps> = ({ posts }) => {
  const navigate = useNavigate();  // React Router hook to navigate to a new route.

  // Function to handle clicking on a post, navigating to the post's detail page using its id.
  const handlePostClick = (postId: string) => {
    navigate(`/posts/${postId}`);
  };

  return (
    <div>
      {/* Check if there are any posts to display */}
      {posts.length > 0 ? (
        // Map over the posts array, rendering a PostContainer for each post
        posts.map((post) => (
          <PostContainer key={post.id} onClick={() => handlePostClick(post.id)}>
            <Header>
              {/* Display the author's avatar if available, otherwise show alt text */}
              <AuthorAvatar src={post.author.avatar} alt={`${post.author.name}'s avatar`} />
              <AuthorInfo>{post.author.name} posted</AuthorInfo>
            </Header>
            <PostTitle>{post.title}</PostTitle>
            <PostDescription>{post.summary}</PostDescription>
            <Footer>
              {/* Display the categories as a list of spans */}
              <Categories>
                {post.categories.map((category) => (
                  <span key={category.id}>{category.name}</span>
                ))}
              </Categories>
              {/* Format the publish date into a human-readable format */}
              <PublishDate>{new Date(post.publishDate).toLocaleDateString()}</PublishDate>
            </Footer>
          </PostContainer>
        ))
      ) : (
        // If no posts are available, display a message
        <p>No posts to display.</p>
      )}
    </div>
  );
};

export default PostList;
