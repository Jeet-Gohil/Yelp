import React, {useState} from 'react'
import restaurantIndex from '../apis/restaurantIndex';
import { useContext } from 'react';
import { RestaurantContext } from '../context/RestaurantContext';


function AddRestaurant() {
  const {AddRestaurants} = useContext(RestaurantContext);
  const [name, SetRestaurant] = useState("");
  const [location, SetLocation] = useState("");
  const [price_range, SetPrice] = useState();
  const handleAdd = async (e) => {
    
    try {
      const response = await restaurantIndex.post("/", {
        name,
        location,
         price_range
      })
      console.log(response);
    }
    catch(err) {

    }
  }
  return (
    <form>
  <div class="row">
    <div class="col">
      <input type="text" value={name} onChange={e => {
        SetRestaurant(e.target.value);
      }} class="form-control" placeholder="name"/>
    </div>
    <div class="col">
      <input type="text"value={location} onChange={e => {SetLocation(e.target.value)}} class="form-control" placeholder="location"/>
    </div>
    <div class = "col">
    <select value={price_range} onChange={e=> {SetPrice(e.target.value)}} class="custom-select my-1 mr-sm-2" id="inlineFormCustomSelect">
        <option selected>price Range</option>
        <option value="150">150</option>
        <option value="200">200</option>
        <option value="250">250</option>
      </select>
    </div>
    <div class = "col">
<button type="submit" onClick={handleAdd} class="btn btn-primary">Add</button>
    </div>
  </div>
</form>
  );
}

export default AddRestaurant;
