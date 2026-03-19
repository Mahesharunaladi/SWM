import { configureStore } from '@reduxjs/toolkit';

// Placeholder reducers
const dashboardSlice = {
  name: 'dashboard',
  initialState: {
    bins: [],
    routes: [],
    loading: false,
    error: null,
  },
  reducers: {
    setBins: (state, action) => {
      state.bins = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
};

const store = configureStore({
  reducer: {
    dashboard: (state = dashboardSlice.initialState, action) => {
      switch (action.type) {
        case 'dashboard/setBins':
          return { ...state, bins: action.payload };
        case 'dashboard/setLoading':
          return { ...state, loading: action.payload };
        case 'dashboard/setError':
          return { ...state, error: action.payload };
        default:
          return state;
      }
    },
  },
});

export default store;
