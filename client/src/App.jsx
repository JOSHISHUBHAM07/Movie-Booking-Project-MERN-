import React from 'react'
import { Route,Routes,useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Movies from './pages/Movies'
import MovieDetails from './pages/MovieDetails'
import SeatLayot from './pages/SeatLayout'
import MyBooking from './pages/MyBooking'
import Favorite from './pages/Favorite'
import { Toaster } from 'react-hot-toast'
import Footer from './components/Footer'
import Layout from './pages/admin/Layout'
import Dashboard from './pages/admin/Dashboard'
import { AddShows } from './pages/admin/AddShows'
import ListShow from './pages/admin/ListShow'
import ListBooking from './pages/admin/ListBooking'



const App = () => {
  const isAdminRoute = useLocation().pathname.startsWith('/admin')
  


  return (
    <>
      <Toaster />
      

      {!isAdminRoute && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
        <Route path="/movies/:id/:date" element={<SeatLayot />} />
        <Route path="/my-booking" element={<MyBooking />} />
        <Route path="/favorite" element={<Favorite />} />
        <Route path='/admin/*' element={<Layout/>}>
          <Route index element={<Dashboard/>}/>
          <Route path='add-shows' element={<AddShows/>}/>
          <Route path='list-shows' element={<ListShow/>}/>
          <Route path='list-booking' element={<ListBooking/>}/>
          

        </Route>
      </Routes>
      {!isAdminRoute && <Footer />}
    </>
  );
}

export default App
