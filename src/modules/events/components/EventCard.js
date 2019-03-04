import React  from 'react';
import styled from 'styled-components';
import moment from 'moment';

import Button from '../../layouts/Button';

const EventCard = ({
  event: {
    _id,
    title,
    date,
    price,
    creator,
  },
  userId,
  showDetails,
}) => (
  <CardWrapper>
    <h3>{title}</h3>
    <p>{moment(date).format('D MMM HH:mm')}</p>
    <h3>{price}$</h3>
    {
      userId === creator._id?
      <p>Your the owner of this event.</p>
      :
      <Button onClick={showDetails.bind(null, _id)}>
        Show Details
      </Button>
    }
  </CardWrapper>
)

const CardWrapper = styled.div`
  padding    : 2%;
  margin     : 2%;
  background : #f4f4f4;
`;

export default EventCard;
