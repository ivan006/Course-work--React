import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'

export default class Data extends Component {
    constructor() {
      super();
      this.state = {
        data: [
          // {
          //   "id": 1,
          //   "name": "blabla",
          //   "body": "blabla",
          //   "created": "blabla",
          //   "updated": "blabla"
          // },
          // {
          //   "id": 2,
          //   "name": "blabla",
          //   "body": "blabla",
          //   "created": "blabla",
          //   "updated": "blabla"
          // }

        ]
      }
      // console.log(super());
    }
    componentWillMount() {
      axios.get('/api/show/Group_1').then(response => {
        this.setState({
          data: response.data
        });
      })
      // .catch(errors => {
      //   console.log(errors);
      // })
    }
    render() {
        return (
            <div className="w3-container w3-card w3-white w3-round w3-margin">
                <h1>
                    Data
                </h1>
                {this.state.data.map(dataitem => <li>{dataitem.body}</li>)}

            </div>
        );
    }
}


if (document.getElementById('data')) {
    ReactDOM.render(<Data />, document.getElementById('data'));
}
