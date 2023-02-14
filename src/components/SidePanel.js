import { FaSort } from 'react-icons/fa';
import ConditionsDisplay from './ConditionsDisplay';


function SidePanel({searchResults}) {
    console.log("Search Results...", searchResults)



    // if (searchResults) {
    //     let resortDisplays = searchResults.map(resortData => {
    //         <ConditionsDisplay resortData={resortData}/>
    //     })
    // }

    if (searchResults) {
        return (
            <div className="side-panel-display">
                <header>
                    <h2>{searchResults.length} Resorts Found</h2>
                    <div className="sort-control">
                        <div className='sort-icon'>
                            <FaSort/>
                        </div>
                        <p>Sort by Current Conditions</p>
                    </div>
                </header>
                <div className='resorts-display'>
                    {searchResults.map((resortData) => <ConditionsDisplay resortData={resortData}/>)}
                </div>

            </div>
          );

    } else {
        return (
            <div className="side-panel-display">
                Loading Panel Results
            </div>
          );
    }
  }
  
  export default SidePanel;