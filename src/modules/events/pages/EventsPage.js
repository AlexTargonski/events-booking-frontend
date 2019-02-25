import React, { Component } from 'react';

import Modal                from '../../layouts/Modal';
import CreateEvent          from '../forms/CreateEvent';
import AuthContext          from '../../../context/auth-context';
import EventCard            from '../components/EventCard';

class EventsPage extends Component {
  state = {
    creating : false,
    events   : [],
    loaded   : false,
  };

  static contextType = AuthContext;

  componentDidMount() {
     this.fetchEvents();
   };

  startCreateEventHandler = () => {
    this.setState({ creating: true });
  };

  modalConfirmHandler = state => {
    this.setState({ creating: state });
  };

  modalCancelHandler = () => {
    this.setState({ creating: false });
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

  render() {
    const { events, loaded } = this.state

    console.log(events)

    return (
      <React.Fragment>
        {this.state.creating && (
          <Modal
            title="Add Event"
            canCancel
            canConfirm
            onCancel={this.modalCancelHandler}
            onConfirm={this.modalConfirmHandler}
          >
            <CreateEvent
              modalConfirmHandler={this.modalConfirmHandler}
            />
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
