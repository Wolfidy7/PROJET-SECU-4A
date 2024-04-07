//import logo from './assets/logo.svg';
import './styles/App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserList from './components/UserList';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         > 
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }



function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('/api/users')
      .then(response => setUsers(response.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div>
      <UserList users={users} />
    </div>
  );
}

export default App;
