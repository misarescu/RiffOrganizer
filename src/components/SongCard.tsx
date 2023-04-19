import React from 'react';
import Card from './UI/Card';
import Section from './Section';
import Button from './UI/Button';
import { SongType, songsActions } from '../store/songs-slice';
import { useDispatch } from 'react-redux';
import { removeSong } from '../API/DataAccessLayer';

function SongCard(props: { song: SongType }) {
  const dispatch = useDispatch();

  function addSectionHandler() {
    dispatch(songsActions.openSectionForm(props.song.id));
  }

  async function removeSongHandler() {
    const { data, error } = await removeSong(props.song);
    dispatch(songsActions.removeSong(props.song));
  }

  const songTitle = (
    <div className='flex justify-between items-center px-2 md:px-6'>
      {`${props.song.song_name} - ${props.song.artist_name}`}{' '}
      <div>
        <Button
          special
          className=' text-xs md:text-base'
          onClick={removeSongHandler}>
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
                song_id={section.song_id}
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
