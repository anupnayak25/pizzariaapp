import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import PlaceOrder from './pages/PlaceOrder'
import BuildPizza from './pages/BuildPizza'
import Cart from './pages/Cart'
import { Signin , Signup} from './pages/Auth'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <NavBar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/order' element={<PlaceOrder/>}/>
      <Route path='/build-pizza' element={<BuildPizza/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/signin' element={<Signin/>}/>
      <Route path='/signup' element={<Signup/>}/>

    </Routes>
    <Footer/>
    </>
  )
}

export default App
