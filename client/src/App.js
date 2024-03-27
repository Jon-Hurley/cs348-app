// import logo from './logo.svg';
// import './App.css';
// import Login from './components/login.js';

// import axios from 'axios';
// import {useState} from 'react';


// function App() {

//   const [name, setName] = useState('');

//   const [placeholder, setPlaceholder] = useState('Enter your name');

//   function apiCall() {
//     axios.post('http://localhost:8080/', {
//         name: placeholder
//     }).then((res) => {
//       console.log(res);
//       setName(res.data);
//     }
//     );
//   }

  
//   function MyComponent() {
//     return (
//       <div>
//         <p> {name} </p>
//       </div>
//     );
//   }

//   return (
//     // <div className="App">
//     //   <header className="App-header">
//     //     <img src={logo} className="App-logo" alt="logo" />
//     //     <p>
//     //       Edit <code>src/App.js</code> and save to reload.
//     //     </p>
//     //     <a
//     //       className="App-link"
//     //       href="https://reactjs.org"
//     //       target="_blank"
//     //       rel="noopener noreferrer"
//     //     >
//     //       Learn React
//     //     </a>
//     //   </header>
//     // </div>
//     <div className="App">
//       <header className="App-header">
//       {/* <p> Let's see if this works.</p>
//       <MyComponent/>
//       <input type="text" placeholder="Enter your name" onChange={(e) => setPlaceholder(e.target.value)}/>
//       <button onClick={apiCall}>Call Server</button> */}
//       <Login/>
      
//       </header>
//     </div>

//   );
// }

// export default App;


import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/landing_page.js';
import Login from './components/login.js';
import CreateAccount from './components/create_account.js';
import AccountPage from './components/account_page.js';
import ProductsPage from './components/shop.js';
import PublishProductPage from './components/publish_product.js';
import MyProductsPage from './components/my_products.js';

let user = {
  username: '',
  isCreator: false
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="login" element={<Login user={user}/>} />
        <Route path="create-account" element={<CreateAccount/>} />
        <Route path="account" element={<AccountPage/>} />
        <Route path="shop" element={<ProductsPage/>} />
        <Route path="publish-product" element={<PublishProductPage/>} />
        <Route path="my-products" element={<MyProductsPage/>} />
        {/* <Route path="product/:id" element={<ProductPage/>} /> */}
        <Route path="*" element={<h1>Page not found</h1>} />
      </Routes>
    </Router>
  );
};

export default App;
