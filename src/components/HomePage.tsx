import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import PostList from './PostList';
import CategoryFilter from './CategoryFilter';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled, { keyframes } from 'styled-components';

// Interface defining the structure of a Post object corresponding to the mock/data.json
interface Post {
  id: string;
  title: string;
  publishDate: string;
  summary: string;
  categories: { id: string; name: string }[];
  author: { name: string; avatar?: string };
}

// Animation for post fade-in effect
const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
`;

// Animation for post fade-out effect
const fadeOut = keyframes`
  from { opacity: 1; transform: scale(1); }
  to { opacity: 0; transform: scale(0.9); }
`;

// Styled component for the animated post item
// Adds CSS transition animations when posts enter or exit the view
const AnimatedPost = styled.div`
  &.fade-enter { animation: ${fadeIn} 0.5s forwards; }
  &.fade-exit { animation: ${fadeOut} 0.5s forwards; }
`;

// Styled button for "Load More" functionality
// Uses a violet color scheme and includes a neon-like box-shadow
const LoadMoreButton = styled.button`
  background-color: #6A0DAD; /* Violet */
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s, box-shadow 0.3s;

  /* Neon-violet outline */
  box-shadow: 0 0 15px rgba(138, 43, 226, 0.8), 0 0 30px rgba(138, 43, 226, 0.5);

  &:hover {
    background-color: #312e34; /* Darker violet */
    /* Intensify the neon glow on hover */
    box-shadow: 0 0 20px rgba(138, 43, 226, 1), 0 0 40px rgba(138, 43, 226, 0.7);
  }
`;

// HomePage component fetches and displays a list of posts with filtering options
const HomePage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]); // Manages the list of posts
  const [categories, setCategories] = useState<string[]>([]); // Manages the available post categories
  const [displayedPostsCount, setDisplayedPostsCount] = useState(5); // Controls how many posts are displayed at a time
  const [searchParams, setSearchParams] = useSearchParams(); // Manages the query parameters in the URL for filtering
  const selectedCategories = searchParams.getAll('category'); // Retrieves selected categories from query params

  // Fetches posts from the API and extracts unique categories on initial render
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/posts'); // Fetches the posts data from the API
        const data = await response.json();
        
        // Sorts posts by the publish date in descending order
        const sortedPosts = data.posts.sort(
          (a: Post, b: Post) => 
            new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
        );
        setPosts(sortedPosts); // Sets the fetched posts

        // Extracts unique categories from the posts
        const uniqueCategories = Array.from(
          new Set(sortedPosts.flatMap((post: { categories: any[]; }) => post.categories.map((cat) => cat.name)))
        ) as string[];
        setCategories(uniqueCategories); // Sets the unique categories for the filter
      } catch (error) {
        console.error('Error fetching data:', error); // Handles any errors during data fetch
      }
    };

    fetchData(); // Calls the fetch function
  }, []); // The effect runs only once after the initial render

  // Handles the event when a category is selected or deselected
  const handleCategoryChange = (category: string) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((cat: string) => cat !== category) // Removes category if already selected
      : [...selectedCategories, category]; // Adds category to the selected list
    setSearchParams({ category: updatedCategories }); // Updates the URL search parameters
  };

  // Resets all category filters
  const resetFilters = () => setSearchParams({}); // Clears the search parameters

  // Filters the posts based on selected categories
  const filteredPosts = selectedCategories.length
    ? posts.filter((post: Post) => 
        post.categories.some((cat: { id: string; name: string }) => 
          selectedCategories.includes(cat.name)
        )
      )
    : posts; // If no categories are selected, all posts are displayed

  return (
    <>
      {/* Renders the category filter component */}
      <CategoryFilter
        categories={categories}
        selectedCategories={selectedCategories}
        onCategoryChange={handleCategoryChange}
        onResetFilters={resetFilters}
      />
      
      {/* Transitions between posts with animation */}
      <TransitionGroup>
        {filteredPosts.slice(0, displayedPostsCount).map((post: Post) => (
          <CSSTransition key={post.id} timeout={500} classNames="fade">
            <AnimatedPost>
              <PostList posts={[post]} /> {/* Renders each post in the PostList component */}
            </AnimatedPost>
          </CSSTransition>
        ))}
      </TransitionGroup>
      
      {/* Conditionally renders a "Load More" button if there are more posts to display */}
      {displayedPostsCount < filteredPosts.length && (
        <LoadMoreButton onClick={() => setDisplayedPostsCount((prev) => prev + 5)}>
          Load More
        </LoadMoreButton>
      )}
    </>
  );
};

export default HomePage;
