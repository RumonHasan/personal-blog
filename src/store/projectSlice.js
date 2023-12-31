import { createSlice } from '@reduxjs/toolkit';

export const slices = createSlice({
  name: 'projectSlices',
  initialState: {
    searchPost: '',
    blogPosts: [],
    postsByCategories: [],
    searchedBlogPosts: [],
    categories: [],
    categoryCoverImage: '',
    blogPostContent: {},
    latestPostId: '',
    latestUpdatedPostId: '',
    postCommentsList: {},
  },
  reducers: {
    setSearchValue: (state, action) => {
      state.searchPost = action.payload;
    },
    clearSearchValue: (state) => {
      state.searchPost = '';
    },
    // fetching and querying blog posts based on categories and search
    setBlogPosts: (state, action) => {
      state.blogPosts = action.payload;
    },
    setPostsByCategories: (state, action) => {
      state.postsByCategories = action.payload;
    },
    setSearchedBlogPosts: (state, action) => {
      state.searchedBlogPosts = action.payload;
    },
    setBlogPostsCategories: (state, action) => {
      state.categories = action.payload;
    },
    // setting blog post content article
    setBlogPostContent: (state, action) => {
      state.blogPostContent = action.payload;
    },
    // setting latest post
    setLatestBlogPost: (state, action) => {
      state.latestPostId = action.payload;
    },
    setLatestUpdatedBlogPost: (state, action) => {
      state.latestUpdatedPostId = action.payload;
    },
    // setting post id with comment count
    setPostWithCommentCount: (state, action) => {
      const { postId, commentCount } = action.payload;
      state.postCommentsList = {
        ...state.postCommentsList,
        [postId]: commentCount,
      };
    },
  },
});

// actions go here
export const {
  setSearchValue,
  clearSearchValue,
  setBlogPosts,
  setPostsByCategories,
  setSearchedBlogPosts,
  setBlogPostsCategories,
  setBlogPostContent,
  setLatestBlogPost,
  setLatestUpdatedBlogPost,
  setPostWithCommentCount,
} = slices.actions;

export default slices.reducer;
