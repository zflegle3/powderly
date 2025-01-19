import { useState, useEffect, useMemo } from 'react';
import {
  BrowserRouter as Router,
  HashRouter,
  Routes,
  Route,
  Link,
  Navigate,
  useNavigate,
} from "react-router-dom";
import {reset} from "./features/auth/authSlice";
import { useSelector, useDispatch } from 'react-redux';

//Styles
import "./custom-styles/reset.scss";
import "./custom-styles/App.scss";
import "./custom-styles/logo.scss"
import "./custom-styles/Calendar.scss";
import "./custom-styles/auth.scss";
import "./custom-styles/Modal.scss";
import "./custom-styles/loading.scss";
import "./custom-styles/mobile.scss"

//Components
import Home from "./components/Home"
// import Chat from "./components/Chat"
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import PasswordReset from "./components/auth/PasswordReset";
import Reset from "./components/auth/Reset";
import ModalContainer from './components/modals/ModalContainer';

//Images
import defaultImg from "./images/avatars/avatar.png";

function App() {
  // const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const {user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);
  const [profileImage, setProfileImage] = useState(defaultImg);


  useEffect(() => {
    //resets auth state anytime dependencies change
    dispatch(reset());
  }, [user, isError, isSuccess, message, dispatch])


  useEffect(() => {
    if (user) {
      //set profile image
      if (user.profileImage) {
        setProfileImage(process.env.REACT_APP_API_URL+"/image/"+user.profileImage);
      } else {
        setProfileImage (defaultImg);
      }
    }

    let root = document.getElementById('root')
    if (user) {
      //set color theme
      root.classList = (user.theme)
    } else {
      //set default theme
      root.classList = ("")
    }

    let comboList = document.querySelector('.combo-box-list')
    if (comboList) {
      if (user) {
        //set color theme
        comboList.classList = `combo-box-list ${user.theme}`
      } else {
        //set default theme
        comboList.classList = `combo-box-list`
      }
    }

  }, [user])

  if (user) {
    return (
      // <div id="app" className={user.theme}>
        <HashRouter>
          <Routes>
            <Route exact path="/" element={<Home profileImage={profileImage}/> }/>
            <Route path="*" element={<Navigate to="/" replace={true} />}/>
          </Routes>
        </HashRouter>
      // </div>

    );
  } else {
    return (
      // <div id="app" >
        <HashRouter>
          <Routes>
            <Route exact path="/login" element={<Login />}/>
            <Route exact path="/signup" element={<SignUp/>}/>
            <Route exact path="/forgot" element={<PasswordReset/>}/>
            <Route path="/reset/:email/:id/:token" element={<Reset/>}/>
            <Route path="*" element={<Navigate to="/login" replace={true} />}/>
          </Routes>
        </HashRouter>
      // </div>
    );
  };
};

export default App;
