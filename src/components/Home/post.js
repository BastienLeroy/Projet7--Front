import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit, faCheck } from '@fortawesome/free-solid-svg-icons';

import Comment from './comment';

// == Import : local
import './style.scss';

const Post = ({ dataPost, userImage, userId, userIsMod, getPosts }) => {

    const postImageEdit = useRef(null);
    const [comments, setComments] = useState([]);
    const [postTextareaValue, setPostTextareaValue] = useState(dataPost.content)
    const [commentTextareaValue, setCommentTextareaValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [reFetchComments, setReFetchComments] = useState(false);
    const [userCanEdit, setUserCanEdit] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [editFile, setEditFile] = useState([]);
    const [displayComments, setDisplayComments] = useState(false);

    useEffect(() => {
        if (userId === dataPost.user_id || userIsMod) {
            setUserCanEdit(true);
        }
    }, []);

    useEffect(() => {
        if (displayComments) {
            handleOnClickDisplayComments();
        } else {
            setComments([]);
        }
    }, [displayComments]);

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
            "content": commentTextareaValue
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
            setCommentTextareaValue('');
            setIsLoading(false);
        } else {
            setIsLoading(false);
        }
    };

    const handleOnClickValidPostButton = async () => {

        const dataInput = {
            id: dataPost.id,
            content: postTextareaValue,
            imageUrl: dataPost.image_url
        };

        const formData = new FormData();
        formData.append('dataInput', JSON.stringify(dataInput));
        editFile.forEach(file => {
            formData.append("image", file);
        })
        
        const response = await axios.put(
            'http://localhost:5000/api/post/modifyPost',
            formData,
            {
                'withCredentials': true,
                headers: {'content-type': 'multipart/form-data'}
            }
        );

        if (response.status === 200) {
            setIsEdit(false);
        }
    };

    const handleOnClickRemovePostButton = async () => {
        const response = await axios.delete(
            'http://localhost:5000/api/post/deletePost',
            {
                'withCredentials': true,
                headers: { 'Content-Type': 'application/json' },
                data: {
                    id: dataPost.id
                }
            }
        )

        if (response.status === 200) {
            getPosts(0, true);
        }
    };

    return (
        <div className="Post">
            <div className="Post_Info">
                <div className= "Post_Info_TitleImg">
                    <img src={dataPost.userImage} />
                    <p>{dataPost.firstname} {dataPost.name}</p>
                </div>
                <p className="Post_Info_TitleImg_Date">{dataPost.date} {dataPost.time}</p>
            </div>
            <div className="Post_Img">
                {isEdit
                    ?   <>
                        {postImageEdit?.current && postImageEdit.current.files.length !== 0
                            ? <img className="Home_Add_Post_Container_Img_Show" src={URL.createObjectURL(postImageEdit.current.files[0])} />
                            : <img src={dataPost.image_url} />
                        }
                        <label htmlFor="image">Ajouter une image</label>
                        <input
                            id='image'
                            className="Home_Add_Post_Container_Img_InputImg"
                            name='image'
                            type='file'
                            ref={postImageEdit}
                            onChange={e => setEditFile(Array.from(e.target.files))}
                        />
                        </>
                    :   <img src={postImageEdit?.current && postImageEdit.current.files.length !== 0 ? URL.createObjectURL(postImageEdit.current.files[0]) : dataPost.image_url} />
                }
            </div>
            <div className="Post_Content">
                {isEdit
                    ?   <textarea
                            value={postTextareaValue}
                            onChange={(e) => setPostTextareaValue(e.currentTarget.value)}
                        >
                        </textarea>
                    :   postTextareaValue
                }
            </div>
            {
                userCanEdit &&
                <div className="Post_ButtonContainer">
                    <button
                        className="Post_ButtonContainer_Item Edit"
                        onClick={() => setIsEdit(!isEdit)}
                    >
                        <FontAwesomeIcon icon={faEdit} className="Post_ButtonContainer_Item_Icon" />
                        {isEdit ? 'Annuler' : 'Modifier'}
                    </button>
                    {isEdit &&
                        <button
                            className="Post_ButtonContainer_Item Save"
                            onClick={handleOnClickValidPostButton}
                        >
                            <FontAwesomeIcon icon={faCheck} className="Post_ButtonContainer_Item_Icon" />
                            Valider
                        </button>
                    }
                    <button
                        className="Post_ButtonContainer_Item Remove"
                        onClick={handleOnClickRemovePostButton}
                    >
                        <FontAwesomeIcon icon={faTrashAlt} className="Post_ButtonContainer_Item_Icon" />
                        Supprimer
                    </button>
                </div>
            }
            <div className="Post_Comments">
                <button
                    type="button"
                    onClick={() => setDisplayComments(!displayComments)}
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
                            value={commentTextareaValue}
                            placeholder="Ajouter un commentaire"
                            onChange={e => setCommentTextareaValue(e.currentTarget.value)}
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