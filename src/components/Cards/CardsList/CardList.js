import React from 'react';
import CardItems from './CardItems/CardItems'

const SmallCardList = props => (
  <ul className="d-flex card flex-column bd-highlight secondary__news flex-grow-2 nav nav-pills">
    {props.articlesList.map((item) => <CardItems item={item} />)}
  </ul>
);

export default SmallCardList;