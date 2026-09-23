// // components/JotaiDemo.tsx
// import React, { useState } from 'react';
// import { Provider, atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
// import { atomWithStorage } from 'jotai/utils';

// // Define types
// interface User {
//   id: string;
//   name: string;
//   email: string;
// }

// // Atoms
// const countAtom = atom(0);
// const usersAtom = atom<User[]>([]);
// const loadingAtom = atom(false);

// // Persistent atom
// const persistentCountAtom = atomWithStorage('jotai-persistent-count', 0);

// // Derived atoms
// const userCountAtom = atom((get) => get(usersAtom).length);
// const filteredUsersAtom = atom((get) => 
//   get(usersAtom).filter(user => user.name.length > 0)
// );

// // Write-only atoms
// const incrementAtom = atom(null, (get, set) => {
//   set(countAtom, get(countAtom) + 1);
// });

// const decrementAtom = atom(null, (get, set) => {
//   set(countAtom, get(countAtom) - 1);
// });

// const addUserAtom = atom(null, (get, set, user: User) => {
//   set(usersAtom, [...get(usersAtom), user]);
// });

// // Component
// const JotaiDemo: React.FC = () => {
//   return (
//     <Provider>
//       <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px' }}>
//         <h2>Jotai Demo</h2>
//         <CounterComponent />
//         <PersistentCounter />
//         <UserManager />
//         <UserStats />
//       </div>
//     </Provider>
//   );
// };

// const CounterComponent: React.FC = () => {
//   const [count, setCount] = useAtom(countAtom);
//   const [, increment] = useAtom(incrementAtom);
//   const [, decrement] = useAtom(decrementAtom);

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

// const PersistentCounter: React.FC = () => {
//   const [persistentCount, setPersistentCount] = useAtom(persistentCountAtom);

//   return (
//     <div>
//       <h3>Persistent Counter: {persistentCount}</h3>
//       <button onClick={() => setPersistentCount(persistentCount + 1)}>
//         Increment Persistent
//       </button>
//     </div>
//   );
// };

// const UserManager: React.FC = () => {
//   const [users] = useAtom(usersAtom);
//   const [, addUser] = useAtom(addUserAtom);
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

// const UserStats: React.FC = () => {
//   const userCount = useAtomValue(userCountAtom);
//   const filteredUsers = useAtomValue(filteredUsersAtom);

//   return (
//     <div>
//       <h3>User Stats</h3>
//       <p>Total Users: {userCount}</p>
//       <p>Filtered Users: {filteredUsers.length}</p>
//     </div>
//   );
// };

// export default JotaiDemo;
export default {}