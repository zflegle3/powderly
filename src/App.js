import { useState, useEffect, useMemo } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useNavigate,
} from "react-router-dom";
import {reset} from "./features/auth/authSlice";
import { useSelector, useDispatch } from 'react-redux';

//Styles
import "./custom-styles/app.scss";
import "./custom-styles/calendar.scss";
import "./custom-styles/auth.scss";
import "./custom-styles/modal.scss";

//Components
import Home from "./components/Home"
// import Chat from "./components/Chat"
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import PasswordReset from "./components/auth/PasswordReset";
import Reset from "./components/auth/Reset";
import ModalContainer from './components/modals/ModalContainer';

function App() {
  // const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const {user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);
  console.log(process.env.REACT_APP_GOOGLE_MAPS_API);
  console.log(process.env.NODE_ENV);


  useEffect(() => {
    //resets auth state anytime dependencies change
    dispatch(reset());
  }, [user, isError, isSuccess, message, dispatch])


  if (user) {
    console.log(user);
    return (
      <Router>
        <Routes>
          <Route exact path="/" element={
            <>
              <Home/>  
              <ModalContainer/>
            </>
          }/>
          <Route path="*" element={<Navigate to="/" replace={true} />}/>
        </Routes>
      </Router>
    );
  } else {
    return (
      <Router>
        <Routes>
          <Route exact path="/login" element={<Login />}/>
          <Route exact path="/signup" element={<SignUp/>}/>
          <Route exact path="/forgot" element={<PasswordReset/>}/>
          <Route exact path="/reset/:email/:id/:token" element={<Reset/>}/>
          <Route path="*" element={<Navigate to="/login" replace={true} />}/>
        </Routes>
      </Router>
    );
  };
};

export default App;
