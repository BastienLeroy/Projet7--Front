import React from 'react';

// == Import : local
import './style.scss';

const Post = ({ dataPost, userImage }) => {
    console.log(dataPost);

    return (
        <div className="Post">
            <div className="Post_Info">
                <div className= "Post_Info_TitleImg">
                    <img src={userImage} />
                    <p>{dataPost.firstname} {dataPost.name}</p>
                </div>
                <p>{dataPost.date} {dataPost.time}</p>
            </div>
            <div className="Post_Img">
                <img src={dataPost.image_url} />
            </div>
            <div className="Post_Content">
                {dataPost.content}
            </div>
        </div>
    );
};

export default Post;