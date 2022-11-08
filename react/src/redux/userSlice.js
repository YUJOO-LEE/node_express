import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    displayName: '',
    uid: '',
    accessToken: ''
  },
  reducers: {
    loginUser: (state, action)=>{
      state.displayName = action.payload.displayName;
      state.uid = action.payload.uid;
      state.accessToken = action.payload.accessToken;
    },
    logoutUser: state=>{
      state.displayName = '';
      state.uid = '';
      state.accessToken = '';
    }
  }
});

export default userSlice.reducer;