import React from 'react';
import Card from './UI/Card';
import Section from './Section';
import Button from './UI/Button';

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
    <Card title={`${props.song.song_name} - ${props.song.artist_name}`}>
      <div className='flex justify-between'>
        <p>Your progress</p>
        <Button>Add section</Button>
      </div>
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
