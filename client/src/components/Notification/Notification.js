import React from "react";
import { MDBNotification } from "mdbreact";
import PropTypes from 'prop-types';

const Notification = ({text}) => {
  return (
    <MDBNotification
      autohide={7000}
      show
      fade
      bodyClassName="font-weight-bold white-text"
      icon="envelope"
      title="🙂 Notification"
      message={text}
      text=''
      style={{
        position: "fixed",
        top: "30px",
        right: "30px",
        zIndex: 9999,
        minWidth: '200px',
        fontSize: 16,
        backgroundColor: 'rgb(43, 187, 173)',
        color: 'white',
        fontWeight: 'bold'
      }}
    />
  );
}

Notification.propTypes = {
  text: PropTypes.string
}

export default Notification;