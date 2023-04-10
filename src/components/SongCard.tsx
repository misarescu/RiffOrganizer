import React from 'react';
import Card from './UI/Card';
import Section from './Section';

function SongCard(props: {
  song: {
    id: string;
    artist_name: string;
    song_name: string;
    sections?: {
      id: string;
      name: string;
      status: string;
    }[];
  };
}) {
  return (
    <Card
      key={props.song.id}
      title={`${props.song.song_name} - ${props.song.artist_name}`}>
      <p>Your progress:</p>
      <br />
      {/* TODO: add an order/index property to be able 
                        to change the order of the sections 🙂
              */}
      <ul className='flex flex-wrap w-full gap-1 md:gap-2 '>
        {props.song.sections?.map((section) => (
          // for some reason rounded here needs to be lg not md
          <li key={section.id} className='rounded-lg w-fit h-fit'>
            <Section
              id={section.id}
              name={section.name}
              status={section.status}
            />
          </li>
        ))}
      </ul>
    </Card>
  );
}

export default SongCard;
