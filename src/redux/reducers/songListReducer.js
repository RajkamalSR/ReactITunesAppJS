import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// Action
export const fetchSongsList = createAsyncThunk("fetchSongsList", async (artistName) => {
    const url = `https://itunes.apple.com/search?term=${artistName}&limit=10`;
    console.log(url, "url");
    const response = await fetch(url);
    return response.json();
});


const initialState = {
    isLoading: false,
    data: [],
    isError: false,
}

export const songListSlice = createSlice({
    name: 'songList',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchSongsList.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchSongsList.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload.results;
        });
        builder.addCase(fetchSongsList.rejected, (state, action) => {
            console.log("Error", action.payload.results);
            state.isError = true;
        });
    },
})

export default songListSlice.reducer

