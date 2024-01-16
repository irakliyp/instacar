import { useState } from 'react'
import {Provider} from "react-redux";
import {store} from "./store/store.js";
import {HashRouter as Router, Route, Routes} from "react-router-dom";
import {MainLayout} from "./pages/MainLayout";
import {HomePage} from "./pages/HomePage";

function App() {
  const [count, setCount] = useState(0)
    console.log("HELLO")

  return <Provider store={store}>
      <Router>
          <main>
              <Routes>
                  <Route path="/" element={<MainLayout/>}>
                      <Route path="home" element={<HomePage/>}/>
                  </Route>
              </Routes>
          </main>
      </Router>
  </Provider>
}

export default App
