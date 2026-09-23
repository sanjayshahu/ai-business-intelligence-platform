// // components/ReactQueryDemo.tsx
// import React, { useState } from 'react';
// import { 
//   QueryClient, 
//   QueryClientProvider, 
//   useQuery, 
//   useMutation, 
//   useQueryClient 
// } from '@tanstack/react-query';

// // Define types
// interface User {
//   id: string;
//   name: string;
//   email: string;
// }

// interface Post {
//   id: number;
//   title: string;
//   body: string;
//   userId: number;
// }

// // Mock API functions
// const mockApi = {
//   getUsers: async (): Promise<User[]> => {
//     await new Promise(resolve => setTimeout(resolve, 1000));
//     return [
//       { id: '1', name: 'John Doe', email: 'john@example.com' },
//       { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
//     ];
//   },

//   addUser: async (user: Omit<User, 'id'>): Promise<User> => {
//     await new Promise(resolve => setTimeout(resolve, 500));
//     return {
//       ...user,
//       id: Date.now().toString(),
//     };
//   },

//   getPosts: async (): Promise<Post[]> => {
//     const response = await fetch('https://jsonplaceholder.typicode.com/posts');
//     return response.json();
//   },

//   getPost: async (id: number): Promise<Post> => {
//     const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
//     return response.json();
//   },
// };

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       retry: 1,
//       staleTime: 5 * 60 * 1000, // 5 minutes
//     },
//   },
// });

// // Component
// const ReactQueryDemo: React.FC = () => {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px' }}>
//         <h2>React Query (TanStack Query) Demo</h2>
//         <UserManager />
//         <PostList />
//         <PostDetail />
//       </div>
//     </QueryClientProvider>
//   );
// };

// const UserManager: React.FC = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const queryClient = useQueryClient();

//   // Query for users
//   const { data: users = [], isLoading, error } = useQuery({
//     queryKey: ['users'],
//     queryFn: mockApi.getUsers,
//   });

//   // Mutation for adding user
//   const addUserMutation = useMutation({
//     mutationFn: mockApi.addUser,
//     onSuccess: () => {
//       // Invalidate and refetch users query
//       queryClient.invalidateQueries({ queryKey: ['users'] });
//       setName('');
//       setEmail('');
//     },
//     onError: (error) => {
//       console.error('Failed to add user:', error);
//     },
//   });

//   const handleAddUser = () => {
//     if (name && email) {
//       addUserMutation.mutate({ name, email });
//     }
//   };

//   if (isLoading) return <div>Loading users...</div>;
//   if (error) return <div>Error loading users</div>;

//   return (
//     <div>
//       <h3>User Management with React Query</h3>
//       <div>
//         <input
//           type="text"
//           placeholder="Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <button 
//           onClick={handleAddUser}
//           disabled={addUserMutation.isPending}
//         >
//           {addUserMutation.isPending ? 'Adding...' : 'Add User'}
//         </button>
//       </div>
//       <ul>
//         {users.map(user => (
//           <li key={user.id}>{user.name} - {user.email}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// const PostList: React.FC = () => {
//   const { data: posts, isLoading, error } = useQuery({
//     queryKey: ['posts'],
//     queryFn: mockApi.getPosts,
//   });

//   if (isLoading) return <div>Loading posts...</div>;
//   if (error) return <div>Error loading posts</div>;

//   return (
//     <div>
//       <h3>Posts (External API)</h3>
//       <div style={{ maxHeight: '200px', overflow: 'auto' }}>
//         {posts?.slice(0, 5).map(post => (
//           <div key={post.id} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #eee' }}>
//             <h4>{post.title}</h4>
//             <p>{post.body.substring(0, 100)}...</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// const PostDetail: React.FC = () => {
//   const [postId, setPostId] = useState(1);
  
//   const { data: post, isLoading, error } = useQuery({
//     queryKey: ['post', postId],
//     queryFn: () => mockApi.getPost(postId),
//     enabled: !!postId,
//   });

//   return (
//     <div>
//       <h3>Post Detail</h3>
//       <div>
//         <input
//           type="number"
//           value={postId}
//           onChange={(e) => setPostId(Number(e.target.value))}
//           min="1"
//           max="100"
//         />
//       </div>
//       {isLoading && <div>Loading post...</div>}
//       {error && <div>Error loading post</div>}
//       {post && (
//         <div style={{ padding: '10px', border: '1px solid #eee', marginTop: '10px' }}>
//           <h4>{post.title}</h4>
//           <p>{post.body}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ReactQueryDemo;
export default {}