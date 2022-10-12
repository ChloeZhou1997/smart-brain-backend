const handleImage = (database)=>(req,res)=>{
	const {id} = req.body;
	let found = false;
	database('users').where('id', '=', id)
		.increment('entries',1)
		.returning('entries')
		.then(entries => {
			res.json(entries[0].entries)
		})
		.catch(err => res.status(400).json('unable to get count'));
}

module.exports = {
	handleImage:handleImage
};