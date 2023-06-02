import './App.css';
import {Routes, Route} from "react-router-dom"
import Login from './Component/Login';
import SignUp from './Component/Signup';
import Main from './Component/Main';
import ChangeUserData from './Component/Changeuserdata'
import ForgotPassword from './Component/Forgotpassword';
import NewPassword from './Component/NewPassword';

function App() {
  return (
    <div>
      <div className='title-container'>
        <h1>LOGIN PRACTICE</h1>
      </div>
      <div className='main-container'>
        <Routes>
          <Route path='/' element={<Login />}/>
          <Route path='/Login' element={<Login />}/>
          <Route path='/Signup' element={<SignUp />}/>
          <Route path='/Changeuserdata' element={<ChangeUserData />} />
          <Route path='/Forgotpassword' element={<ForgotPassword />} />
          <Route path='/Newpassword' element={<NewPassword />} />
          <Route path='/Main' element={<Main />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
