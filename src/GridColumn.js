import React from 'react';
import cross from './Images/cross.svg'

// Component For Rendering Column when Data Changes 

export default class GridColumn extends React.PureComponent {

    constructor(props){
      super(props);
    }
  
    render(){
  
      const { pushBox, data , removeBox }  = this.props;
  
      return (<div>
        
        {
          data.map((box,index) => <div className="box-card">{index}
          <img src={cross} onClick={() => removeBox(index)} className="remove" />
          </div>)
        }
        <div className="add-box-section">
          <button type="button" onClick={() => pushBox()}>Add Box</button> 
        </div>
      </div>)
    }
  }