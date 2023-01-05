import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import PageRender from './customRouter/PageRender';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { useSelector, useDispatch } from 'react-redux';
import { refreshToken } from './redux/actions/authAction';
import Alert from './components/alert/Alert';
import Header from './components/Header/Header';
import StatusModal from './components/StatusModal';

function App() {
  const { auth, status } = useSelector(state => state)
  const dispatch = useDispatch()
  const varr = localStorage.getItem('firstLogin')
  useEffect(() => {
    dispatch(refreshToken())
  }, [dispatch])

  return (
    <Router>
      <Alert />
      <input type="checkbox" id="theme" />
      <div className="App">
        <div className="main">
          {varr && <Header />}
          {status && <StatusModal />}
          <Routes>
            <Route exact path="/" element={varr ? <Home /> : <Login />} />
            <Route exact path="/Register" element={<Register />} />
            <Route exact path="/Login" element={<Login />} />
            <Route exact path="/:page" element={<PageRender />} />
            <Route exact path="/:page/:id" element={<PageRender />} />
          </Routes>


        </div>
      </div>
    </Router>
  )
}

export default App;
