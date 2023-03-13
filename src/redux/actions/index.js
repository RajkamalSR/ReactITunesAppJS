import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchSongsList = createAsyncThunk("fetchSongsListState", async (searchOptions) => {
    const url = `https://itunes.apple.com/search?term=${searchOptions.searchValue}&limit=${searchOptions.limit}`;
    const response = await fetch(url);
    return response.json();
});


