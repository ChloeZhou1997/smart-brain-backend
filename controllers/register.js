// const knex = require('knex');
// const bcrypt = require('bcrypt-nodejs');
// const database = knex({
// 	client: 'pg',
// 	connection:{
// 		host: '127.0.0.1',
// 		user: 'zhouqiaohui',
// 		password:'',
// 		database:'smart-brain'
// 	}
// });

const handleRegister = (database,bcrypt) => (req,res)=>{
	const {email, name, password} = req.body;
	if(!email || !name || !password){
		return res.status(400).json('incorrect form of submission');
	}
	const hash = bcrypt.hashSync(password);
		database.transaction(trx => {
			trx.insert({
				hash:hash,
				email:email,
			})
			.into('login')
			.returning('email')
			.then(loginEmail => {
				return trx('users')
					.returning('*')
					.insert({
						email: loginEmail[0].email,
						name: name,
						joined: new Date()
					})
					.then(user => {
						res.json(user);
					})
					.catch(err => res.status(400).json('unable to register using this information'));				
			})
			.then(trx.commit)
			.catch(trx.rollback)
		})


	// console.log(database.users[database.users.length-1]);
	// res.json(database.users[database.users.length-1]);
}

module.exports = {
	handleRegister: handleRegister
};