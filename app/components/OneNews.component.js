"use strict";
import React, { Component, PropTypes } from 'react';
import { Card, CardTitle, CardText, CardMedia, CardActions, CardHeader, FlatButton } from 'material-ui';
import { Link } from 'react-router';

const OneNewsComponent = props => {
  const {one_news} = props;
  let title = one_news ? one_news.title : '';
  let text = one_news ? one_news.text : '';
  let image = one_news ? one_news.image : '';
  let date = one_news ? one_news.created : '';
  let author = one_news ? one_news.author : '';

  return (
    <Card>
      <CardHeader title={`Author: ${author}`} />
      <CardMedia overlay={<CardTitle title={<h1 className="title">{title}</h1>} subtitle={new Date(date).toDateString()} />}>
        <img src={image} className="news-img" alt=""/>
      </CardMedia>
      <CardText>{text}</CardText>
      <CardActions>
        <FlatButton label="Back" containerElement={<Link to="/news"/>} />
      </CardActions>
    </Card>
  )
};

export default OneNewsComponent;
