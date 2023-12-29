import classes from './NearByShopsPage.module.css';
import { Fragment } from 'react';
import ShopsListing from './ShopsListing';

const NearByShopsPage = () => {
  return (
    <Fragment>
        <section className={classes.starting}>
        <h1>Near By Shops!</h1>
        </section>
        <ShopsListing />;
    </Fragment>
  );
};

export default NearByShopsPage;