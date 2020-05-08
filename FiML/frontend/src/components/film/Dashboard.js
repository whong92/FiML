import React, { Fragment } from 'react';
import RankTable from './RankTable'
import Searchbar from '../layout/Searchbar'

export default function Dashboard(){
    return (
        <Fragment>
            <Searchbar />
            <RankTable />
        </Fragment>
    );
}