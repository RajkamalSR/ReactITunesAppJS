import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react';
import { fetchSongsList } from '../../redux/reducers/songListReducer';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

import LoaderComponent from '../loader/loader';
import './songlist.css'


export default function SongListCompnent() {
    let lastScrollTop = 0;
    let displayLimit = 10;
    let dataLength;
    const dispatch = useDispatch();
    let state = useSelector((state) => state);
    //let displayResults = state.songList.data.slice(offset, displayLimit);
    const [displayResultsCount, setDisplayResultsCount] = useState(10)
    const [displayResults, setDisplayResults] = useState([]);

    useEffect(() => {
        dispatch(fetchSongsList('akon'));
    }, []);

    window.addEventListener("load", () => {
        dataLength = state.songList.data.length;
        setDisplayResults(state.songList.data.slice(0,displayResultsCount));
     });

    window.addEventListener("scroll", () => {
        var st = window.pageYOffset || document.documentElement.scrollTop;
        if (st > lastScrollTop) {
           if(displayResults.length == dataLength){

           }
           setDisplayResults(state.songList.data.slice(0,displayResultsCount));
        } else if (st < lastScrollTop) {

        } 
        lastScrollTop = st <= 0 ? 0 : st;
     }, false);

    function searchByName(searchKeyword) {
        searchKeyword ? dispatch(fetchSongsList(searchKeyword)) : dispatch(fetchSongsList('akon'));
    }

    function searchBtn() {
        let serachKeyWord = document.getElementById("searchTxt").value
        searchByName(serachKeyWord)
    }

    if (state.songList.isLoading) {
        return <LoaderComponent />;
    }

    return (
        <div className="songlist">
            <div className="search-box">
                <input type="text" placeholder="Search by artist, album or song.." id="searchTxt"></input>
                <button onClick={() => searchBtn()} type="submit" className="search-btn">
                <span className="material-icons material-symbols-outlined search-icon">search</span>
                </button>
            </div>

            <List>
                {state.songList.data && state.songList.data.map((e, index) =>
                    <ListItem key={index}>
                        <ListItemAvatar>
                            <Avatar alt={e.artistName} src={e.artworkUrl100} />
                        </ListItemAvatar>
                        <div className="songlist-details">
                            <div className="album-list">
                                <h4 className="albumname">{e.artistName}</h4>
                                <p>{e.collectionName}</p>
                            </div>
                            <audio
                                controls
                                src={e.previewUrl}>
                            </audio>
                        </div>
                    </ListItem>
                )}
                {state.songList.data.length == 0 && <h4 className="text-center">No Results Found</h4>}
            </List>
        </div>
    );
}