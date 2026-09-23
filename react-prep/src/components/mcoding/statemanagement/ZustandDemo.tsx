// // components/ZustandDemo.tsx
// import React, { useState } from 'react';
// import { create } from 'zustand';
// import { devtools, persist } from 'zustand/middleware';

// // Define types
// interface User {
//   id: string;
//   name: string;
//   email: string;
// }

// interface CounterState {
//   count: number;
//   users: User[];
//   loading: boolean;
//   increment: () => void;
//   decrement: () => void;
//   incrementByAmount: (amount: number) => void;
//   addUser: (user: User) => void;
//   reset: () => void;
// }

// // Create store
// const useCounterStore = create<CounterState>()(
//   devtools(
//     persist(
//       (set) => ({
//         count: 0,
//         users: [],
//         loading: false,
//         increment: () => set((state) => ({ count: state.count + 1 })),
//         decrement: () => set((state) => ({ count: state.count - 1 })),
//         incrementByAmount: (amount: number) => 
//           set((state) => ({ count: state.count + amount })),
//         addUser: (user: User) => 
//           set((state) => ({ users: [...state.users, user] })),
//         reset: () => set({ count: 0, users: [] }),
//       }),
//       {
//         name: 'counter-storage',
//       }
//     )
//   )
// );

// // Component
// const ZustandDemo: React.FC = () => {
//   const { 
//     count, 
//     users, 
//     increment, 
//     decrement, 
//     incrementByAmount, 
//     addUser, 
//     reset 
//   } = useCounterStore();
  
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');

//   const handleAddUser = () => {
//     if (name && email) {
//       addUser({
//         id: Date.now().toString(),
//         name,
//         email,
//       });
//       setName('');
//       setEmail('');
//     }
//   };

//   return (
//     <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px' }}>
//       <h2>Zustand Demo</h2>
      
//       <div>
//         <h3>Counter: {count}</h3>
//         <button onClick={increment}>Increment</button>
//         <button onClick={decrement}>Decrement</button>
//         <button onClick={() => incrementByAmount(5)}>Add 5</button>
//         <button onClick={reset}>Reset</button>
//       </div>

//       <div>
//         <h3>User Management</h3>
//         <div>
//           <input
//             type="text"
//             placeholder="Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <button onClick={handleAddUser}>Add User</button>
//         </div>
//         <ul>
//           {users.map(user => (
//             <li key={user.id}>{user.name} - {user.email}</li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default ZustandDemo;
export default {}