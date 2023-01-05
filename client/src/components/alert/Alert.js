import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Loading from "./Loading";
import Toast from "./Toast";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";

function Alert() {
    const { alert } = useSelector(state => state)
    const dispatch = useDispatch()

    return (
        <div>
            {alert.loading && <Loading />}
            {
                alert.error &&
                <Toast msg={{ tille: 'Error', body: alert.error }}
                    handleShow={() => {
                        dispatch({ type: GLOBALTYPES.ALERT, payload: {} })
                    }}
                    bgColor="bg-danger"
                />
            }
            {
                alert.success &&
                <Toast
                    msg={{ tille: 'Success', body: alert.success }}
                    handleShow={() => {
                        dispatch({ type: GLOBALTYPES.ALERT, payload: {} })
                    }}
                    bgColor="bg-success"
                />
            }

        </div>
    )
}

export default Alert