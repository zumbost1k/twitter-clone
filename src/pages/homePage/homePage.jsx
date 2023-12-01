import React, {useEffect} from 'react';
import './homePage.css';
import AllNews from '@/components/allNews/allNews';
import AddNews from '@/components/addNews/addNews';
import {useDispatch, useSelector} from 'react-redux';
import {selectallNews} from '@/selectors/selectors';
import HashtagFilter from '@/components/hashtagFilter/hashtagFilter';
import UsersToFollow from '@/components/usersToFollow/usersToFollow';
import {getAllTweets, setTweets} from "../../slices/allPostsSlice";

const HomePage = () => {
    const homePageNews = useSelector(selectallNews);
    const dispatch = useDispatch();
    const getAllTweets = () => {
        fetch(
            `https://twittercloneapiproductionenv.azurewebsites.net/Tweet/GetAllTweets`,
            {
                method: 'GET',
            }
        )
            .then((response) => {
                dispatch(setTweets(response.data))
                console.log(response)
            })
            .catch((error) => {
                console.error(
                    'There has been a problem with your fetch operation:',
                    error
                );
            });
    };
    useEffect(() => {
        getAllTweets()
    }, []);

    return (
        <section className='home-page'>
            <div>
                <AddNews/>
                <AllNews isUserPage={false} allNews={homePageNews}/>
            </div>
            <div className='trends'>
                <HashtagFilter/>
                <UsersToFollow/>
            </div>
        </section>
    );
};

export default HomePage;
