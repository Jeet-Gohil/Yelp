import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './Home';
import Restaurant from './Restaurant';
import PageUpdate from './PageUpdate';
import { RestaurantContextProvider } from '../context/RestaurantContext';

function App() {
  return (
    <RestaurantContextProvider>
    <div class = "container">
      <Router>
        <Routes>
            <Route path = "/" element = {<Home/>}/>
            <Route path = "/restaurants/:id" element = {<Restaurant/>}/>
            <Route path = '/restaurants/:id/update' element = {<PageUpdate/>}/>
        </Routes>
      </Router>
    </div>
    </RestaurantContextProvider>
   
  )
}

export default App;
