import React from 'react';
import {ErrorMessage, LoadingMessage, MainContentWrapper} from "../styles/PageContainer.Style";
import {useQuery} from "@apollo/client";
import {GET_MOVIE_DETAILS} from "../graphQL/Queries";
import {Backdrop, Box, Card, CardContent, CircularProgress} from "@mui/material";
import MovieHeader from "./CardComponents/MovieHeader";
import MovieCast from "./CardComponents/MovieCast";
import MovieCrew from "./CardComponents/MovieCrew";
import MovieOverView from "./CardComponents/MovieOverView";
import MovieThumbnail from "./CardComponents/MovieThumbnail";

const MovieDetails = (props) => {
    const movieId = props.match.params.id;
    const {data, loading, error} = useQuery(GET_MOVIE_DETAILS, {
        variables: {ID: movieId}
    });

    const [wikiInfo, setWikiInfo] = useState("");
    const [wikiLoading, setWikiLoading] = useState(false);
    const [wikiError, setWikiError] = useState(false);

    const [imdbInfo, setImdbInfo] = useState("");
    const [imdbLoading, setImdbLoading] = useState(false);
    const [imdbError, setImdbError] = useState(false);

    if (loading) {
        return (
            <MainContentWrapper>
                <LoadingMessage>Data is loading...</LoadingMessage>
                <Backdrop sx={{color: 'var(--clr-primary-200)', zIndex: (theme) => theme.zIndex.drawer + 1}}
                          open={loading}>
                    <CircularProgress color="inherit"/>
                </Backdrop>
            </MainContentWrapper>);
    }

    if (error) {
        return (
            <MainContentWrapper>
                <ErrorMessage>An error occurred while fetching information!</ErrorMessage>
            </MainContentWrapper>
        );
    }
    return (
        <MainContentWrapper backDrop={data.movie.backdrop !== null ? data.movie.backdrop.large : undefined}>
            <Card sx={{maxHeight: 800, maxWidth: 1200, backgroundColor: "rgba(255,255,255,0.8)"}}>
                <MovieHeader movie={data.movie}/>
                <Box sx={{display: 'flex', flexDirection: 'row'}}>
                    <MovieThumbnail movie={data.movie}/>
                    <CardContent>
                        <MovieOverView overview={data.movie.overview}/>
                        <Box sx={{display: "flex", justifyContent: "space-evenly"}}>
                            <MovieCast cast={data.movie.cast}/>
                            <MovieCrew crew={data.movie.crew}/>
                        </Box>
                    </CardContent>
                </Box>
            </Card>
        </MainContentWrapper>
    );
};

export default MovieDetails;
