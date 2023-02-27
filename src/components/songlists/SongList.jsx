import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react';
import { fetchSongsList } from '../../redux/reducers/songListReducer';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

import LoaderComponent from '../loader/loader';
import './songlist.css'


export default function SongListCompnent() {
    let lastScrollTop = 0
    const dispatch = useDispatch();
    let state = useSelector((state) => state);
    console.log(state, "State");

    useEffect(() => {
        dispatch(fetchSongsList('akon'));
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", () => { // or window.addEventListener("scroll"....
            var st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
            if (st > lastScrollTop) {
               console.log("downscroll")
            } else if (st < lastScrollTop) {
                //scrollup
            } 
            lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
         }, false);
    }, [])

    function searchByName(serachKeyWord) {
        serachKeyWord ? dispatch(fetchSongsList(serachKeyWord)) : dispatch(fetchSongsList('akon'));
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