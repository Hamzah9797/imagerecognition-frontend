import React,{Component} from 'react';
import Clarifai from 'clarifai';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation.js'
import ImageLink from './components/ImageLink/ImageLink.js'
import Logo from './components/Logo/Logo.js';
import ImageRecognition from './components/ImageRecognition/ImageRecognition.js';
import Rank from './components/Rank/Rank.js'
import SignIn from './components/SignIn/SignIn.js'
import Register from './components/Register/Register.js'
import './App.css';

const app = new Clarifai.App({
 apiKey: 'a726502e15934f7c9f16c80b22ddc6ee'
});

const particlesOptons={
	particles: {
    number:{
    	value:150,
    	density:{
    		enable:true,
    		value_area:800,
    	}
    }
  }
}

class App extends Component {
  constructor(){
    super();
    this.state={
      input: '',
      imageUrl:'',
      box:{},
      route:'signin',
      isSignedIn: false
    }
  }
  calculateFaceLocation=(data)=>{
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image=document.getElementById('inputimage');
    const width= Number(image.width);
    const height=Number(image.height);
    return{
      leftCol: clarifaiFace.left_col*width,
      topRow:clarifaiFace.top_row*height,
      rightCol:width-(clarifaiFace.right_col*width),
      bottomRow:height-(clarifaiFace.bottom_row*height)
    }
  }
  displayFaceBox=(box)=>{
    this.setState({box:box});
  }
  onInputChange = (event) => {
    this.setState({input:event.target.value});
  }
  onButtonSubmit=()=>{
    this.setState({imageUrl:this.state.input});
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(response=>this.displayFaceBox(this.calculateFaceLocation(response)))
    .catch(err=>console.log(err));
    }
    onRouteChange=(route)=>{
      if(route==='signout'){
        this.setState({isSignedIn: false})
      }else if (route==='home'){
        this.setState({isSignedIn: true})
      }
      this.setState({route:route});
    }

	render() {
    const {isSignedIn,imageUrl,box,route}= this.state;
        return (
           <div className="App"> 
           <Particles className='particles'  
           params={particlesOptons}/>
            <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
            {route==='home'
          ? <div>
            <Logo/>
           <Rank/>
           <ImageLink 
           onButtonSubmit={this.onButtonSubmit} 
           onInputChange={this.onInputChange}/>
           <ImageRecognition 
           box={box} 
           imageUrl={imageUrl}/>
           </div>
           :(
             route==='signin'
             ? <SignIn onRouteChange={this.onRouteChange}/>
             : <Register onRouteChange={this.onRouteChange}/>
            )
         }
         </div>
        	);
    }
}
export default App;
