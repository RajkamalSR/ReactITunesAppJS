import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react';
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
    //const [dataSource]
    let searchOptions = {
        searchValue: 'akon',
        limit: 10
    }
    let state = useSelector((state) => state);
    var limitValue = 10;
    console.log(state, "State");

    useEffect(() => {
        dispatch(fetchSongsList('akon', 10));
    }, []);

    function searchByName(searchKeyword) {
        searchOptions.searchValue = searchKeyword ? searchKeyword : "akon";
        dispatch(fetchSongsList(searchOptions))
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
            <InfiniteScroll
                dataLength={10}
                hasMore={true}
                next={() => dispatch(fetchSongsList('akon', 10))}
                endMessage={
                    <p style={{ textAlign: "center" }}>
                        <b>Yay! You have seen it all</b>
                    </p>
                }
                loader={<div className="infinte-scroller-loader"><LoaderComponent /></div>}
            >
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
                </List>
            </InfiniteScroll>
            {state.songList.data.length == 0 && <h4 className="text-center">No Results Found</h4>}
        </div >
    );
}