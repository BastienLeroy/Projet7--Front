import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit, faCheck } from '@fortawesome/free-solid-svg-icons';

import Comment from './comment';

// == Import : local
import './style.scss';

const Post = ({ dataPost, userImage, userId, userIsMod }) => {

    const [comments, setComments] = useState([]);
    const [textareaValue, setTextareaValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [reFetchComments, setReFetchComments] = useState(false);

    const handleOnClickDisplayComments = async () => {
        setIsLoading(true);
        const getComments = await axios.get(`http://localhost:5000/api/comment/getAllComments?id=${dataPost.id}`);

        if (getComments.data.length !== 0) {
            setComments(getComments.data);
            setIsLoading(false);
        } else {
            setIsLoading(false);
        }
    };

    const handleOnClickAddComment = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const dataComment = {
            "postId": dataPost.id,
            "userId": userId,
            "content": textareaValue
        };

        const response = await axios.post(
            'http://localhost:5000/api/comment/createComment',
            dataComment,
            {
                withCredentials: true,
                headers: { 'Content-Type': 'application/json' }
            }
        );

        if (response.status === 201) {
            const getComments = await axios.get(`http://localhost:5000/api/comment/getAllComments?id=${dataPost.id}`);
            setComments(getComments.data);
            setTextareaValue('');
            setIsLoading(false);
        } else {
            setIsLoading(false);
        }
    };

    return (
        <div className="Post">
            <div className="Post_Info">
                <div className= "Post_Info_TitleImg">
                    <img src={dataPost.userImage} />
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
            <div className="Post_Comments">
                <button
                    type="button"
                    onClick={handleOnClickDisplayComments}
                >
                    {
                        !isLoading
                            ? "Afficher les commentaires"
                            : <div className='spinnerLoader' />
                    }
                </button>
                <div>
                    {comments.length !== 0 &&
                        <ul className="Post_Comments_List">
                            {comments.map(comment => {
                                return <Comment
                                    comment={comment}
                                    reFetchComments={handleOnClickDisplayComments}
                                    userId={userId}
                                    userIsMod={userIsMod}
                                    key={comment.id}
                                />
                            })}
                        </ul>
                    }
                    <form className="Post_Comments_Form">
                        <textarea
                            className="Post_Comments_Form_Textarea"
                            value={textareaValue}
                            placeholder="Ajouter un commentaire"
                            onChange={e => setTextareaValue(e.currentTarget.value)}
                        ></textarea>
                        <button
                            type="submit"
                            onClick={handleOnClickAddComment}
                        >
                            {
                                !isLoading
                                    ? "Valider"
                                    : <div className='spinnerLoader' />
                            }
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Post;