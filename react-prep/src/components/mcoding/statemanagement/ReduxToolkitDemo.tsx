// // components/ReduxToolkitDemo.tsx
// import React, { useState } from 'react';
// import { Provider, useDispatch, useSelector } from 'react-redux';
// import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

// // Define types
// interface User {
//   id: string;
//   name: string;
//   email: string;
// }

// interface CounterState {
//   value: number;
//   users: User[];
//   loading: boolean;
// }

// // Create slice
// const counterSlice = createSlice({
//   name: 'counter',
//   initialState: {
//     value: 0,
//     users: [],
//     loading: false,
//   } as CounterState,
//   reducers: {
//     increment: (state) => {
//       state.value += 1;
//     },
//     decrement: (state) => {
//       state.value -= 1;
//     },
//     incrementByAmount: (state, action: PayloadAction<number>) => {
//       state.value += action.payload;
//     },
//     addUser: (state, action: PayloadAction<User>) => {
//       state.users.push(action.payload);
//     },
//     setLoading: (state, action: PayloadAction<boolean>) => {
//       state.loading = action.payload;
//     },
//   },
// });

// export const { increment, decrement, incrementByAmount, addUser, setLoading } = counterSlice.actions;

// // Configure store
// const store = configureStore({
//   reducer: {
//     counter: counterSlice.reducer,
//   },
// });

// type RootState = ReturnType<typeof store.getState>;

// // Component
// const ReduxToolkitDemo: React.FC = () => {
//   return (
//     <Provider store={store}>
//       <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px' }}>
//         <h2>Redux Toolkit Demo</h2>
//         <CounterComponent />
//         <UserManager />
//       </div>
//     </Provider>
//   );
// };

// const CounterComponent: React.FC = () => {
//   const count = useSelector((state: RootState) => state.counter.value);
//   const dispatch = useDispatch();

//   return (
//     <div>
//       <h3>Counter: {count}</h3>
//       <button onClick={() => dispatch(increment())}>Increment</button>
//       <button onClick={() => dispatch(decrement())}>Decrement</button>
//       <button onClick={() => dispatch(incrementByAmount(5))}>Add 5</button>
//     </div>
//   );
// };

// const UserManager: React.FC = () => {
//   const users = useSelector((state: RootState) => state.counter.users);
//   const loading = useSelector((state: RootState) => state.counter.loading);
//   const dispatch = useDispatch();
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');

//   const handleAddUser = () => {
//     if (name && email) {
//       dispatch(addUser({
//         id: Date.now().toString(),
//         name,
//         email,
//       }));
//       setName('');
//       setEmail('');
//     }
//   };

//   return (
//     <div>
//       <h3>User Management</h3>
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
//         <button onClick={handleAddUser}>Add User</button>
//       </div>
//       <ul>
//         {users.map(user => (
//           <li key={user.id}>{user.name} - {user.email}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ReduxToolkitDemo;
export default {}