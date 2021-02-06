const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const app = express();
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const photo = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    }
});

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send("Success");
})

app.post('/signin', signin.handleSignin(db, bcrypt)); // Cool syntax can be used -- check signin file
app.post('/register', (req, res) => register.handleRegister(req, res, db, bcrypt));
app.get('/profile/:id', (req, res) => profile.handleProfile(req, res, db));
app.put('/image', (req, res) => photo.handleImage(req, res, db));
app.post('/imageurl', (req, res) => photo.handleApiCall(req, res));

app.listen(process.env.PORT || 3000, () => {
    console.log(`App is running on port ${process.env.PORT || 3000}`);
})
