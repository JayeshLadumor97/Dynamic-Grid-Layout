import React from 'react';
import classnames from 'classnames';
import './App.css'
import GridColumn from './GridColumn';


const defaultColums = [10,20,30,40]; // List of Columns Selection Options


// Component to show UI from Dropdown
function SelectColumnComponent({
  initializeGrid,
  isGridInitialized = false
}){


const [selectedValue , setSelectedValue ] = React.useState(defaultColums[1]); // State for Dropdown Values 


return (
  <div className="absolute-center">
    <label htmlFor="selectbox">
      Select the Number of Columns
    </label>
    <select disabled={isGridInitialized} id="selectbox" value={selectedValue} onChange={(e) => setSelectedValue(e.target.value) }>
      {defaultColums.map(col => <option key={col} value={col}> {col}</option>)}
    </select>
    <button id="create-grid" onClick={() => initializeGrid(parseInt(selectedValue))}>
       {isGridInitialized ? "Reset":"Create"} Grid
    </button>
  </div>)
}








function App() {

  
  const [gridObject,setGridObject] = React.useState({}); //Contain Records of Grid & Box


  // Fill Up Grid Object
  const createGrid = (count) => {
   
      if(Object.keys(gridObject).length){
          setGridObject({}); // Reset
      }
      else {
        // Fill up Grid Container
        let startPosition = new Date().getTime();
        let newObject = {};

        for(let i=startPosition;i<startPosition+count;i++){
          newObject[i] = [];
        }

        setGridObject(newObject);
      }
       

  } 

  


  const gridClassName = classnames("grid-container", {
    "no-grid-div-parent": Object.keys(gridObject).length === 0,
  });




  
  
  return (
    <div className="App">
      <SelectColumnComponent
        initializeGrid={createGrid}
        isGridInitialized={Object.keys(gridObject).length !== 0} />

      <div className={gridClassName}>
     
      {Object.keys(gridObject).length === 0 ? 
        <div className="no-grid-div">
          Please select the no. of colums and create grid
        </div>
      :
        <React.Fragment>
          {Object.keys(gridObject).map(gridColumn => 
               <GridColumn 
                data={gridObject[gridColumn]}
                pushBox={() => setGridObject({
                          ...gridObject,
                          [gridColumn]:[
                            ...gridObject[gridColumn],
                            {}
                          ]
                })} 
                removeBox={(gridIndex) => {
                  setGridObject({
                    ...gridObject,
                    [gridColumn]:gridObject[gridColumn].filter((gridFilt,index) => index !== gridIndex)
                  }) 
                }}
                />
        )}
      </React.Fragment>
      }
    </div>
    </div>
  );
}

export default App;
