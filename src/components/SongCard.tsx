import React from 'react';
import Card from './UI/Card';
import Section from './Section';
import Button from './UI/Button';
import { songsActions } from '../store/songs-slice';
import { useDispatch } from 'react-redux';

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
  const dispatch = useDispatch();

  function addSectionHandler() {
    dispatch(songsActions.openSectionForm(props.song.id));
  }

  const songTitle = (
    <div className='flex justify-between items-center px-2 md:px-6'>
      {`${props.song.song_name} - ${props.song.artist_name}`}{' '}
      <div>
        <Button special className=''>
          Remove
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <Card title={songTitle}>
        <div className='flex justify-between'>
          <p>Your progress</p>
          <Button onClick={addSectionHandler}>Add section</Button>
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
    </>
  );
}

export default SongCard;
