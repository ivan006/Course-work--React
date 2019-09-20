import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';


export default class FileUpload extends Component {
   test() {
     alert(123);
   }
  render() {
    return (
      <div>
        <input type='file'></input>
        <button onClick='test()'>Click</button>
      </div>
    );
  }
}
