import React, { Component } from 'react';
import { Stage, Layer, Rect, Text, Circle, Shape, Image } from 'react-konva';
import Konva from 'konva';

class AZS_Image extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         _W: this.props._W,
         _H: this.props._H,
         _X: this.props._X,
         _Y: this.props._Y,
         src:this.props.Image,
      };
   }
   componentDidMount() {
      const image = new window.Image();
      image.src = this.state.src;//'/images/azk3.jpg';
      image.onload = () => {
         this.setState({
            image: image
         });
      };
   }
   render() {
      return (
         <Image
            image={this.state.image}
            width={this.state._W}
            height={this.state._H}
            x={this.state._X}
            y={this.state._Y}
            
         />
      );
   }
}

export default AZS_Image;
/*
draggable
*/