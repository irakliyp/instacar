import {useEffect, useState} from 'react'
import {HashRouter as Router, Route, Routes} from "react-router-dom";
import {MainLayout} from "./pages/MainLayout";
import {HomePage} from "./pages/HomePage";
import {loadUsers, login} from "./store/actions/user.actions.js";
import {useSelector} from "react-redux";

function App() {

    useEffect( () => {
        async function fetchData() {
            await loadUsers();
            await login({username: 'puki'});
            // ...
        }
        fetchData();
    }, [])

  return <Router>
          <main>
              <Routes>
                  <Route path="/" element={<MainLayout/>}>
                      <Route path="home" element={<HomePage/>}/>
                  </Route>
              </Routes>
          </main>
      </Router>
}

export default App
