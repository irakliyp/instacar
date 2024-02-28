import {useEffect} from 'react'
import {HashRouter as Router, Route, Routes, useNavigate} from "react-router-dom";
import {MainLayout} from "./pages/MainLayout";
import {HomePage} from "./pages/HomePage";
import {loadUsers} from "./store/actions/user.actions.js";
import {StoryPreview} from "./pages/StoryPreview.jsx";
import {Profile} from "./pages/Profile.jsx";
import {Posts} from "./cmps/Posts.jsx";
import {useSelector} from "react-redux";
import {Login} from "./pages/Login.jsx";
import {SignIn} from "./pages/SignIn";

function App() {
    const user = useSelector(storeState => storeState.usersModule.user);
    const users = useSelector(storeState => storeState.usersModule.users);
    useEffect( () => {
        async function fetchData() {
            await loadUsers();

        }
        fetchData();
    }, [user])

    const userNames = users?.map(userItem => `/${userItem.username}`);
    if(!userNames.length) return <div></div>

  return <Router>
          <main>
              <Routes>
                  <Route path="/" element={<MainLayout/>}>
                      <Route path="home" element={<HomePage/>}/>
                      {userNames && userNames.map(userItem => {
                      return <Route path={userItem} element={<Profile/>}>
                          <Route index element={<Posts/>}/>
                          <Route path="saved" element={<Posts/>}/>
                      </Route>
                      })}
                  </Route>
                  <Route path="/story/:storyId" element={<StoryPreview/>}/>
                  <Route path="login" element={<Login/>}/>
                  <Route path="signup" element={<SignIn/>}/>
              </Routes>
          </main>
      </Router>
}

export default App
