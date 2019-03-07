import React, { Component } from 'react';
import moment               from 'moment';

import Modal                from '../../layouts/Modal';
import CreateEvent          from '../forms/CreateEvent';
import AuthContext          from '../../../context/auth-context';
import EventCard            from '../components/EventCard';

class EventsPage extends Component {
  state = {
    creating      : false,
    events        : [],
    loaded        : false,
    selectedEvent : null,
  };

  static contextType = AuthContext;

  componentDidMount() {
     this.fetchEvents();
   };

  startCreateEventHandler = () => {
    this.setState({ creating: true });
  };

  modalCancelHandler = () => {
    this.setState({ creating: false, selectedEvent: null });
  };

  fetchEvents() {
    const requestBody = {
      query: `
        query {
          events {
            _id
            title
            desc
            date
            price
            creator {
              _id
              email
            }
          }
        }
      `
    };

    fetch('http://localhost:8080/graphiql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        const events = resData.data.events;
        this.setState({ events: events, loaded : true });
      })
      .catch(err => {
        console.log(err);
      });
  };

  showDetails = eventId => {
    this.setState(prevState => {
      const selectedEvent = prevState.events.find(e => e._id === eventId);
      return { selectedEvent: selectedEvent };
    });
  };

  bookEvent = () => {
    if (!this.context.token) {
      this.setState({ selectedEvent: null });
      return;
    }
    const requestBody = {
      query: `
          mutation {
            bookEvent(eventId: "${this.state.selectedEvent._id}") {
              _id
             createdAt
             updatedAt
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
        console.log(resData);
        this.setState({ selectedEvent: null });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const { events, loaded, selectedEvent, creating } = this.state

    return (
      <React.Fragment>
        {creating && (
          <Modal
            title="Add Event"
            canCancel
            canConfirm
            onCancel={this.modalCancelHandler}
          >
            <CreateEvent
              modalConfirmHandler={this.modalConfirmHandler}
            />
          </Modal>
        )}
        {selectedEvent && (
          <Modal
            title="Event Details"
            canCancel
            canConfirm
            onCancel={this.modalCancelHandler}
          >
            <h2>{selectedEvent.title}</h2>
            <p>{selectedEvent.desc}</p>
            <p>{moment(selectedEvent.date).format('D MMM HH:mm')}</p>
            <p>{selectedEvent.price} $</p>

          </Modal>
        )}
        <div>
          {
            this.context.token &&
            <button onClick={this.startCreateEventHandler}>
              Create Event
            </button>
          }
          {
            loaded?
            events.map(event =>
              <EventCard
                key={event._id}
                event={event}
                showDetails={this.showDetails}
                userId={this.context.userId}
              />
            )
            :
            <p>loading</p>
          }
        </div>
      </React.Fragment>
    );
  }
}

export default EventsPage;
