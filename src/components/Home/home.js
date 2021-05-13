// == Import : npm
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import axios from 'axios';

// == Import : components
import Post from "./post";

// == Import : local
import './style.scss';


const Home = () => {
    const [userState, userDispatch] = useContext(UserContext);
    const [posts, setPosts] = useState([]);

    useEffect(async () => {
        const getPosts = await axios.get('http://localhost:5000/api/post/getAllPosts');
        setPosts(getPosts.data);
    }, [])
    
    return (
        <div className="Home">
            <div className="Home_Container">
                <div className="Home_Add_Post">
                    <label htmlFor="Add_Post"></label>
                    <button
                        className="Add_Post_Button"
                        type='submit'
                    >
                        Ajouter un nouveau post...
                    </button>
                </div>
                <div className="Home_Post">
                    {posts.length !== 0 && posts.map(postData => {
                        return <Post dataPost={postData} userImage={userState.image_url} />
                    })
                        
                    }
                </div>
            </div>
        </div>
    );
};

export default Home;