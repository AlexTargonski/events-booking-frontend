import React, { Component } from 'react';

import Modal                from '../../layouts/Modal';
import CreateEvent          from '../forms/CreateEvent';
import AuthContext          from '../../../context/auth-context';

class EventsPage extends Component {
  state = {
    creating : false,
  };

  static contextType = AuthContext;

  startCreateEventHandler = () => {
    this.setState({ creating: true });
  };

  modalConfirmHandler = state => {
    this.setState({ creating: state });
  };

  modalCancelHandler = () => {
    this.setState({ creating: false });
  };

  render() {
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
        </div>
      </React.Fragment>
    );
  }
}

export default EventsPage;
