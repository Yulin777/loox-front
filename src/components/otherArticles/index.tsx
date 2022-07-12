import React, {FC} from 'react';
import {useSelector} from "react-redux";
import {ArticleCard} from "./ArticleCard";
import {IArticle} from "../../state/reducers";
import Typography from "@mui/material/Typography";
import {styled} from "@mui/system";

const StyledContainer = styled('div')(() => ({
    margin: '10px',
    display: 'flex',
    gap: 15,
    flexDirection: 'column'
}));

interface IProps {
    selectedId: number
}

export const OtherArticlesList: FC<IProps> = ({selectedId}) => {
    const otherArticles = useSelector((state: any) => state.articles.articles) as IArticle[];

    return <StyledContainer>
        <Typography variant='h6'> More stuff </Typography>
        {
            otherArticles.filter(a => a.id !== selectedId).map(article =>
                <ArticleCard key={article.id}
                             article={article}/>
            )
        }
    </StyledContainer>;
}