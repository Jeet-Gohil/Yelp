import React, {useEffect} from 'react'
import restaurantIndex from '../apis/restaurantIndex';
import { useContext } from 'react';
import { RestaurantContext } from '../context/RestaurantContext';
import { useNavigate } from 'react-router-dom';


function RestaurantList(props) {
    
    const {Restaurants, Setrestaurants} = useContext(RestaurantContext);
    let history = useNavigate();
    useEffect(()=> {
        const fetchData = async()=> {
            try {
                const response = await restaurantIndex.get(`/`);
                
                Setrestaurants(response.data.data.restaurants);
            }
            catch(err){

            }
        }
        fetchData();
    }, [])
    const handleDelete = async (id,event)=> {
        event.stopPropagation();
        try {
            const response = await restaurantIndex.delete(`/${id}`);
            Setrestaurants(Restaurants.filter(e => {
                return (id !== e.id);
            }))
           
            console.log(response);
        }
        catch(err) {}
    }
    const handleUpdate = async(id, event)=> {
        event.stopPropagation();
        history(`/restaurants/${id}/update`);
    }
    const handleSelectRestaurant = async (id) => {
        history(`/restaurants/${id}`); 
    }
  return (
    <div class = "list-group">
      <table className="table table-hover table-dark">
        <thead>
            <tr className="table-primary">
                <th scope = "col">Restaurant</th>
                <th scope = "col">Location</th>
                <th scope = "col">Price_range</th>
                <th scope = "col">Rating</th>
                <th scope = "col">Edit</th>
                <th scope = "col">Delete</th>
            </tr>
        </thead>
        <tbody>
             {
                 Restaurants &&  Restaurants.map((x)=> {
                    return (
                        <tr onClick = {()=> {
                            handleSelectRestaurant(x.id)
                        }}key = {x.id}>
                        <td>{x.name}</td>
                        <td>{x.location}</td>
                        <td>{x.price_range}</td>
                        <td>reviews</td>
                        <td>
                        <button className="btn btn-warning" onClick={(event)=> handleUpdate(x.id, event)}>Update</button>
                        </td>
                        <td>
                        <button className="btn btn-danger" onClick={(event)=>handleDelete(x.id, event)}>DELETE</button>   
                        </td>
                    </tr>
                    )
                })
            } 
              {/* <tr>
               <td>mcDonalds</td>
                 <td>IBC</td>
                 <td>150</td>
                 <td>rating</td>
                 <td>
                     <button className="btn btn-warning">Update</button>
                 </td>
                 <td>
                     <button className="btn btn-danger">DELETE</button>
                 </td>
                
             </tr>

             <tr>
                 <td>mcDonalds</td>
                 <td>IBC</td>
                 <td>150</td>
                 <td>rating</td>
                 <td>
                     <button className="btn btn-warning">Update</button>
                 </td>
                 <td>
                     <button className="btn btn-danger">DELETE</button>
                 </td>
                
             </tr>    */}
        </tbody>
      </table>
    </div>
  )
}

export default RestaurantList
