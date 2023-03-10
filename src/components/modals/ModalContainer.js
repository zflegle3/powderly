import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from '../../features/modals/modalSlice';
import ReactDom from "react-dom";
//Components
// import NewLeagueModal from "./NewLeagueModal";
// import EditSettingsModal from './EditSettingsModal';
import UserAccountModal from './UserAccountModal';



function ModalContainer({profileImage, resorts}) {
    const dispatch = useDispatch();
    const { status } = useSelector((state) => state.modal)

    const close = () => {
        dispatch(closeModal());
    }

    if (status === "user-account") {
        return ReactDom.createPortal(
            <>  
                <div className="modal-overlay" onClick={close}></div>
                <UserAccountModal profileImage={profileImage} resorts={resorts}/>
            </>,
            document.getElementById("modal-portal")
        );

    } else {
        return null;
    }
}

export default ModalContainer;