import React from "react";

function NotFound() {
    return (
        <div className="position-relative" style={{
            minHeight: 'calc(100vh - 70px)'
        }}>
            <h2 className="position-absolute text-secondary"
                style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
            >
                404 | Đéo Found!
            </h2>
        </div>
    )
}

export default NotFound