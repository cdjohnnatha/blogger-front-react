import React from 'react';
import CardItems from './CardItems/CardItems'
import './CardList.css';

const SmallCardList = props => (
  <div className="content-overflow">
    <ul className="d-flex card flex-column bd-highlight secondary__news flex-grow-2 nav nav-pills">
      {props.articlesList.map((item, i) => <CardItems key={i} item={item} />)}
    </ul>
  </div>
);

export default SmallCardList;