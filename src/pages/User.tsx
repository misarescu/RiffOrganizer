import React from 'react';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';

function UserPage() {
  const listOfMessages = [
    'Crazy Train – Ozzy Osbourne',
    'Holy Wars… The Punishment Due – Megadeth',
    ' Iron Man – Black Sabbath',
    ' Master Of Puppets – Metallica ',
    'Back In Black – AC/DC',
    'Breaking The Law – Judas Priest',
    'The Trooper – Iron Maiden',
    'Ace Of Spades – Motörhead',
    'Immigrant Song – Led Zeppelin',
    'Shout At The Devil – Mötley Crüe',
    'Welcome To My Nightmare – Alice Cooper',
    'Goddamn Electric – Pantera',
    'Sweet Child O’ Mine – Guns n’ Roses',
    'Angel Of Death – Slayer',
    'Belly Of The Beast – Anthrax',
    'Ritual – Ghost',
    'Holy Diver – Dio',
    ' Rock You Like A Hurricane – Scorpions',
    ' Eyes Of A Stranger – Queensrÿche',
    'The Moor – Opeth',
    'Black Label – Lamb of God',
    'Metal Health (Bang Your Head) – Quiet Riot',
    'Black No. 1 (Little Miss Scare-All) – Type-O Negative',
    'One – Metallica',
    'Stargazer – Rainbow',
    'Memento Mori - Lamb of God',
  ];

  return (
    <div className='grid place-items-center '>
      {/* <Card>
        <p>Sorry you don't have any songs added yet</p>
      </Card> */}
      {listOfMessages.map((message) => (
        <Card title={message.trim()}>
          <p>{message.trim()}</p>
          <Button>Add Section</Button>
        </Card>
      ))}
    </div>
  );
}

export default UserPage;
