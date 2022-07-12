import {createSlice} from '@reduxjs/toolkit'

export interface IArticle {
    id: number
    name: string
    first_paragraph: string
    description?: string
    img: string
}

interface IState {
    articles: IArticle[]
    selectedId: number
    bigScreen: boolean
}

const initialState: IState = {
    articles: [],
    selectedId: 0,
    bigScreen: true
};

const articlesSlice = createSlice({
    name: 'articles',
    initialState,
    reducers: {
        putArticles: (state, action) => {
            state.articles = action.payload;
        },

        putArticleDescription: (state, action) => {
            const {id, description} = action.payload;
            state.articles.filter(article => article.id === id)[0].description = description;
        },

        putSelectedArticleId: (state, action) => {
            const {id} = action.payload;
            state.selectedId = id;
        },

        putBigScreen: (state, action) => {
            console.log('action',action)
            state.bigScreen = action.payload;
        }

    },
});

// Action creators are generated for each case reducer function
export const {putArticles, putArticleDescription, putSelectedArticleId, putBigScreen} = articlesSlice.actions;

export default articlesSlice.reducer;