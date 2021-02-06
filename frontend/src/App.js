/*
  The start command in the package.json file has been updated from
  "start": "react-scripts start"

  to

  "start": "server -s build"
*/

import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Face from './components/Face/Face.js';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank.js';
import Particles from 'react-particles-js';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import './App.css';

const imageServer = 'https://guarded-reef-10826.herokuapp.com/image/';
const imageApiServer = 'https://guarded-reef-10826.herokuapp.com/imageurl/';

const particlesOptions = {
  particles: {
    number: {
      value: 60,
      density: {
        enable: true,
        value_area: 400
      }
    }
  }
}

const initialState = {
  input: '',
  imageURL: '',
  box: {},
  route: "signin",
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({ box })
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  onButtonSubmit = () => {
    const { input, user } = this.state;
    this.setState({imageURL: input})
    fetch(imageApiServer, {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: input
      })
    })
    .catch(err => console.log("onButtonSubmit 1, ", err))
    .then(response => response.json())
    .then(response => {
      if (response) {
        fetch(imageServer, {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            input: user.id
          })
        })
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(user, { entries: count }))
          })
          .catch(err => console.log("onButtonSubmit 2, ", err))
      }
      this.displayFaceBox(this.calculateFaceLocation(response))
    })
    .catch(err => console.log("onButtonSubmit 3, ", err))
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState);
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render() {
    const { isSignedIn, imageURL, route, box } = this.state;
    return (
      <div className="App">
        <Particles className = "particles"
          params={particlesOptions}
        />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        {route === 'home' 
          ? <div>
              <Logo />
              <Rank name={this.state.user.name} entries={this.state.user.entries} />
              <ImageLinkForm 
              onInputChange={this.onInputChange} 
              onButtonSubmit={this.onButtonSubmit}/>
              <Face imageURL={imageURL} box={box}/>
            </div>
          : (
            route === 'signin'
            ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          )
        }
      </div>
    );
  }
}

export default App;
