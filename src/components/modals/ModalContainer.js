import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from '../../features/modals/modalSlice';
import ReactDom from "react-dom";
//Components
// import NewLeagueModal from "./NewLeagueModal";
// import EditSettingsModal from './EditSettingsModal';
import UserAccountModal from './UserAccountModal';



function ModalContainer({profileImage}) {
    const dispatch = useDispatch();
    const { status } = useSelector((state) => state.modal)

    const close = () => {
        dispatch(closeModal());
    }

    if (status === "user-account") {
        return ReactDom.createPortal(
            <>  
                <div className="modal-overlay" onClick={close}></div>
                <UserAccountModal profileImage={profileImage}/>
            </>,
            document.getElementById("modal-portal")
        );

    } else {
        return null;
    }
    // else if (status === "edit-settings") {
    //     return ReactDom.createPortal(
    //         <>  
    //             <div className="modal-overlay" onClick={close}></div>
    //             <EditSettingsModal />
    //         </>,
    //         document.getElementById("modal-portal")
    //     );

    // } 


}

export default ModalContainer;