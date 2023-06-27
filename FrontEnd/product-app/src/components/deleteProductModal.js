import React, { useState } from "react";
import "../styles/model.css"

const ConfirmModal = (props) => {
    const [callback, setCallback] = useState(null);

    const handleCancel = () => {
        props.handleCancel()
    }

    return (
        <>
            <div id="id01" class="modal">
                <span onclick="document.getElementById('id01').style.display='none'" class="close" title="Close Modal">×</span>
                <form class="modal-content" action="/action_page.php">
                    <div class="container">
                        <h1>Delete Account</h1>
                        <p>Are you sure you want to delete your account?</p>

                        <div class="clearfix">
                            <button type="button" onClick={() => handleCancel()} class="cancelbtn">Cancel</button>
                            <button type="button" onClick="document.getElementById('id01').style.display='none'" class="deletebtn">Delete</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};
export default ConfirmModal;
