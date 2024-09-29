import React, {useState} from 'react'
import restaurantIndex from '../apis/restaurantIndex';
import { useLocation, useNavigate, useParams } from 'react-router-dom';


const AddRiview = () => {
    const {id} = useParams();
    const location = useLocation();
    const history = useNavigate();
    console.log(location);
    const [name, setName] = useState("");
    const [rating, setRating] = useState("");
    const [ review, setReview] = useState("");
    const handleSubmit = async (e)=> {
        e.preventDefault();
        const response = await restaurantIndex.post(`/${id}/addReview`,{
            name,
            review, 
            rating,
        } );
        history("/");
        history(location.pathname);
        console.log(response);
    }
 
  return (
  <div className="mb-2">
    <form action="">
        <div className="form-group row">
            <div className="col xs-8">
                <label htmlFor="name">Name:</label>
                <input value = {name} onChange = {(e)=> setName(e.target.value)}type="text" className="form-control" id = "name" placeholder='name'/>
            </div>
            <div className="col xs-4">
                <label htmlFor="Rating">Rating:</label>
                <select value = {rating} onChange={(e)=> setRating(e.target.value)} id="rating" className="form-control">
                    <option disabled>Rating</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </div>
        </div>
        <div className="form-group">
            <label htmlFor="Review">Review:</label>
            <textarea value = {review} onChange={(e)=>setReview(e.target.value)} id="review" className="form-control">review</textarea>
        </div>
        <button type='submit' onClick = {handleSubmit} className="btn btn-primary mt-4">Submit</button>
    </form>
  </div>
  )
}

export default AddRiview
