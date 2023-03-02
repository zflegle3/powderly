import { useSelector, useDispatch } from 'react-redux';
import { FaStar, FaRegStar} from 'react-icons/fa';
import { addFavorite, removeFavorite } from '../../features/auth/authSlice';

function FavoriteIcon({resortData, favoriteStatus}) {
    const dispatch = useDispatch();
    const {user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);


    const toggleFavorite = (e) => {
        e.preventDefault();
        e.stopPropagation();
        let selected = {
            locId: resortData.refId,
            userId: user._id
        }
        if (favoriteStatus) {
            dispatch(removeFavorite(selected));
        } else {
            dispatch(addFavorite(selected));
        }
    }


    if (favoriteStatus) {
        return (
            <div className='title favorite' onClick={toggleFavorite}>
                <p className="resort-name">{resortData.name}</p>
                <div className="header-icon favorite" >
                    <FaStar/>
                </div>
            </div>
        )
    } else {
        return (
            <div className='title' onClick={toggleFavorite}>
                <p className="resort-name">{resortData.name}</p>
                <div className="header-icon" >
                    <FaRegStar/>
                </div>
            </div>
        )
    }
};

export default FavoriteIcon;
