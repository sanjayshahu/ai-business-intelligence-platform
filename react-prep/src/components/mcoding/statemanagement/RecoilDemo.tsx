// // components/RecoilDemo.tsx
// import React, { useState } from 'react';
// import { 
//   RecoilRoot, 
//   atom, 
//   selector, 
//   useRecoilState, 
//   useRecoilValue, 
//   useSetRecoilState 
// } from 'recoil';

// // Define types
// interface User {
//   id: string;
//   name: string;
//   email: string;
// }

// // Atoms
// const countState = atom({
//   key: 'countState',
//   default: 0,
// });

// const usersState = atom<User[]>({
//   key: 'usersState',
//   default: [],
// });

// const loadingState = atom({
//   key: 'loadingState',
//   default: false,
// });

// // Selectors
// const userCountState = selector({
//   key: 'userCountState',
//   get: ({ get }) => {
//     const users = get(usersState);
//     return users.length;
//   },
// });

// const filteredUsersState = selector({
//   key: 'filteredUsersState',
//   get: ({ get }) => {
//     const users = get(usersState);
//     return users.filter(user => user.name.length > 0);
//   },
// });

// // Components
// const RecoilDemo: React.FC = () => {
//   return (
//     <RecoilRoot>
//       <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px' }}>
//         <h2>Recoil Demo</h2>
//         <CounterComponent />
//         <UserManager />
//         <UserStats />
//       </div>
//     </RecoilRoot>
//   );
// };

// const CounterComponent: React.FC = () => {
//   const [count, setCount] = useRecoilState(countState);

//   const increment = () => setCount(count + 1);
//   const decrement = () => setCount(count - 1);
//   const incrementByAmount = (amount: number) => setCount(count + amount);

//   return (
//     <div>
//       <h3>Counter: {count}</h3>
//       <button onClick={increment}>Increment</button>
//       <button onClick={decrement}>Decrement</button>
//       <button onClick={() => incrementByAmount(5)}>Add 5</button>
//     </div>
//   );
// };

// const UserManager: React.FC = () => {
//   const [users, setUsers] = useRecoilState(usersState);
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');

//   const addUser = () => {
//     if (name && email) {
//       setUsers(oldUsers => [
//         ...oldUsers,
//         {
//           id: Date.now().toString(),
//           name,
//           email,
//         },
//       ]);
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
//         <button onClick={addUser}>Add User</button>
//       </div>
//       <ul>
//         {users.map(user => (
//           <li key={user.id}>{user.name} - {user.email}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// const UserStats: React.FC = () => {
//   const userCount = useRecoilValue(userCountState);
//   const filteredUsers = useRecoilValue(filteredUsersState);

//   return (
//     <div>
//       <h3>User Stats</h3>
//       <p>Total Users: {userCount}</p>
//       <p>Filtered Users: {filteredUsers.length}</p>
//     </div>
//   );
// };

// export default RecoilDemo;
export default {}