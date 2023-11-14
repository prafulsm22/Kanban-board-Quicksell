import React, {useState, useEffect} from 'react';
import Board from './Board/Board';
import GroupingDropdown from './GroupingDropdown/GroupingDropdown';
import { ChevronDown, Sliders } from 'react-feather';
import './App.css' // Make sure your CSS file is correctly referenced

const App = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [grouping, setGrouping] = useState(localStorage.getItem('grouping') || 'status');
    const [ordering, setOrdering] = useState(localStorage.getItem('ordering') || 'priority');

     // Update localStorage whenever grouping or ordering changes
     useEffect(() => {
      localStorage.setItem('grouping', grouping);
      localStorage.setItem('ordering', ordering);
  }, [grouping, ordering]);


    const handleDisplayClick = () => {
      setShowDropdown(!showDropdown); // Toggle visibility of the dropdown
    };
  
    const handleGroupingChange = (newGrouping) => {
      setGrouping(newGrouping);
      // Additional logic for when grouping changes
    };
  
    const handleOrderingChange = (newOrdering) => {
      setOrdering(newOrdering);
      // Additional logic for when ordering changes
    };
 return (
    <div className="App">
        <div className='App_navbar'>
        <button className="display-button" onClick={handleDisplayClick}>
          <Sliders className='slider' /> Display <ChevronDown/>
        </button>
        {showDropdown && (
          <GroupingDropdown onGroupingChange={handleGroupingChange} onOrderingChange={handleOrderingChange} />
        )}
        
        </div>
        <div className='App_outer'>
            <div className='App_boards'>
                <Board grouping={grouping} ordering={ordering} ></Board>
            </div>
        </div>
    </div>
  );
 };

export default App;
