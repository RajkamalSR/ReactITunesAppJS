import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react';
import { fetchSongsList } from '../../redux/reducers/songListReducer';

import LoaderComponent from '../loader/loader';
import './songlist.css'


export default function SongListCompnent() {
    const dispatch = useDispatch();
    let state = useSelector((state) => state);
    console.log(state, "State");

    useEffect(() => {
        dispatch(fetchSongsList('akon'));
    }, []);

    function searchByName(serachKeyWord) {
        serachKeyWord ? dispatch(fetchSongsList(serachKeyWord)) : dispatch(fetchSongsList('akon'));
    }

    function searchBtn(){
        let serachKeyWord = document.getElementById("searchTxt").value
        searchByName(serachKeyWord)
    }

    if (state.songList.isLoading) {
        return <LoaderComponent/>;
    }

    return (
        <div className="songlist">
            <div className="search-box">
            <input type="text" placeholder="Search by artist, album or song.." id="searchTxt"></input>
                <button onClick={() => searchBtn()} type="submit">
                    Search
                </button>
            </div>

            
            <ul className="list-group">
                {state.songList.data && state.songList.data.map((e, index) =>
                    <li key={index} className="list-group-item">
                        <img src={e.artworkUrl100} className="album-image" alt={e.artistName} />
                        <div className="songlist-details">
                        <div className="album-list">
                            <h4 className="albumname">{e.artistName}</h4>
                            <p>{e.collectionName}</p>
                            <p>{e.collectionArtistName}</p>
                        </div>
                        <audio
                            controls
                            src={e.previewUrl}>
                        </audio>
                        </div>
                    </li>
                )}
            </ul>
        </div>
    );
}