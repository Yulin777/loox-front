import {all, call, put, takeLatest} from 'redux-saga/effects'
import {putArticleDescription, putArticles, putSelectedArticleId} from "./reducers";
import * as Api from '../api'

function* getArticles({id}: any) {
    try {
        // @ts-ignore
        const response = yield call(Api.requestArticles, id);
        yield put(putArticles(response.data));
        yield put(putSelectedArticleId(id));
    } catch (e: any) {
        console.log(e);
    }
}

function* getArticleDescription({id}: any) {
    try {
        // @ts-ignore
        const result = yield call(Api.requestArticleDescription, id);
        yield put(putArticleDescription({id, description: result.data}));
    } catch (e: any) {
        console.log(e);
    }
}

function* watchGetArticles() {
    yield takeLatest('GET_ARTICLES', getArticles);
}

function* watchGetArticleDescription() {
    yield takeLatest("GET_ARTICLE_DESCRIPTION", getArticleDescription);
}


export default function* rootSaga() {
    yield all([
        watchGetArticles(),
        watchGetArticleDescription()
    ]);
}