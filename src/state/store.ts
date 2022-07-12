import { configureStore } from '@reduxjs/toolkit';
import articlesSlice from './reducers';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

export default configureStore({
    reducer: {
        articles: articlesSlice,
    },
    middleware: [sagaMiddleware]
});

sagaMiddleware.run(rootSaga);
