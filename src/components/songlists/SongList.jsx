import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchSongsList } from '../../redux/actions';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

import LoaderComponent from '../loader/loader';
import './songlist.css'


export default function SongListCompnent() {
    const dispatch = useDispatch();
    const [displayResultsCount, setDisplayResultsCount] = useState(10)
    let searchOptions = {
        searchValue: 'akon',
        limit: 100
    }
    let displayLimit = 10;
    let state = useSelector((state) => state);
    let searchResults = state.songList.data;
    let dataResults = searchResults.slice(0, displayResultsCount);
    let songlistWrapper = document.querySelectorAll('.songlist-details');
    const [currentAudio, setCurrentAudio] = useState(null);


    useEffect(() => {
        dispatch(fetchSongsList(searchOptions))
    }, []);

    function searchByName(searchKeyword) {
        searchOptions.searchValue = searchKeyword ? searchKeyword : "akon";
        dispatch(fetchSongsList(searchOptions))
    }

    function searchBtn() {
        let serachKeyWord = document.getElementById("searchTxt").value
        searchByName(serachKeyWord)
    }

    function fetchSearchList() {
        setDisplayResultsCount(displayResultsCount + displayLimit);
        displayLimit += 10;
        dataResults = searchResults.slice(0, displayResultsCount)
    }

    if (state.songList.isLoading) {
        return <LoaderComponent />;
    }

    function clearAllPlayAudios() {
        const elements = document.getElementsByClassName('songlist-details');
        for (let i = 0; i < elements.length; i++) {
            elements[i].classList.remove('playing');
        }
    }

    function clearAllPauseAudios() {
        const elements = document.getElementsByClassName('songlist-details');
        for (let i = 0; i < elements.length; i++) {
            elements[i].classList.remove('pause');
        }
    }

    const handleAudioClick = (audio) => {
        if (currentAudio && currentAudio !== audio) {
            currentAudio.pause();
        }

        if (audio.paused) {
            clearAllPlayAudios();
            audio.closest('.songlist-details').classList.add("playing");
            audio.closest('.songlist-details').classList.remove("pause");
            audio.play();
            setCurrentAudio(audio);
        } else {
            clearAllPauseAudios();
            audio.closest('.songlist-details').classList.add("pause");
            audio.closest('.songlist-details').classList.remove("playing");
            audio.pause();
            setCurrentAudio(null);
        }
    };

    return (
        <div className="songlist">
            <div className="search-box">
                <input type="text" placeholder="Search by artist, album or song.." id="searchTxt"></input>
                <button onClick={() => searchBtn()} type="submit" className="search-btn">
                    <span className="material-icons material-symbols-outlined search-icon">search</span>
                </button>
            </div>
            <InfiniteScroll
                dataLength={10}
                hasMore={true}
                next={() => fetchSearchList()}
                endMessage={
                    <p style={{ textAlign: "center" }}>
                        <b>Yay! You have seen it all</b>
                    </p>
                }
            >
                <List>
                    {dataResults && dataResults.map((e, index) =>
                        <ListItem key={index}>
                            <ListItemAvatar>
                                <Avatar alt={e.artistName} src={e.artworkUrl100} />
                            </ListItemAvatar>
                            <div className="songlist-details">
                                <div className="album-list">
                                    <h4 className="albumname">{e.artistName}</h4>
                                    <p>{e.collectionName}</p>
                                </div>
                                <div className="audio-controls">
                                    <div onClick={() => handleAudioClick(document.getElementsByTagName('audio')[index])}>
                                        <div className="material-icons audio-btn play-btn">play_circle</div>
                                        <div className="material-icons audio-btn pause-btn">pause_circle</div>
                                    </div>

                                </div>
                                <audio
                                    controls
                                    src={e.previewUrl}
                                >
                                </audio>

                            </div>
                        </ListItem>
                    )}
                </List>
            </InfiniteScroll>
            {dataResults.length == 0 && <h4 className="text-center">No Results Found</h4>}
        </div >
    );
}