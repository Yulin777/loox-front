import React, {FC} from 'react';
import {IArticle, putSelectedArticleId} from "../../state/reducers";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {useDispatch} from "react-redux";
import {styled} from "@mui/system";
import {useNavigate} from 'react-router-dom';
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";


const StyledParagraphText = styled(Typography)(() => ({
    fontSize: 13,
    display: '-webkit-box',
    maxWidth: '200px',
    WebkitLineClamp: 4,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden'
}));

const StyledTitle = styled(Typography)(() => ({
    fontSize: 16,
    width: '95%'
}));

const StyledCard = styled(Card)<any>(({bigscreen}) => ({
    display: 'flex',
    height: 120,
    width: bigscreen === 'true' ? 300 : '100%'
}));

const StyledBox = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'column'
}));

interface IProps {
    article: IArticle
}

export const ArticleCard: FC<IProps> = ({article}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const theme = useTheme();
    const bigScreen = useMediaQuery(theme.breakpoints.up('sm'));

    const handleArticleSelect = () => {
        dispatch(putSelectedArticleId({id: article.id}));
        navigate(`/${article.id}`);
    };

    return <StyledCard bigscreen={String(bigScreen)}
                       onClick={handleArticleSelect}>
        <CardMedia
            component="img"
            sx={{width: 120}}
            image={article.img}/>

        <StyledBox>
            <CardContent sx={{flex: '1 0 auto', padding: '10px'}}>
                <StyledTitle noWrap>{article.name}</StyledTitle>

                <StyledParagraphText color="text.secondary">
                    {article.first_paragraph}
                </StyledParagraphText>
            </CardContent>

        </StyledBox>

    </StyledCard>
}