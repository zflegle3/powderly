import { useSelector, useDispatch } from 'react-redux';
import { removeFavorite } from '../../features/auth/authSlice';

function FavoriteBtn({locationName, locationId}) {
    const dispatch = useDispatch();
    const {user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

    console.log(locationId)

    //Delete Favorite
    const handleRemove = (e) => {
        console.log(e);
        e.preventDefault();
        let selected = {
            locId: locationId,
            userId: user._id
        }
        console.log(selected);
        dispatch(removeFavorite(selected));
    }


    return (
        <button key={locationId} onClick={handleRemove}>
            <p>X</p>
            <p>{locationName}</p>
        </button>
    );
}

export default FavoriteBtn;