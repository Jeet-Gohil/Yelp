import React , {useState, createContext} from 'react';

export const RestaurantContext = createContext();

export const RestaurantContextProvider = props => {
    const [Restaurants, Setrestaurants] = useState([]);
    const [selectedRestaurant, setSelectedRestaurant] = useState([]);
    const addRestaurants = (restaurant) => {
        Setrestaurants([...restaurant, restaurant]);
    }
    return (
        <RestaurantContext.Provider value = {{Restaurants, Setrestaurants, addRestaurants, 
        selectedRestaurant, setSelectedRestaurant}}>
            {props.children}
        </RestaurantContext.Provider>
    )
}

