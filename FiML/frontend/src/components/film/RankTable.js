import React, { Component, Fragment } from 'react'
import {connect} from 'react-redux'
import {getFilms} from '../../actions/films'
import {getRecommends} from '../../actions/recommends'
import PropTypes from 'prop-types'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { withStyles, makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Pagination from '@material-ui/lab/Pagination'
import { FilmRaterDialog } from './FilmRaterDialog'

// settings for pagination
const TOTAL_DISPLAY = 200
const PER_PAGE = 50
const PAGES = Math.ceil(TOTAL_DISPLAY/PER_PAGE)

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.secondary.main,
        },
    },
}))(TableRow);

const styles = {
    root: {
        maxWidth: 150,
        margin: 10,
    }
};

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';

class FilmCard extends Component {

    render() {

        const { classes, film, dist } = this.props
        
        return (
                <Card className={classes.root}>

                <CardActionArea onClick={()=>{this.props.onClick(film)}}>
                <CardMedia className={classes.media}
                    component="img"
                    width="10"
                    image={ film.poster!=null ? film.poster : "/static/images/cards/poster_placeholder.jpg" }
                    title="film poster"
                />
                </CardActionArea>
                <CardContent className={classes.content} >{film.name}</CardContent>
                {dist==null ? null: <LinearProgress variant="determinate" value={Math.min(dist*100, 100)} />}
                </Card>
        )
    }
}

const StyledFilmCard = withStyles(styles)(FilmCard)

  

class RankGrid extends Component {

    static propTypes = {
        films: PropTypes.array.isRequired,
        getFilms: PropTypes.func.isRequired
    }

    state = {
        dialogOpen: false,
        film: null,
        page: 1,
    }

    setFilmState = (film) => {
        this.setState({...this.state, dialogOpen: true, film: film})
    }
    
    handleClose = (value) => {
        this.setState({...this.state, dialogOpen: false})
    };

    setPage = (e, page) => {
        this.setState({...this.state, page: page})
    }

    componentDidMount() {
        this.props.getFilms()
    }


    render() {
        
        const {films, recommends} = this.props
        var disp = null
        const {page} = this.state
        const start = (page-1)*PER_PAGE
        const end = page*PER_PAGE
        if (recommends != null) {
            const { dist, rec } = recommends
            if (films.length > 0){
                disp = rec.slice(start, end).map( 
                    (r, i) => (
                        <div><StyledFilmCard film={films[r]} dist={dist[i]} onClick={this.setFilmState}/></div>
                    )
                )
            }
        } else if (films.length > 0){
            disp = films.slice(start,end).map( 
                film => (
                    <div><StyledFilmCard film={film} onClick={this.setFilmState}/></div>
                )
            )
        }

        const style = {
            justifyContent: "space-evenly"
        }

        const {dialogOpen, film} = this.state

        return (
            <Fragment>
                <h3>My Recommendations</h3>
                <div className="center" style={{margin: "auto", width: 345}}>     <Pagination count={PAGES} onChange={this.setPage} page={this.state.page}/> </div>
                <FilmRaterDialog selectedValue={film} open={dialogOpen} onClose={this.handleClose} />
                <div className="d-flex flex-wrap" style={style}>
                    {disp}
                </div>
            </Fragment>
        )
    }

}

class RankTable extends Component {

    static propTypes = {
        films: PropTypes.array.isRequired,
        getFilms: PropTypes.func.isRequired
    }

    componentDidMount() {
        this.props.getFilms()
    }

    render() {
        
        const {films, recommends} = this.props
        var disp = null
        if (recommends != null) {
            const { dist, rec } = recommends
            if (films.length > 0){
                disp = rec.map( 
                    (r, i) => (
                    
                    <StyledTableRow key={ films[r].dataset_id }>
                        <StyledTableCell>{ films[r].dataset_id }</StyledTableCell>
                        <StyledTableCell>{ films[r].name }</StyledTableCell>
                        <StyledTableCell>{ dist[i] }</StyledTableCell>
                    </StyledTableRow>
                    )
                )
            }
        } else {
            disp = films.slice(0,100).map( 
                film => (
                <TableRow key={ film.dataset_id }>
                    <TableCell>{ film.dataset_id }</TableCell>
                    <TableCell>{ film.name }</TableCell>
                    <TableCell>{ 0 }</TableCell>
                </TableRow>
                )
            )
        }

        return (
            <Fragment>
                <h1>FiML</h1>
                <StyledFilmCard />
                <TableContainer component={Paper}>
                <Table aria-label="simple table"> 
                    <TableHead>
                        <TableRow key={ "headers" }>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Score</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {disp}
                    </TableBody>
                    
                </Table> </TableContainer>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    user: state.auth.user,
    films: state.films.films,
    recommends: state.recommends.recommends,
    ratings: state.ratings.ratings
});

export default connect(mapStateToProps, {getFilms, getRecommends})(RankGrid);