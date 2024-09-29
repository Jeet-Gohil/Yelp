import React , {useEffect, useState} from 'react'
import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { RestaurantContext } from '../context/RestaurantContext';
import restaurantIndex from '../apis/restaurantIndex';


const UpdatePage = () => {
  const {id} = useParams();
  const [name, SetName] = useState("");
  const [location,setLocation ] = useState("");
  const [price_range, setPrice] = useState("");
  const {Restaurants} = useContext(RestaurantContext);
  let history = useNavigate();
  useEffect(()=> {
    const fetchData = async()=> {
      const response = await restaurantIndex.get(`/${id}`);
      SetName(response.data.data.restaurants.name);
      setLocation(response.data.data.restaurants.location);
      setPrice(response.data.data.restaurants.price_range);
     
      
    }
    fetchData();
  }, []);

  const hanldeClick = async(e)=> {
    e.preventDefault();
    const updatedRestuarant = await restaurantIndex.put(`/${id}`, {
      name,
      location,
      price_range,
    });
    console.log(updatedRestuarant);
    history("/");
  };
  return (
    <div>
      
    <form>
  <div class="form-group row">
    <label class="col-sm-2 col-form-label">Restaurant Name</label>
    <div class="col-sm-10">
      <input type="text"  value = {name} onChange = {e=> SetName(e.target.value)}class="form-control" id="inputEmail3" placeholder="Restaurant Name"/>
    </div>
  </div>
  <div class="form-group row">
    <label  class="col-sm-2 col-form-label">Location</label>
    <div class="col-sm-10">
      <input type="text" value = {location} onChange={e => setLocation(e.target.value)} class="form-control" id="inputPassword3" placeholder="Location"/>
    </div>
  </div>
  <div class="form-group row">
    <label class="col-sm-2 col-form-label">Price Range</label>
    <div class="col-sm-10">
      <input type="number" value = {price_range} onChange = {e=> setPrice(e.target.value)} class="form-control" id="inputPassword3" placeholder="Price Range"/>
    </div>
  </div>
  
  <div class="form-group row">
    <div class="col-sm-10">
      <button onClick = {hanldeClick} type="submit" class="btn btn-primary">Save</button>
    </div>
  </div>
</form>
</div>
  )
}

export default UpdatePage
