// // components/MobXDemo.tsx
// import React, { useState } from 'react';
// import { makeAutoObservable } from 'mobx';
// import { observer } from 'mobx-react-lite';

// // Define types
// interface User {
//   id: string;
//   name: string;
//   email: string;
// }

// // Store
// class CounterStore {
//   count = 0;
//   users: User[] = [];
//   loading = false;

//   constructor() {
//     makeAutoObservable(this);
//   }

//   increment() {
//     this.count += 1;
//   }

//   decrement() {
//     this.count -= 1;
//   }

//   incrementByAmount(amount: number) {
//     this.count += amount;
//   }

//   addUser(user: User) {
//     this.users.push(user);
//   }

//   reset() {
//     this.count = 0;
//     this.users = [];
//   }

//   get userCount() {
//     return this.users.length;
//   }

//   get filteredUsers() {
//     return this.users.filter(user => user.name.length > 0);
//   }
// }

// const counterStore = new CounterStore();

// // Components
// const MobXDemo: React.FC = () => {
//   return (
//     <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px' }}>
//       <h2>MobX Demo</h2>
//       <CounterComponent />
//       <UserManager />
//       <UserStats />
//     </div>
//   );
// };

// const CounterComponent = observer(() => {
//   const { count, increment, decrement, incrementByAmount } = counterStore;

//   return (
//     <div>
//       <h3>Counter: {count}</h3>
//       <button onClick={() => increment()}>Increment</button>
//       <button onClick={() => decrement()}>Decrement</button>
//       <button onClick={() => incrementByAmount(5)}>Add 5</button>
//     </div>
//   );
// });

// const UserManager = observer(() => {
//   const { users, addUser } = counterStore;
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
// });

// const UserStats = observer(() => {
//   const { userCount, filteredUsers } = counterStore;

//   return (
//     <div>
//       <h3>User Stats</h3>
//       <p>Total Users: {userCount}</p>
//       <p>Filtered Users: {filteredUsers.length}</p>
//     </div>
//   );
// });

// export default MobXDemo;
export default {}