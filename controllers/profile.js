const handleProfileGet = (rdatabase)=>(req,res)=>{
	const {id} = req.params;
	let found = false;
	database.select('*').from('users').where({
		id:id
	}).then(user =>{
		if(user.length){
			res.json(user[0])
		} else {
			res.status(400).json('NOT fount');
		}
	})
}

module.exports = {
	handleProfileGet:handleProfileGet
};