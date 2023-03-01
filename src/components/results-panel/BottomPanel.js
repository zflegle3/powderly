import { FaSort, FaPlus } from 'react-icons/fa';
import ConditionsDisplay from './ConditionsDisplay';
import { useEffect, useState, useRef } from 'react';
import userEvent from '@testing-library/user-event';
import { useSelector, useDispatch } from 'react-redux';
import Sheet, { SheetRef } from 'react-modal-sheet';


function BottomPanel({searchResults, sortData, resorts, setLng, setLat}) {
    const [sortedResults, setSortedResults] = useState(searchResults);
    const {user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

    const [isOpen, setOpen] = useState(false);

    // const [isOpen, setOpen] = useState(false);
    // const ref = useRef();
    // const snapTo = (i) => ref.current?.snapTo(i);

    //Confirm Props
    console.log(sortData);
    



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
                    filterFavorites();
                    break;
                case 5:
                    sortSnow("freshSnow");
                    break;
                case 6:
                    sortSnow("snow24");
                    break;
                case 7:
                    sortSnow("snow74");
                    break;
                case 8:
                    sortSnow("topDepth");
                    break;
                case 9:
                    sortSnow("baseDepth");
                    break;
                default:
                    // code block
            }
        }
    },[searchResults, sortData]);


    // useEffect(() => {
    //     if (sortedResults) {
    //         setOpen(true);
    //     }
    // },[sortedResults]);


        
    if (sortedResults) {
        //conditionally renders Conditions display based on user favorite status
        let resultsDisplay = sortedResults.map((resortData) => {
            if(user.favorites.filter(favorite => favorite.refId === resortData.refId).length > 0) {
                return <ConditionsDisplay key={resortData.refId} resortData={resortData} favoriteStatus={true} setLng={setLng} setLat={setLat} setOpen={setOpen}/>
            } else {
                return <ConditionsDisplay key={resortData.refId} resortData={resortData} favoriteStatus={false} setLng={setLng} setLat={setLat} setOpen={setOpen}/>
            }

        })

        return (
            <> 
                <button className='bottom-panel-header' onClick={() => setOpen(true)}>
                    <h2>{sortedResults.length} Resorts Found</h2>
                    <div className="sort-control">
                        <div className='sort-icon'>
                            <FaSort/>
                        </div>
                        <p>Sorting by {sortData.title}</p>
                    </div>
                </button>

                <Sheet isOpen={isOpen} snapPoints={[0.9]} onClose={() => setOpen(false)}>
                    <Sheet.Container>
                        <Sheet.Header />
                        <Sheet.Content>{
                            <div className='bottom-panel-results'>
                                {resultsDisplay}
                            </div>
                        }</Sheet.Content>
                    </Sheet.Container>
                        {/* {resultsDisplay} */}
                        {/* <p>Add results here</p> */}
                    <Sheet.Backdrop onClick={() => setOpen(false)}/>
                </Sheet>

            </>
          );

    } else {
        return (null);
    }
  }
  
  export default BottomPanel;