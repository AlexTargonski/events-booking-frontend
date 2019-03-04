import React  from 'react';
import styled from 'styled-components';
import moment from 'moment';

const EventCard = ({
  event: {
    _id,
    title,
    date,
    price,
  },
  showDetails,
}) => (
  <CardWrapper>
    <h3>{title}</h3>
    <p>{moment(date).format('D MMM HH:mm')}</p>
    <h3>{price}$</h3>
    <button onClick={showDetails.bind(null, _id)}>
      Show Details
    </button>
  </CardWrapper>
)

const CardWrapper = styled.div`
  padding    : 2%;
  margin     : 2%;
  background : #f4f4f4;
`;

export default EventCard;
