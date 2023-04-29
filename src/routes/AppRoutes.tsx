import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import Login from "../components/LoginForm";
import SignUp from "../Pages/SignUp";
import Register from "../components/RegisterForm";
import Recados from "../Pages/Recados";
import List from "../components/Lista-Recados";


const AppRoutes: React.FC = () => {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home component={Login} />} /> 
          <Route path="/signup" element={<SignUp component={Register} />} />
          <Route path="/recados" element={<Recados component={List}/>}/>
        </Routes>
      </BrowserRouter>
    );
  };
  
  export default AppRoutes;