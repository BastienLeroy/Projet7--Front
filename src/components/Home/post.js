import React, { useState } from 'react';
import axios from 'axios';

// == Import : local
import './style.scss';

const Post = ({ dataPost, userImage, userId }) => {

    const [comments, setComments] = useState([]);
    const [textareaValue, setTextareaValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleOnClickDisplayComments = async (e) => {
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
            "userId": 12,
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
                                return <li className="Post_Comments_List_Item" key={comment.id}>
                                    
                                        <div className="Post_Comments_List_Item_Header">
                                            <p>{comment.firstname} {comment.name}</p>
                                            <p>{comment.date} {comment.time}</p>
                                        </div>
                                        <div className="Post_Comments_List_Item_content">
                                            {comment.content}
                                        </div>
                                    
                                </li>
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