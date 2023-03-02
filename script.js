const express = require('express');
const cors = require('cors');


const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const knex = require('knex');
const bcrypt = require('bcrypt-nodejs');

const app = express();

app.use(express.json());
app.use(cors());


process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0; 
const database = knex({
	client: 'pg',
	connection : {
		connetionString: process.env.DATABASE_URL, 
		host : process.env.HOSTNAME,
		port: 5432,
		user: process.env.USERNAME,
		password: process.env.PASSWORD,
		database: process.env.DATABASE,
		ssl: {rejectUnauthorized: false}
	}
});


app.get('/',(req,res)=>{
	res.send("It's working");
});

app.post('/signin',signin.handleSignin(database,bcrypt));

app.post('/register', register.handleRegister(database,bcrypt));

// app.get('/profile/:id', (req,res)=> {profile.handleProfileGet(req,res,database)});
app.get('/profile/:id', profile.handleProfileGet(database));

// app.put('/image',(req,res)=>{image.handleImage(req,res,database)});
app.put('/image',image.handleImage(database));

app.post('/imageURL',image.handleApiCall)

app.listen(process.env.PORT || 3030, ()=>{
	console.log(`app is running on port ${process.env.PORT}`);
})

/*
/--> res = this is working 
/signin --> POST : success/failure
/register --> POST : user
/profile/:userId --> GET = user
/image --> PUT : user updated count

*/


// Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });
