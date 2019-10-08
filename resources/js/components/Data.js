// api consumer for recursive data
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';


export default class Data extends Component {
  state = {
    RecievedData: [],
    PostData: [],
    Attr: {
      0: 'name',
      1: 'type',
      2: 'content',
      3: 'action',
      4: 'id',
      5: 'subtype',
      6: 'add',
      7: 'url',
      8: 'entity_type',
      9: 'conteent',
    },
    loading: "loaded",

  };
  componentDidMount () {
    this.GetAllData();
  }

  GetAllData(){

    this.setState({loading:"loading"});

    axios.get('/api/show/Group_1')
    .then(response => {
      var RecievedData = response.data.content;
      this.setState({
        RecievedData: response.data.content,
        loading:"loaded"
      });
      this.CreatePostData(RecievedData);
    }).catch(error => {
      console.log(error);
      this.setState({loading:"failed"});
    });


    // axios.get('https://test-c6f20.firebaseio.com/Reports/Report_1.json')
    // .then(response => {
    //   this.setState({
    //     RecievedData: response,
    //     loading:"loaded"
    //   });
    // })
    // .catch(error => {
    //   this.setState({loading:"failed"});
    // });


    // axios.post('https://test-c6f20.firebaseio.com/Reports/Report_1.json',[1])
    // .then(response => {
    //   this.setState({loading:"loaded"});
    // })
    // .catch(error => {
    //   this.setState({loading:"failed"});
    // });

  }

  CreatePostData(RecievedData)  {
    var Attr = this.state.Attr;
    var result = {content: this.CreatePostDataHelper(RecievedData,Attr)};
    this.setState({
      PostData: result
    });

    return result;
  }

  CreatePostDataHelper(RecievedData, Attr)  {
    var result = Object.keys(RecievedData).map(function(keyName, i) {
      var result = {}
      result[Attr[0]] = RecievedData[keyName].name;
      result[Attr[1]] = RecievedData[keyName].type;
      result[Attr[4]] = RecievedData[keyName].id;
      // result[Attr[3]] = "update/delete";
      if (typeof RecievedData[keyName].content === "object"){
        result[Attr[8]] = RecievedData[keyName].entity_type;
        result[Attr[6]]= {}
        result[Attr[6]]["folder"] = null;
        result[Attr[6]]["file"] = null;
        // result[Attr[3]] = "create_folder"+"/"+"create_file";
        result[Attr[2]] = this.CreatePostDataHelper( RecievedData[keyName].content,Attr);
      } else {
        result[Attr[2]] = RecievedData[keyName].content;
      }
      return result;
    }, this);
    return result;
  }

  UpdatePostData (changerIdentifier,value){

    var PostData = this.state.PostData;
    eval(changerIdentifier+"=value");
    this.setState({
      PostData: PostData
    });

    var PostData = this.state.PostData;
    var DataString = JSON.stringify(PostData, null, 2);
    alert(DataString);

  }

  SendPostData(submitterIdentifier){
    event.preventDefault();
    var PostData = this.state.PostData;
    eval(submitterIdentifier+"['action']='update'");
    var Post = {
      "Data":PostData,
      "_token": "vcO9EvF6wZK0xEafB9Za7b43gO3Yhg56Lr6kB19D",
      "form": "data",

    }
    axios.post('/store/Group_1', Post)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    // axios.post('/store/Group_1', Post)
    // .then(function (response) {
    //   this.GetAllData();
    // });
  }

  render() {

    return (
      <div>

        {this.state.loading == "loading" ?
          <div style={{fontSize: "100px", textAlign: "center"}}>
            ⌛
          </div>
          : this.state.loading == "failed" ?
          <div style={{fontSize: "100px", textAlign: "center"}}>
            ⚠
          </div>
          :
          <pre>{JSON.stringify(this.state.RecievedData, null, 2) }</pre>

        }
      </div>

    );

    // return (
    //   <div>
    //     {this.state.loading == "loading" ?
    //       <div style={{fontSize: "100px", textAlign: "center"}}>
    //         ⌛
    //       </div>
    //       : this.state.loading == "failed" ?
    //       <div style={{fontSize: "100px", textAlign: "center"}}>
    //         ⚠
    //       </div>
    //       :
    //       <form >
    //
    //         <input type="hidden" name="_token" defaultValue="npSVkUIOsNL20SlLcSZeGJGBnmGSGE13wJMvXhqb" ></input>
    //         <input className="kv-di-no" type="text" name="form" defaultValue="data"></input>
    //         <br></br>
    //         <h2>JS Data</h2>
    //         <DataHelper
    //           identifier="PostData"
    //           Attr={this.state.Attr}
    //           RecievedData={this.state.RecievedData}
    //           UpdatePostData={(changerIdentifier,value) => this.UpdatePostData(changerIdentifier,value)}
    //           submit={(submitterIdentifier) => this.SendPostData(submitterIdentifier)}
    //           />
    //       </form>
    //     }
    //   </div>
    //
    // );
  }
}







// Recursive component
const DataHelper = ({ identifier,Attr, RecievedData, UpdatePostData, submit}) => {

  // var RecievedData = Object.values(RecievedData);
  // alert(JSON.stringify(RecievedData));
  // {JSON.stringify(RecievedData.content)}



  return (
    <ul className="kv-list-parent">
      {Object.keys(RecievedData).map((keyName, i) => (

        <li key={RecievedData[keyName].id}>


          <div className="kv-item-container  kv-di-in ">
            {/* Base Casfe */}
            {typeof RecievedData[keyName].content == "object" ?
              <div className="kv-di-in">📁</div>
              :
              <div className="kv-di-in">📃</div>
            }

            <label >
              <input className="kv-tog-on-ib-switch kv-tog-off-ib-switch" type="checkbox" name="checkbox" defaultValue="value" ></input>
              <input className="kv-field-container kv-name kv-tog-on-ib" type="text" name={identifier+"["+"'content'"+"]["+i+"]["+Attr[0]+"]"} defaultValue={RecievedData[keyName].name} ></input>
              <div className="kv-name-unedit kv-name kv-tog-off-ib ">{RecievedData[keyName].name}</div>
              <span className="kv-little-button ">^</span>
            </label>


            <input className="kv-di-no" type="text" name={identifier+"["+"'content'"+"]["+i+"]["+Attr[1]+"]"} defaultValue={RecievedData[keyName].type} ></input>
            <input className="kv-di-no" type="text" name={identifier+"["+"'content'"+"]["+i+"]["+Attr[4]+"]"} defaultValue={RecievedData[keyName].id} ></input>

            {typeof RecievedData[keyName].content == "object" &&
              <input className="kv-di-no" type="text" name={identifier+"["+"'content'"+"]["+i+"]["+Attr[8]+"]"} defaultValue={RecievedData[keyName].entity_type} ></input>
            }


            <button onClick={(submitterIdentifier) => {submit(identifier+"["+"'content'"+"]["+i+"]")}} className="kv-little-button" type="submit" name={identifier+"["+"'content'"+"]["+i+"]["+Attr[3]+"]"} value="update">✓</button>
            <button className="kv-little-button" type="submit" name={identifier+"["+"'content'"+"]["+i+"]["+Attr[3]+"]"} value="delete">×</button>



            {typeof RecievedData[keyName].content == "object" &&
              <label className="kv-po-re">
                <span className="kv-little-button ">+</span>
                <input className="kv-tog-on-bl-switch" type="checkbox" name="checkbox" defaultValue="value" ></input>
                <div className="kv-popover kv-tog-on-bl kv-item-container  kv-di-in" >
                  <div className="" >
                    <span>📁</span>
                    <input className="kv-field-container kv-name kv-di-in "  type="text"   name={identifier+"["+"'content'"+"]["+i+"]["+Attr[6]+"][folder]"}  ></input>
                    <button type="submit" className="kv-little-button" name={identifier+"["+"'content'"+"]["+i+"]["+Attr[3]+"]"} value="create_folder">+</button>
                  </div>
                  <div className="kv-mar-top-3">
                    <span>📃</span>
                    <input className="kv-field-container kv-name kv-di-in"  type="text" name={identifier+"["+"'content'"+"]["+i+"]["+Attr[6]+"][file]"} ></input>
                    <button type="submit" className="kv-little-button" name={identifier+"["+"'content'"+"]["+i+"]["+Attr[3]+"]"} value="create_file">+</button>
                  </div>
                </div>
              </label>
            }


          </div>
          {typeof RecievedData[keyName].content == "object" ?

            <DataHelper
              identifier= {identifier+"["+"'content'"+"]["+i+"]"}
              Attr= {Attr}
              RecievedData={RecievedData[keyName].content}
              UpdatePostData={(changerIdentifier,value) => {UpdatePostData(changerIdentifier,value)}}
              submit={(submitterIdentifier) => {submit(submitterIdentifier)}}
              />

            :
            <ul className="kv-list-parent">
              <li>
                <div className="kv-item-container ">
                  <textarea onChange={(changerIdentifier,value) => {UpdatePostData(identifier+"["+"'content'"+"]["+i+"]['"+Attr[2]+"']",event.target.value)}} className="kv-field-container kv-content-container kv-di-in" name={identifier+"["+"'content'"+"]["+i+"]["+Attr[2]+"]"} rows="8" defaultValue={RecievedData[keyName].content}></textarea>
                </div>
              </li>
            </ul>
          }
        </li>
      ))}

    </ul>


  )
}
