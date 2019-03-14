import React, { Component } from 'react';
import moment               from 'moment';
import styled               from 'styled-components';

import AuthContext          from '../../../context/auth-context';
import Button               from '../../layouts/Button';

class BookingsPage extends Component {
  state = {
    loaded    : false,
    bookings  : [],
  };

  static contextType = AuthContext;

  componentDidMount() {
    this.fetchBookings();
  }

  fetchBookings = () => {
    const requestBody = {
      query: `
        query {
          bookings {
            _id
           createdAt
           event {
             _id
             title
             date
           }
          }
        }
      `
    };

    fetch('http://localhost:8080/graphiql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.context.token
      }
    })
    .then(res => {
      if (res.status !== 200 && res.status !== 201) {
        throw new Error('Failed!');
      }
      return res.json();
      })
      .then(resData => {
        const bookings = resData.data.bookings;
        this.setState({ bookings: bookings, loaded: false });
      })
      .catch(err => {
        console.log(err);
      });
  };

  deleteBooking = bookingId => {
    const requestBody = {
      query: `
          mutation {
            cancelBooking(bookingId: "${bookingId}") {
            _id
             title
            }
          }
        `
    };

    fetch('http://localhost:8080/graphiql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.context.token
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        this.setState(prevState => {
          const updatedBookings = prevState.bookings.filter(booking => {
            return booking._id !== bookingId;
          });
          return { bookings: updatedBookings, loaded: false };
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const { bookings, loaded } = this.state

    return (
      <React.Fragment>
        {
          loaded?
          <p>loading</p>
          :
          <ul>
            {bookings.map(booking => (
              <Booking key={booking._id}>
                <h2>{booking.event.title}</h2>
                <p>{moment(booking.createdAt.date).format('D MMM HH:mm')}</p>
                <Button onClick={this.deleteBooking.bind(this, booking._id)}>
                  Cancel
                </Button>
              </Booking>
            ))}
          </ul>
        }
      </React.Fragment>
    );
  }
}

const Booking = styled.li`
  display        : flex;
  flex-direction : column;
  padding        : 2%;
  margin         : 1% 2%;
  background     : #f4f4f4;
  list-style     : none;
`;

export default BookingsPage;
