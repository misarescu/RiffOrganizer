import React, { MouseEvent, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import Card from './Card';

const portalElement = document.getElementById('overlays') as HTMLElement;
type ModalProps = {
  children: ReactNode;
  onClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
  title?: string;
};

function Backdrop(props: {
  onClick: React.MouseEventHandler<HTMLDivElement> | undefined;
}) {
  return (
    <div
      onClick={props.onClick}
      className='backdrop-blur backdrop-brightness-50 w-full h-screen z-20 fixed top-0 left-0'
    />
  );
}

function ModalOverlay(props: ModalProps) {
  return (
    <Card
      className='fixed top-1/4 left-[15%] min-w-[70%] z-30'
      title={props.title}>
      {props.children}
    </Card>
  );
}

function Modal(props: ModalProps) {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClick={props.onClick} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay title={props.title}>{props.children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
}

export default Modal;
