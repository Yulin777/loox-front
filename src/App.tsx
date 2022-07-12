import React, {useEffect, useMemo} from 'react';
import './App.css';
import {MainArticle} from "./components/mainArticle";
import {OtherArticlesList} from "./components/otherArticles";
import {styled} from "@mui/system";
import {useDispatch} from "react-redux";
import {useLocation} from "react-router-dom";
import {useTheme} from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const StyledContainer = styled('div')<any>(({bigscreen}) => ({
    display: 'flex',
    flexDirection:  bigscreen === 'true' ? 'row' : 'column',
    maxWidth: 1400,
    margin: 'auto'
}));

const StyledMainArticleContainer = styled('div')(() => ({
    flex: 4,
    marginRight: 40
}));

const StyledOtherArticlesContainer = styled('div')(() => ({
    flex: 1,
}));

function App() {
    const dispatch = useDispatch();
    const location = useLocation();

    const theme = useTheme();
    const bigScreen = useMediaQuery(theme.breakpoints.up('sm'));

    const selectedId = useMemo(() => {
        return +location.pathname.substring(1) || 0;
    }, [location]);

    useEffect(() => {
        dispatch({type: 'GET_ARTICLES', id: selectedId});
    }, [dispatch, selectedId]);

    return <StyledContainer  bigscreen={String(bigScreen)}>
        <StyledMainArticleContainer><MainArticle selectedId={selectedId}/></StyledMainArticleContainer>
        <StyledOtherArticlesContainer><OtherArticlesList selectedId={selectedId}/></StyledOtherArticlesContainer>
    </StyledContainer>;
}

export default App;
