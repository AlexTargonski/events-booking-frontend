import React  from 'react';
import styled from 'styled-components';

const Modal = props => (
  <ModalWrapper>
    <Header>
      <h1>{props.title}</h1>
    </Header>
    <Content>
      {props.children}
    </Content>
    <Actions>
      {props.canCancel && (
        <button onClick={props.onCancel}>
          Cancel
        </button>
      )}
      {props.canConfirm && (
        <button onClick={props.onConfirm}>
          Confirm
        </button>
      )}
    </Actions>
  </ModalWrapper>
);

const ModalWrapper = styled.div`
  width      : 90%;
  background : white;
  box-shadow : 0 2px 8px rgba(0, 0, 0, 0.26);
  position   : fixed;
  top        : 20vh;
  left       : 5%;

  @media (min-width: 768px) {
    width : 30rem;
    left  : calc((100% - 30rem) / 2);
  }
`;

const Header = styled.div`
  padding    : 12px;
  background : #222534;
  color      : white;
`;

const Content = styled.div`
  padding : 10px;
`;

const Actions = styled.div`
  display         : flex;
  justify-content : flex-end;
  padding         : 1rem;
`;

export default Modal;
