// imports
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; 
import styled, { createGlobalStyle } from 'styled-components'; 
import HomePage from './HomePage'; 
import PostDetail from './PostDetail'; 

// Global styles that will be applied throughout the entire app
const GlobalStyle = createGlobalStyle`
  body {
    background-color: #000000; 
    margin: 0;
    font-family: Arial, sans-serif; 
  }

  a {
    color: inherit; /* Ensure links inherit the text color */
    text-decoration: none; /* Remove underline from links */
  }
`;

// Container component to limit the width of the content and center it on the page
const Container = styled.div`
  max-width: 1000px; 
  margin: 0 auto; 
  padding: 0 20px; 
`;

// Header component for the top of the page, styled with a black background
const Header = styled.header`
  padding: 20px; 
  background-color: black; 
  display: flex;  
  justify-content: center; 
  align-items: center; 
  margin-bottom: 20px; 
  margin-top: 20px;
`;

// Logo component which is a styled Link, acting as a clickable logo
const Logo = styled(Link)`
  font-size: 34px; 
  font-weight: bold; 
  color: #6A0DAD; 
  transition: color 0.3s, box-shadow 0.3s; 
  padding: 10px; 
  border-radius: 10px; 

  &:hover {
    
    /* Neon glow effect with rounded borders */
    box-shadow: 
      0 0 5px rgba(138, 43, 226, 0.8), 
      0 0 10px rgba(138, 43, 226, 0.6), 
      0 0 15px rgba(138, 43, 226, 0.4); 
  }
`;



// Main App component with routing setup
const App: React.FC = () => (
  <Router>
    <GlobalStyle /> {/* Apply the global styles */}
    <Header>
      <Logo to="/">My PostList</Logo> {/* Clickable logo that routes to the homepage */}
    </Header>
    <Container>
      <main>
        {/* Define the routes for different pages */}
        <Routes>
          <Route path="/" element={<HomePage />} /> {/* Route for the homepage */}
          <Route path="/posts/:postId" element={<PostDetail />} /> {/* Route for a specific post's detail page */}
        </Routes>
      </main>
    </Container>
  </Router>
);

export default App; 
