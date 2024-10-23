import { createServer, Response } from 'miragejs';
import data from './data.json'; // Import the posts data

createServer({
  routes() {
    this.namespace = 'api';

    // Fetch all posts
    this.get('/posts', () => {
      return { posts: data.posts }; // Return all posts wrapped in an object
    });

    // Fetch a single post by ID
    this.get('/posts/:postId', (schema, request) => {
      const { postId } = request.params;
      const post = data.posts.find((p) => p.id === postId); // Match the post by ID

      if (post) {
        return { post }; // Return the matching post
      } else {
        return new Response(404, {}, { error: 'Post not found.' }); // Handle 404 case
      }
    });
  },
});
