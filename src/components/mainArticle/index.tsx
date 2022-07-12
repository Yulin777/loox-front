import React, {FC, useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {IArticle} from "../../state/reducers";
import Typography from "@mui/material/Typography";
import {Button} from "@mui/material";
import {styled} from "@mui/system";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const StyledTextContainer = styled('div')<any>(({expand}) => ({
    height: expand === 'true' ? '90vh' : '50vh',
    overflowY: expand === 'true' ? 'scroll' : 'hidden',
    transition: ' height 1s',
    transitionTimingFunction: 'ease'
}));

const StyledCurtainContainer = styled('div')<any>(({hide}) => ({
    display: hide === 'true' ? 'none' : 'block',
    position: 'relative',
    width: '100%',
    height: 308,
    marginTop: -308,
    background: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, white 100%)'
}));

const StyledImage = styled('img')<any>(({bigscreen}) => ({
    borderRadius: 8,
    objectFit: 'cover',
    height: 259,
    width: bigscreen === 'true'? 300 : '100%',
    margin: '0 15px'
}));

const StyledButton = styled(Button)(() => ({
    color: 'black',
    background: 'white',
    position: 'absolute',
    left: '50%',
    borderRadius: 10,
    bottom: 20,
    margin: 0,
    transform: 'translateX(-50%)'
}));

const StyledContainer = styled('div')<any>(({bigscreen}) => ({
    display: 'flex',
    flexDirection:  bigscreen === 'true' ? 'row' : 'column',
    margin: 15,
    gap: 15
}));

interface IProps {
    selectedId: number
}

export const MainArticle: FC<IProps> = ({selectedId}) => {
    const dispatch = useDispatch();

    const theme = useTheme();
    const bigScreen = useMediaQuery(theme.breakpoints.up('sm'));

    const articles = useSelector((state: any) => state.articles.articles) as IArticle[];
    const [showFullText, setShowFullText] = useState(false);

    const selectedArticle = useMemo(() => {
        if (articles.length === 0) return;

        const article = articles.filter(a => a.id === selectedId)[0];
        if (!article) return null;

        return article;
    }, [articles, selectedId]);

    useEffect(() => {
        if (!!selectedArticle?.description) return;

        dispatch({type: 'GET_ARTICLE_DESCRIPTION', id: selectedId});
        setShowFullText(false);
    }, [dispatch, selectedId, articles, selectedArticle?.description]);

    const handleReadMore = () => {
        setShowFullText(true);
    };

    return <StyledContainer bigscreen={String(bigScreen)}>

        <StyledImage src={selectedArticle?.img}
                     bigscreen={String(bigScreen)}/>

        <div style={{width: '-webkit-fill-available'}}>
            <Typography variant='h4'>{selectedArticle?.name}</Typography>

            <StyledTextContainer expand={String(selectedArticle && showFullText)}>
                <Typography>
                    {selectedArticle?.description}
                </Typography>
            </StyledTextContainer>

            <StyledCurtainContainer hide={String(showFullText)}>
                <StyledButton variant='contained'
                              onClick={handleReadMore}
                >Read More</StyledButton>
            </StyledCurtainContainer>
        </div>
    </StyledContainer>;
}