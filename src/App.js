import './App.css';
import Home from './Screens/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from './Screens/Login';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';

import Signup from './Screens/Signup';
import MyOrder from './Screens/MyOrder';
import { CartProvider } from './components/ContextReducer';
// import Cart from './Screens/Cart';
//Upgrade bootstrap to 5.2.0-beta1 by running the following command:
//npm install bootstrap@5.2.0-beta1


// <Switch> changes with Routes
function App() {
  return (
    <CartProvider>
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route exact path="/Login" element={<Login/>}/>
            <Route exact path="/createuser" element={<Signup/>}/>
            <Route exact path="/myOrder" element={<MyOrder/>}/> 
          </Routes>
        </div>
      </Router>
    </CartProvider> 
  );
}

export default App;
