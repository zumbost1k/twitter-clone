import { createSlice } from '@reduxjs/toolkit';
import { v4 } from 'uuid';

const initialState = {
  allPosts: [
    {
      postId: v4(),
      authorName: 'Peyton Lyons',
      creationDate: '24 August at 20:43',
      postText:
        'Traveling - it leaves you speechless, then turns you into a storyteller.',
      postPhoto: 'ocean.jpg',
      quantityOfComments: 449,
      quantityOfRetweets: 59,
      quantityOfSaved: 234,
    },
    {
      postId: v4(),
      authorName: 'Daniel Jensen',
      creationDate: '24 August at 20:43',
      postText:
        'Traveling - it leaves you speechless, then turns you into a storyteller.',
      postPhoto: 'doSomething.jpg',
      quantityOfComments: 449,
      quantityOfRetweets: 59,
      quantityOfSaved: 234,
    },
    {
      postId: v4(),
      authorName: 'Daniel Jensen',
      creationDate: '24 August at 20:43',
      postText:
        'Traveling - it leaves you speechless, then turns you into a storyteller.',
      postPhoto: 'lake.jpg',
      quantityOfComments: 449,
      quantityOfRetweets: 59,
      quantityOfSaved: 234,
    },
    {
      postId: v4(),
      authorName: 'Bianca Sosa',
      creationDate: '24 August at 20:43',
      postText:
        'Traveling - it leaves you speechless, then turns you into a storyteller.',
      postPhoto: 'trees.jpg',
      quantityOfComments: 449,
      quantityOfRetweets: 59,
      quantityOfSaved: 234,
    },
  ],
};

export const AllPostsSlice = createSlice({
  name: 'allPosts',
  initialState,
  reducers: {},
});

export default AllPostsSlice.reducer;
