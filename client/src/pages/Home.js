import React from "react";
import Status from "../components/home/Status";
import Posts from "../components/home/Posts";
function Home() {
    return (
        <div className="home row mx-0">
            <Status />
            <Posts />
        </div>
    )
}

export default Home