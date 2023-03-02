const USER_ID = 'j_o_z';
// Your PAT (Personal Access Token) can be found in the portal under Authentification
const PAT = '05bbb7d6de9c43118c0cf7b9ecb86fed';
const APP_ID = 'my-first-application';
// Change these to whatever model and image URL you want to use
const MODEL_ID = 'face-detection';
const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';   


const handleApiCall = (req,res) => {
	const raw = JSON.stringify({
	  "user_app_id": {
	      "user_id": USER_ID,
	      "app_id": APP_ID
	  },
	  "inputs": [
	      {
	          "data": {
	              "image": {
	                  "url": req.body.input
	              }
	          }
	      }
	    ]
	});

	const requestOptions = {
	    method: 'POST',
	    headers: {
	        'Accept': 'application/json',
	        'Authorization': 'Key ' + PAT
	    },
	    body: raw
	};

	fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
	    .then(response => response.json())
	    .then(response => res.json(response))
	    .catch(err => res.status(400).json("unable to fetch the API"));
}


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
	handleImage:handleImage,
	handleApiCall:handleApiCall 
};