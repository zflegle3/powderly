import { addFocus, removeFocus} from '../../custom-styles/style';
import { FaRegCheckCircle } from 'react-icons/fa';


function PasswordChange({togglePasswordChange, setNewPassword, setCurrentPassword}) {


    return (
        <>
            <button onClick={togglePasswordChange}>Cancel Change Password</button>

            <div className={`form-item-container pass-current`}>
                <label htmlFor="pass-current">current password</label>
                <div className="input-container pass-in">
                    <input type="password" id="pass-current" name="pass-current" placeholder="Current password" onFocus={addFocus} onBlur={removeFocus} onChange={e => setCurrentPassword(e.target.value)}></input>
                </div>
                <p id="pass-error-current">Password Error</p>
            </div> 

            <div className={`form-item-container pass-in`}>
                <label htmlFor="pass-new">new password</label>
                <div className="input-container pass-in">
                    <input type="password" id="pass-new" name="pass-new" placeholder="New password" onFocus={addFocus} onBlur={removeFocus} onChange={e => setNewPassword(e.target.value)}></input>
                </div>
                <p id="pass-error">Password Error</p>
            </div> 

            <div className="pass-error-container">
                <div id="pass-error-signin-length">
                    <div>
                        <FaRegCheckCircle />
                    </div>
                    <p>have at least 8 characters</p>
                </div>
                <div id="pass-error-signin-upper">
                    <div>
                        <FaRegCheckCircle />
                    </div>
                    <p >have at least 1 Upper characters</p>
                </div>
                <div id="pass-error-signin-number">
                    <div>
                        <FaRegCheckCircle />
                    </div>
                    <p >have at least 1 number</p>
                </div>
                <div id="pass-error-signin-special">
                    <div>
                        <FaRegCheckCircle />
                    </div>
                    <p >have at least 1 special character (i.e. ! @ # $ % ^ & *)</p>
                </div>
            </div>
        
        </>
    )
}

export default PasswordChange;