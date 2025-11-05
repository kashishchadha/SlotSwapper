import './App.css'
import {BrowserRouter,Route,Routes} from  "react-router"
import Login from './pages/auth/Login'
import Calender from './pages/dashboard/calender'
import Market from './pages/marketplace/Markets'
import Request from './pages/requests/Request'
import Profile from './pages/profile/Profile'
import Landing from './pages/landing/Landing'
function App() {

  return (
    <>
    <div className=''>
     <BrowserRouter>
    <Routes>
                <Route path="/market" element={<Market/>}/>
              <Route path="/request" element={<Request/>}/>
              <Route path="/profile" element={<Profile/>}/>
                <Route path="/" element={<Landing/>}/>

              <Route path="/auth" element={<Login/>}/>
              <Route path="/calender" element={<Calender/>}/>

    </Routes>
    </BrowserRouter>
    </div>
    </>
  )
}

export default App
