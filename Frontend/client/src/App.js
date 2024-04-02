import Dashboard from "Containers/Dashboard";
import Home from "Containers/Home";
import Login from "Containers/Login";
import Register from "Containers/Register/Register";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "Store";
import LoginAdmin from "Containers/Admin/LoginAdmin";
import AdminDashboard from "Containers/Admin/AdminDashboard";
import Edit from "Containers/Admin/Edit";
import Createuser from "Containers/Admin/CreateUser";

function App() {

  return (
    <Provider store={store}>
    
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      
      <Route path="/admin-login" element={<LoginAdmin/>}/>
      <Route path="/admin" element={<AdminDashboard/>}/>
      <Route path="/user-edit/:id" element={<Edit/>}/>
      <Route path="/create-user" element={<Createuser/>}/>



    </Routes>

    </Provider>

  );
}

export default App;
