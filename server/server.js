import express from 'express';
import env from 'dotenv';
import morgan from 'morgan';
import pg from 'pg';
import bodyParser from 'body-parser';
import cors from 'cors';


env.config();
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));


const db = new pg.Client({
    host :  process.env.PG_HOST,
    password : process.env.PG_PASSWORD,
    database : process.env.PG_DATABASE,
    user : process.env.PG_USER,
    port : process.env.PG_PORT,
});

db.connect();



app.get("/api/v1/restaurants", async (req, res)=> {
   try {
    const result = await db.query("SELECT * FROM  restaurants");
    const restaurantRatingData = await db.query("SELECT * FROM restaurants ")
    res.status(200).json({
        status: 200,
        results: result.rows.length,
        data: {
            restaurants : result.rows,
        }
    });
   }

   catch(err){
    
        res.send(err);
        console.log(err);
    }
});

//get a individual restaurant
app.get("/api/v1/restaurants/:id",async (req, res)=> {
    try {
        const id = req.params.id;
        console.log(id);
        const result = await db.query("SELECT * FROM restaurants WHERE id = $1", [id]);
        const review = await db.query("SELECT *  FROM reviews WHERE restaurant_id = $1", [id]);
        res.status(200).json({
            status: 200,
            data: {
                restaurants: result.rows[0],
                review: review.rows,
            }
        })
    }
    catch(err) {
        res.send(err);
        console.log(err);
    }

});



//create a restaurant
app.post("/api/v1/restaurants", async (req, res)=> {
    try{
        const restaurant = req.body.name;
        const location = req.body.location;
        const id = req.body.id;
        const price_range = req.body.price_range;
        const result = await db.query("INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3)", [restaurant,
            location, price_range,
        ]);
    }
    catch(err) {
        res.send(err);
        console.log(err);
    }
});

//update the restaurant
app.put("/api/v1/restaurants/:id", async (req, res)=> {
    try {
        const result = await db.query("UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 returning * ", [
            req.body.name, req.body.location, req.body.price_range, req.params.id
        ]);
        console.log(result);
    }
    catch(err) {
        res.send(err);
        console.log(err);
    }
})

//delete the restaurant
app.delete("/api/v1/restaurants/:id", async (req, res)=> {
    try {
        const result = await db.query("DELETE FROM restaurants WHERE id = $1", [req.params.id]);
    }
    catch(err) {
        res.send(err);
        console.log(err);
    }
});

//route for adding review
app.post("/api/v1/restaurants/:id/addReview", async (req, res)=> {
    try {
        const result = await db.query("INSERT INTO reviews (restaurant_id, name, review, rating) VALUES ($1, $2, $3, $4) returning *", [
            req.params.id, req.body.name, req.body.review, req.body.rating
        ]);
        res.status(201).json({
            status: "success",
            date: {
                review: result.rows[0],
            }
        })
    }
    catch(err) {
        res.send(err);
        console.log(err);
    }
})


app.listen(process.env.PORT , ()=> {
    console.log(`server is listening on ${process.env.PORT}`);
});



