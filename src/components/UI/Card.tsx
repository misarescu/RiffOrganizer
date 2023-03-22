import React from 'react';

type CardProps = {
  children: React.ReactNode;
};

function Card(props: CardProps) {
  return <div className=''>{props.children}</div>;
}

export default Card;
