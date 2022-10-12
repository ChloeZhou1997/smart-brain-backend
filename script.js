const express = require('express');
const cors = require('cors');


const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const knex = require('knex');
const bcrypt = require('bcrypt-nodejs');
const database = knex({
	client: 'pg',
	connection:{
		host: '127.0.0.1',
		user: 'zhouqiaohui',
		password:'',
		database:'smart-brain'
	}
});

const app = express();

app.use(express.json());
app.use(cors());



app.get('/',(req,res)=>{
	res.send(database.users);
})

app.post('/signin',signin.handleSignin(database,bcrypt));

app.post('/register', register.handleRegister(database,bcrypt));

// app.get('/profile/:id', (req,res)=> {profile.handleProfileGet(req,res,database)});
app.get('/profile/:id', profile.handleProfileGet(database));

// app.put('/image',(req,res)=>{image.handleImage(req,res,database)});
app.put('/image',image.handleImage(database));

app.post('/imageURL',image.handleApiCall)

app.listen(3001, ()=>{
	console.log('APP IS RUNNING !!!!!');
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
