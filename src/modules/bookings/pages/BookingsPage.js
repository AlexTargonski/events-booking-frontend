import React, { Component } from 'react';
import moment               from 'moment';

import AuthContext          from '../../../context/auth-context';

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
              <li key={booking._id}>
                {booking.event.title} -{' '}
                {moment(booking.createdAt.date).format('D MMM HH:mm')}
              </li>
            ))}
          </ul>
        }
      </React.Fragment>
    );
  }
}

export default BookingsPage;
