const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: process.env.API_CLARIFAI // Inputed from heroku as enviornmental variable
});

const handleApiCall = (req, res) => {
    app.models
        .predict("d02b4508df58432fbb84e800597b8959", req.body.input)
        .then(data => {
            res.json(data)
        })
        .catch(err => res.status(400).json("Unable to work with API"))
}

const handleImage = (req, res, db) => {
    const { input } = req.body;
    db('users').where('id', '=', input)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0])
        })
        .catch(err => res.status(400).json('Unable to get entries'))
}

module.exports = {
    handleImage,
    handleApiCall
}