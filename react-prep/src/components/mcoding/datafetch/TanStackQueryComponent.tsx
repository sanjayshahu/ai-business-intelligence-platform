// // components/TanStackQueryComponent.tsx
// import React, { useState } from 'react';
// import {
//   useQuery,
//   useMutation,
//   useQueryClient,
//   QueryClient,
//   QueryClientProvider,
// } from '@tanstack/react-query';

// // Create a client
// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       refetchOnWindowFocus: false,
//       staleTime: 5 * 60 * 1000, // 5 minutes
//     },
//   },
// });

// interface Product {
//   id: number;
//   title: string;
//   price: number;
//   description: string;
//   category: string;
//   image: string;
// }

// // API functions
// const api = {
//   fetchProducts: async (): Promise<Product[]> => {
//     const response = await fetch('https://fakestoreapi.com/products?limit=5');
//     if (!response.ok) throw new Error('Failed to fetch products');
//     return response.json();
//   },

//   fetchProduct: async (id: number): Promise<Product> => {
//     const response = await fetch(`https://fakestoreapi.com/products/${id}`);
//     if (!response.ok) throw new Error('Failed to fetch product');
//     return response.json();
//   },

//   addProduct: async (product: Omit<Product, 'id'>): Promise<Product> => {
//     const response = await fetch('https://fakestoreapi.com/products', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(product),
//     });
//     if (!response.ok) throw new Error('Failed to add product');
//     return response.json();
//   },

//   updateProduct: async (id: number, product: Partial<Product>): Promise<Product> => {
//     const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(product),
//     });
//     if (!response.ok) throw new Error('Failed to update product');
//     return response.json();
//   },

//   deleteProduct: async (id: number): Promise<void> => {
//     const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
//       method: 'DELETE',
//     });
//     if (!response.ok) throw new Error('Failed to delete product');
//   },
// };

// // Products List Component
// const ProductsList: React.FC = () => {
//   const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
//   const [newProduct, setNewProduct] = useState({
//     title: '',
//     price: '',
//     description: '',
//     category: 'electronics',
//     image: '',
//   });
//   const queryClient = useQueryClient();

//   // Query for all products
//   const {
//     data: products,
//     isLoading,
//     error,
//     isFetching,
//   } = useQuery({
//     queryKey: ['products'],
//     queryFn: api.fetchProducts,
//   });

//   // Query for single product
//   const { data: product } = useQuery({
//     queryKey: ['product', selectedProductId],
//     queryFn: () => selectedProductId ? api.fetchProduct(selectedProductId) : null,
//     enabled: !!selectedProductId,
//   });

//   // Mutation for adding product
//   const addMutation = useMutation({
//     mutationFn: api.addProduct,
//     onSuccess: () => {
//       // Invalidate and refetch
//       queryClient.invalidateQueries({ queryKey: ['products'] });
//       setNewProduct({
//         title: '',
//         price: '',
//         description: '',
//         category: 'electronics',
//         image: '',
//       });
//     },
//     onError: (error) => {
//       console.error('Error adding product:', error);
//     },
//   });

//   // Mutation for updating product
//   const updateMutation = useMutation({
//     mutationFn: ({ id, product }: { id: number; product: Partial<Product> }) =>
//       api.updateProduct(id, product),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['products'] });
//       queryClient.invalidateQueries({ queryKey: ['product', selectedProductId] });
//     },
//   });

//   // Mutation for deleting product
//   const deleteMutation = useMutation({
//     mutationFn: api.deleteProduct,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['products'] });
//       setSelectedProductId(null);
//     },
//   });

//   const handleAddProduct = (e: React.FormEvent) => {
//     e.preventDefault();
//     addMutation.mutate({
//       title: newProduct.title,
//       price: parseFloat(newProduct.price),
//       description: newProduct.description,
//       category: newProduct.category,
//       image: newProduct.image || 'https://via.placeholder.com/150',
//     });
//   };

//   const handleUpdateProduct = (id: number) => {
//     updateMutation.mutate({
//       id,
//       product: {
//         title: `Updated ${products?.find(p => p.id === id)?.title}`,
//       },
//     });
//   };

//   const handleDeleteProduct = (id: number) => {
//     deleteMutation.mutate(id);
//   };

//   if (isLoading) return <div className="p-4">Loading products...</div>;
//   if (error) return <div className="p-4 text-red-500">Error: {error.message}</div>;

//   return (
//     <div className="p-6 border rounded-lg">
//       <h2 className="text-xl font-bold mb-4">TanStack Query (React Query)</h2>

//       {/* Add Product Form */}
//       <form onSubmit={handleAddProduct} className="mb-6 p-4 bg-gray-50 rounded">
//         <h3 className="text-lg font-semibold mb-3">Add New Product</h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
//           <input
//             type="text"
//             placeholder="Product Title"
//             value={newProduct.title}
//             onChange={(e) => setNewProduct(prev => ({ ...prev, title: e.target.value }))}
//             className="p-2 border rounded"
//             required
//           />
//           <input
//             type="number"
//             placeholder="Price"
//             value={newProduct.price}
//             onChange={(e) => setNewProduct(prev => ({ ...prev, price: e.target.value }))}
//             className="p-2 border rounded"
//             step="0.01"
//             required
//           />
//           <input
//             type="text"
//             placeholder="Description"
//             value={newProduct.description}
//             onChange={(e) => setNewProduct(prev => ({ ...prev, description: e.target.value }))}
//             className="p-2 border rounded"
//             required
//           />
//           <select
//             value={newProduct.category}
//             onChange={(e) => setNewProduct(prev => ({ ...prev, category: e.target.value }))}
//             className="p-2 border rounded"
//           >
//             <option value="electronics">Electronics</option>
//             <option value="jewelery">Jewelery</option>
//             <option value="men's clothing">Men's Clothing</option>
//             <option value="women's clothing">Women's Clothing</option>
//           </select>
//         </div>
//         <button
//           type="submit"
//           disabled={addMutation.isPending}
//           className="bg-green-500 text-white px-4 py-2 rounded disabled:bg-green-300"
//         >
//           {addMutation.isPending ? 'Adding...' : 'Add Product'}
//         </button>
//       </form>

//       {/* Selected Product Details */}
//       {product && (
//         <div className="mb-6 p-4 bg-blue-50 rounded">
//           <h3 className="text-lg font-semibold mb-2">Selected Product Details</h3>
//           <div className="flex gap-4">
//             <img
//               src={product.image}
//               alt={product.title}
//               className="w-24 h-24 object-cover rounded"
//             />
//             <div>
//               <h4 className="font-semibold text-lg">{product.title}</h4>
//               <p className="text-gray-600">${product.price}</p>
//               <p className="text-sm text-gray-500">{product.category}</p>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Products List */}
//       <div>
//         <div className="flex justify-between items-center mb-3">
//           <h3 className="text-lg font-semibold">
//             Products {isFetching && <span className="text-blue-500">(Updating...)</span>}
//           </h3>
//           <button
//             onClick={() => queryClient.invalidateQueries({ queryKey: ['products'] })}
//             className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
//           >
//             Refresh All
//           </button>
//         </div>

//         <div className="grid grid-cols-1 gap-4">
//           {products?.map(product => (
//             <div
//               key={product.id}
//               className="p-4 border rounded flex gap-4 items-start"
//             >
//               <img
//                 src={product.image}
//                 alt={product.title}
//                 className="w-20 h-20 object-cover rounded"
//               />
//               <div className="flex-1">
//                 <h4 className="font-semibold">{product.title}</h4>
//                 <p className="text-green-600 font-semibold">${product.price}</p>
//                 <p className="text-sm text-gray-600 mb-2">{product.category}</p>
//                 <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>
//               </div>
//               <div className="flex flex-col gap-2">
//                 <button
//                   onClick={() => setSelectedProductId(product.id)}
//                   className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
//                 >
//                   View
//                 </button>
//                 <button
//                   onClick={() => handleUpdateProduct(product.id)}
//                   disabled={updateMutation.isPending}
//                   className="bg-yellow-500 text-white px-3 py-1 rounded text-sm disabled:bg-yellow-300"
//                 >
//                   Update
//                 </button>
//                 <button
//                   onClick={() => handleDeleteProduct(product.id)}
//                   disabled={deleteMutation.isPending}
//                   className="bg-red-500 text-white px-3 py-1 rounded text-sm disabled:bg-red-300"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Mutation Status */}
//       <div className="mt-4 p-3 bg-gray-100 rounded">
//         <h4 className="font-semibold mb-2">Mutation Status:</h4>
//         <div className="text-sm space-y-1">
//           <p>Add: {addMutation.isPending ? 'Pending...' : addMutation.isError ? 'Error' : 'Idle'}</p>
//           <p>Update: {updateMutation.isPending ? 'Pending...' : updateMutation.isError ? 'Error' : 'Idle'}</p>
//           <p>Delete: {deleteMutation.isPending ? 'Pending...' : deleteMutation.isError ? 'Error' : 'Idle'}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Main TanStack Query Component with Provider
// const TanStackQueryComponent: React.FC = () => {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <ProductsList />
//     </QueryClientProvider>
//   );
// };

// export default TanStackQueryComponent;
export default {};