import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import About from "./pages/About";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/about' element={<About/>} />
          <Route path='signin' element={<Signin/>} />
          <Route path='/signup' element={<Signup/>} />
          <Route path='/dashboard' element={<Dashboard/>} />
          <Route path='/projects' element={<Projects/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
