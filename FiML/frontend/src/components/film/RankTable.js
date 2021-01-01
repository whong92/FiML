import React, { Component, Fragment } from 'react'
import {connect} from 'react-redux'
import {getFilms, selectFilm} from '../../actions/films'
import {getRecommends} from '../../actions/recommends'
import {getSimilars} from '../../actions/similars'

import PropTypes from 'prop-types'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

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
                    image={ (film.poster!=null && film.poster!="NaN") ? film.poster : "/static/images/cards/poster_placeholder.jpg" }
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

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
        {value === index && (
            <Box p={3}>
            {children}
            </Box>
        )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

const dsu = (arr1, arr2) => arr1
  .map((item, index) => [arr2[index], item]) // add the args to sort by
  .sort(([arg1], [arg2]) => arg2 - arg1) // sort by the args
  .map(([, item]) => item); // extract the sorted items

function combine(rec0, rec1) {
    var itemset1 = {}
    for (var i=0; i<rec1.rec.length; i++) {
        itemset1[rec1.rec[i]] = rec1.dist[i]
    }

    var combineDist = []
    var combineItems = []
    for (var i=0; i<rec0.rec.length; i++) {
        combineItems.push(rec0.rec[i])
        var score = 0.0
        if (itemset1[rec0.rec[i]] != null ) {
            score = itemset1[rec0.rec[i]] * rec0.dist[i]
        }
        combineDist.push(score)
    }

    var itemset0 = new Set(rec0.rec)
    for (var i=0; i<rec1.rec.length; i++) {
        if (itemset0.has(rec1.rec[i]) ) continue
        combineItems.push(rec1.rec[i])
        combineDist.push(0.0)
    }

    combineItems = dsu(combineItems, combineDist)
    combineDist = combineDist.sort()
    combineDist.reverse()

    return {'rec': combineItems, 'dist': combineDist}
}

class _MultiRankGrid extends Component {

    static propTypes = {
        getSimilars: PropTypes.func.isRequired,
    }

    state = {
        tab: 0, selected_film: null
    }

    handleChange = (event, tabLabel) => {
        this.setState({...this.state, tab: tabLabel})
    };

    componentDidUpdate(prevProps, prevState) {
        if (this.props.selected_film == null) return;
        if (!(this.state.tab == 1 || this.state.tab == 2)) return;
        if (
            this.props.selected_film !== prevProps.selected_film ||
            ( (this.state.tab !== prevState.tab) )
        ) {
            this.props.getSimilars(this.props.selected_film.dataset_id);
        }
    }


    render() {
        const {tab} = this.state
        const {recommends, similar_items} = this.props
        var bal = null
        if (recommends != null && similar_items != null) {
            bal = combine(recommends, similar_items)
        }

        return(
            <Fragment>

                <Tabs
                    value={tab}
                    onChange={this.handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                >
                    <Tab label="Recommended" />
                    <Tab label="Related" />
                    <Tab label="Balanced" />
                </Tabs>

                <TabPanel value={tab} index={0}>
                  <RankGrid recommends={recommends}/>
                </TabPanel>
                <TabPanel value={tab} index={1}>
                  <RankGrid recommends={similar_items}/>
                </TabPanel>
                <TabPanel value={tab} index={2}>
                  <RankGrid recommends={bal}/>
                </TabPanel>

            </Fragment>
        )

    }
}

const mapStateToPropsMRG = state => ({
    selected_film: state.films.selected_film,
    similar_items: state.similars.similars,
    recommends: state.recommends.recommends
});

export const MultiRankGrid = connect(mapStateToPropsMRG, {getSimilars})(_MultiRankGrid);

class _RankGrid extends Component {

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
                    (r, i) => {
                        return <div><StyledFilmCard film={films[r]} dist={dist[i]} onClick={this.setFilmState}/></div>
                    }
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
                <div className="center" style={{margin: "auto", width: 345}}>     <Pagination count={PAGES} onChange={this.setPage} page={this.state.page}/> </div>
                <FilmRaterDialog selectedValue={film} open={dialogOpen} onClose={this.handleClose} />
                <div className="d-flex flex-wrap" style={style}>
                    {disp}
                </div>
            </Fragment>
        )
    }

}

const mapStateToProps = state => ({
    films: state.films.films,
    selected_film: state.films.selected_film
});

export const RankGrid = connect(mapStateToProps, {getFilms, selectFilm})(_RankGrid);