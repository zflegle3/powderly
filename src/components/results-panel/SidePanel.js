import { FaSort, FaPlus } from 'react-icons/fa';
import ConditionsDisplay from './ConditionsDisplay';
import { useEffect, useState } from 'react';
import userEvent from '@testing-library/user-event';
import { useSelector, useDispatch } from 'react-redux';


function SidePanel({searchResults, sortData, resorts, setLng, setLat}) {
    const [sortedResults, setSortedResults] = useState(searchResults);
    const {user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

    console.log(searchResults)
    
    const trimResults = (filteredResults) => {
        // if (filteredResults.length > 10) {
        //     filteredResults.length=10;
        // }
        setSortedResults(filteredResults);
    }

    const sortAtoZ = () => {
        let sortedResults = [...searchResults];
        sortedResults.sort((a, b) => {
            const itemA = a.name.toUpperCase(); // ignore upper and lowercase
            const itemB = b.name.toUpperCase(); // ignore upper and lowercase
            if (itemA < itemB) {
                return -11;
            }
            if (itemA > itemB) {
                return 1;
            }
            return 0;
        });
        trimResults(sortedResults)
    }

    const sortZtoA = () => {
        let sortedResults = [...searchResults];
        sortedResults.sort((a, b) => {
            const itemA = a.name.toUpperCase(); // ignore upper and lowercase
            const itemB = b.name.toUpperCase(); // ignore upper and lowercase
            if (itemA < itemB) {
                return 1;
            }
            if (itemA > itemB) {
                return -1;
            }
            return 0;
        });
        trimResults(sortedResults)
    }

    const filterFavorites = () => {
        let filteredResults = searchResults.filter((searchResult) => {
            return user.favorites.some((favorite) => {
                return searchResult.refId === favorite.refId;
            });
        } );
        console.log(filteredResults)
        trimResults(filteredResults)
    }


    const sortSnow = (property) => {
        let filteredResults = [...searchResults];
        filteredResults.sort((a, b) => Number(b.conditions.current[`${property}`]) - Number(a.conditions.current[`${property}`]));
        trimResults(filteredResults)
    }

    const sortRating = () => {
        let filteredResults = [...searchResults];
        filteredResults.sort((a, b) => Number(b.conditions.forecast[0].rating) - Number(a.conditions.forecast[0].rating));
        trimResults(filteredResults)
    }


    useEffect(() => {
        console.log("sorting data...")
        if (searchResults) {
            switch(sortData.id) {
                case 0:
                    trimResults(searchResults)
                    break;
                case 1:
                    sortAtoZ();
                    break;
                case 2:
                    sortZtoA();
                    break;
                case 3:
                    sortRating();
                    break;
                case 4:
                    sortSnow("freshSnow");
                    break;
                case 5:
                    sortSnow("snow24");
                    break;
                case 6:
                    sortSnow("snow74");
                    break;
                case 7:
                    sortSnow("topDepth");
                    break;
                case 8:
                    sortSnow("baseDepth");
                    break;
                case 9:
                    filterFavorites();
                    break;
                default:
                    // code block
            }
        }
    },[searchResults, sortData]);


        
    if (sortedResults) {
        console.log(sortedResults);
        //conditionally renders Conditions display based on user favorite status
        let resultsDisplay = sortedResults.map((resortData) => {
            if(user.favorites.filter(favorite => favorite.refId === resortData.refId).length > 0) {
                return <ConditionsDisplay key={resortData.refId} resortData={resortData} favoriteStatus={true} setLng={setLng} setLat={setLat}/>
            } else {
                return <ConditionsDisplay key={resortData.refId} resortData={resortData} favoriteStatus={false} setLng={setLng} setLat={setLat}/>
            }

        })


        return (
            <div className="side-panel-display">
                <header>
                    <h2>{sortedResults.length} Resorts Found</h2>
                    <div className="sort-control">
                        <div className='sort-icon'>
                            <FaSort/>
                        </div>
                        <p>Sorting by {sortData.titleLong}</p>
                    </div>
                </header>
                <div className='resorts-display'>
                    {resultsDisplay}
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