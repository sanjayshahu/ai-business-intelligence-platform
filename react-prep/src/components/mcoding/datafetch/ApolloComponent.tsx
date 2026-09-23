// // components/ApolloComponent.tsx
// import React, { useState } from "react";
// import {
//   ApolloClient,
//   InMemoryCache,
//   ApolloProvider,
//   ApolloCache,
//   gql,
//   useQuery,
//   useMutation,
// } from "@apollo/client";

// // ---------------- Apollo Client ----------------
// const client = new ApolloClient({
//   uri: "https://71z1g.sse.codesandbox.io/", // your GraphQL endpoint
//   cache: new InMemoryCache(),
// });

// // ---------------- Types ----------------
// interface Book {
//   id: string;
//   title: string;
//   author: string;
// }

// interface GetBooksData {
//   books: Book[];
// }

// interface AddBookData {
//   addBook: Book;
// }

// interface DeleteBookData {
//   deleteBook: { id: string };
// }

// // ---------------- GraphQL Queries & Mutations ----------------
// const GET_BOOKS = gql`
//   query GetBooks {
//     books {
//       id
//       title
//       author
//     }
//   }
// `;

// const GET_BOOK = gql`
//   query GetBook($id: ID!) {
//     book(id: $id) {
//       id
//       title
//       author
//     }
//   }
// `;

// const ADD_BOOK = gql`
//   mutation AddBook($title: String!, $author: String!) {
//     addBook(title: $title, author: $author) {
//       id
//       title
//       author
//     }
//   }
// `;

// const DELETE_BOOK = gql`
//   mutation DeleteBook($id: ID!) {
//     deleteBook(id: $id) {
//       id
//     }
//   }
// `;

// // ---------------- Books List Component ----------------
// const BooksList: React.FC = () => {
//   const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
//   const [newBook, setNewBook] = useState({ title: "", author: "" });

//   const { data, loading, error, refetch } = useQuery<GetBooksData>(GET_BOOKS);

//   // Query single book
//   const { data: bookData } = useQuery<{ book: Book }>(GET_BOOK, {
//     variables: { id: selectedBookId },
//     skip: !selectedBookId,
//   });

//   // Add book mutation
//   const [addBook] = useMutation<AddBookData>(ADD_BOOK, {
//     onCompleted: () => {
//       setNewBook({ title: "", author: "" });
//       refetch();
//     },
//     update: (cache: ApolloCache<AddBookData>, { data }) => {
//       if (!data) return;
//       const existing = cache.readQuery<GetBooksData>({ query: GET_BOOKS });
//       cache.writeQuery({
//         query: GET_BOOKS,
//         data: {
//           books: existing ? [...existing.books, data.addBook] : [data.addBook],
//         },
//       });
//     },
//   });

//   // Delete book mutation
//   const [deleteBook] = useMutation<DeleteBookData>(DELETE_BOOK, {
//     update: (cache: ApolloCache<DeleteBookData>, { data }) => {
//       if (!data) return;
//       const existing = cache.readQuery<GetBooksData>({ query: GET_BOOKS });
//       if (existing) {
//         cache.writeQuery({
//           query: GET_BOOKS,
//           data: {
//             books: existing.books.filter((b) => b.id !== data.deleteBook.id),
//           },
//         });
//       }
//     },
//   });

//   const handleAddBook = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!newBook.title || !newBook.author) return;
//     addBook({
//       variables: newBook,
//       optimisticResponse: {
//         addBook: {
//           __typename: "Book",
//           id: "temp-id",
//           title: newBook.title,
//           author: newBook.author,
//         },
//       },
//     });
//   };

//   const handleDeleteBook = (id: string) => {
//     deleteBook({
//       variables: { id },
//       optimisticResponse: {
//         deleteBook: {
//           __typename: "Book",
//           id,
//         },
//       },
//     });
//   };

//   if (loading) return <div>Loading books...</div>;
//   if (error) return <div className="text-red-500">Error: {error.message}</div>;

//   return (
//     <div className="p-6 border rounded-lg">
//       <h2 className="text-xl font-bold mb-4">Apollo Client (GraphQL)</h2>

//       <form onSubmit={handleAddBook} className="mb-6 p-4 bg-gray-50 rounded">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
//           <input
//             type="text"
//             placeholder="Book Title"
//             value={newBook.title}
//             onChange={(e) =>
//               setNewBook((prev) => ({ ...prev, title: e.target.value }))
//             }
//             required
//           />
//           <input
//             type="text"
//             placeholder="Author"
//             value={newBook.author}
//             onChange={(e) =>
//               setNewBook((prev) => ({ ...prev, author: e.target.value }))
//             }
//             required
//           />
//         </div>
//         <button type="submit">Add Book</button>
//       </form>

//       <div>
//         {data?.books.map((book) => (
//           <div key={book.id}>
//             <strong>{book.title}</strong> by {book.author}{" "}
//             <button onClick={() => setSelectedBookId(book.id)}>View</button>
//             <button onClick={() => handleDeleteBook(book.id)}>Delete</button>
//           </div>
//         ))}
//       </div>

//       {bookData && (
//         <div>
//           <h3>Selected Book Details</h3>
//           <p>{bookData.book.title} by {bookData.book.author}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// // ---------------- Apollo Component ----------------
// const ApolloComponent: React.FC = () => (
//   <ApolloProvider client={client}>
//     <BooksList />
//   </ApolloProvider>
// );

// export default ApolloComponent;
export default {}
