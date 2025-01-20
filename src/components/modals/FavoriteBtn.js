import { useSelector, useDispatch } from 'react-redux';
import { removeFavorite } from '../../features/auth/authSlice';

function FavoriteBtn({locationName, locationId}) {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);


    //Delete Favorite
    const handleRemove = (e) => {
        e.preventDefault();
        let selected = {
            locId: locationId,
            userId: user._id
        }
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