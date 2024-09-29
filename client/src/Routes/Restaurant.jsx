import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { RestaurantContext } from '../context/RestaurantContext';
import restaurantIndex from '../apis/restaurantIndex';
import { useContext } from 'react';
import Reviews from '../components/Reviews';
import AddRiview from '../components/AddRiview';

function Restaurant() {
  const {id} = useParams();
  const {selectedRestaurant, setSelectedRestaurant} = useContext(RestaurantContext);
 
  useEffect(()=> {
    const fetchData = async ()=> {
      try {
        const response = await restaurantIndex.get(`/${id}`);
      setSelectedRestaurant(response.data.data);
      console.log(selectedRestaurant.restaurants);

      
    }
      catch(err) {}
      
    }
    fetchData();
  }, []);
  return (
    <div>
      {selectedRestaurant && (
        <>
        <h1 className="text-center"></h1>
        <div className="mt-4">
          <Reviews reviews = {selectedRestaurant.review}/>
          <AddRiview/>
        </div>
        </>
      )}
    </div>
  )
}

export default Restaurant;
