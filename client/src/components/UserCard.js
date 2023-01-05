import React from "react";
import Avatar from "./Avatar";
import { Link } from "react-router-dom";

const UserCard = ({ user, handleClose }) => {
    const handleCloseAll = () => {
        if (handleClose)
            handleClose()
    }
    return (
        <div className="d-flex p-2 align-item-center border" >
            <div>
                <Link to={`/Profile/${user._id}`} onClick={handleCloseAll}
                    className="d-flex align-item-center">
                    <Avatar src={user.avatar} size="medium-avatar" />
                    <div className="ml-1" style={{ transform: 'translateY(-2px)' }}>
                        <small>{user.fullname}</small>
                    </div>
                </Link>
            </div>
        </div >
    )
}

export default UserCard 