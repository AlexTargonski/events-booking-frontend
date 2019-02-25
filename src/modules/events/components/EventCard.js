import React  from 'react';
import styled from 'styled-components';
import moment from 'moment';

const EventCard = ({
  event: {
    title,
    date,
    price,
  }
}) => (
  <CardWrapper>
    <h3>{title}</h3>
    <p>{moment(date).format('D MMM HH:mm')}</p>
    <h3>{price}$</h3>
  </CardWrapper>
)

const CardWrapper = styled.div`
  padding    : 2%;
  margin     : 2%;
  background : #f4f4f4;
`;

export default EventCard;
