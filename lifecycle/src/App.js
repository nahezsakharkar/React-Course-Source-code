import React, { Component } from 'react';

class Page extends Component{
  
  componentDidUpdate(prevProps,prevState){
    console.log("prevProps",prevProps)
    console.log("prevState",prevState)
    //Here We can compare previosProps with currentProps and make some apis calls
  }

  render(){
    console.log('Page - Rendered')
    return(
      <>
      <Navbar />
      <button onClick={()=>this.props.onUpdate()} >change</button>
     </>
    )
  }
}

const Navbar = () => {
  console.log('Navbar - Rendered');
  return (
    <h1>Navbar</h1>
  )
}

export default class App extends Component {

  state = {}

  handleChange = () => {
    this.setState({key:"value"});
  }

  //we dont have access to this. props inside constructor
  //to get access of this.props inside constructor we need to pass it as parameter to constructor
  //also call super method with props as parameter else it will give us undefined
  constructor(props) {
    super(props);
    console.log('App - Constructor');
    this.state = this.props.something;
  }

  componentDidMount() {
    //Make Ajax call
    //Call setState with new data
    //this.setState({});
    console.log('App - Mounted');
  }

  componentWillUnmount() {
    console.log('Child Component - Mounted');
  }

  render() {
    console.log('App - Rendered');
    return (
      <Page onUpdate={this.handleChange} />
    )
  }
}

