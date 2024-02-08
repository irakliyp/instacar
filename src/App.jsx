import {useEffect, useState} from 'react'
import {HashRouter as Router, Route, Routes} from "react-router-dom";
import {MainLayout} from "./pages/MainLayout";
import {HomePage} from "./pages/HomePage";
import {loadUsers, login} from "./store/actions/user.actions.js";
import {StoryPreview} from "./pages/StoryPreview.jsx";
import {Profile} from "./pages/Profile.jsx";
import {Posts} from "./cmps/Posts.jsx";
import {Saved} from "./cmps/Saved.jsx";
import {useSelector} from "react-redux";

function App() {
    const user = useSelector(storeState => storeState.usersModule.user);
    useEffect( () => {
        async function fetchData() {
            await loadUsers();
            await login({username: 'Irakliy'});
        }
        fetchData();
    }, [])

  return <Router>
          <main>
              <Routes>
                  <Route path="/" element={<MainLayout/>}>
                      <Route path="home" element={<HomePage/>}/>
                      <Route path={user.username} element={<Profile/>}>
                          <Route index element={<Posts/>}/>
                          <Route path="saved" element={<Saved/>}/>
                      </Route>
                  </Route>
                  <Route path="/story/:storyId" element={<StoryPreview/>}/>
              </Routes>
          </main>
      </Router>
}

export default App
