import React, { useEffect } from 'react';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import dbClient from '../API/dbClient';
import { json, redirect, useRouteLoaderData } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userActions } from '../store/user-slice';
import AddSongForm from '../components/AddSongForm';
import { songsActions } from '../store/songs-slice';

type UserData = {
  email: string;
  full_name: string;
  id: string;
  songs?: {
    id: string;
    artist_name: string;
    song_name: string;
    sections?: {
      name: string;
      status: string;
    };
  }[];
};

// const listOfSongs: string[] = [
// 'Crazy Train – Ozzy Osbourne',
// 'Holy Wars… The Punishment Due – Megadeth',
// ' Iron Man – Black Sabbath',
// ' Master Of Puppets – Metallica ',
// 'Back In Black – AC/DC',
// 'Breaking The Law – Judas Priest',
// 'The Trooper – Iron Maiden',
// 'Ace Of Spades – Motörhead',
// 'Immigrant Song – Led Zeppelin',
// 'Shout At The Devil – Mötley Crüe',
// 'Welcome To My Nightmare – Alice Cooper',
// 'Goddamn Electric – Pantera',
// 'Sweet Child O’ Mine – Guns n’ Roses',
// 'Angel Of Death – Slayer',
// 'Belly Of The Beast – Anthrax',
// 'Ritual – Ghost',
// 'Holy Diver – Dio',
// ' Rock You Like A Hurricane – Scorpions',
// ' Eyes Of A Stranger – Queensrÿche',
// 'The Moor – Opeth',
// 'Black Label – Lamb of God',
// 'Metal Health (Bang Your Head) – Quiet Riot',
// 'Black No. 1 (Little Miss Scare-All) – Type-O Negative',
// 'One – Metallica',
// 'Stargazer – Rainbow',
// 'Memento Mori - Lamb of God',
// ];

function UserPage() {
  const userData = useRouteLoaderData('user-page') as UserData;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      userActions.setUserInfo({
        email: userData.email,
        fullName: userData.full_name,
        userId: userData.id,
      })
    );
    dispatch(userActions.login());
    console.log(userData);
  }, [userData]);

  function addSongHandler() {
    dispatch(songsActions.openSongForm());
  }

  return (
    <>
      <AddSongForm />
      <div className='grid place-items-center '>
        <Button onClick={addSongHandler} className='mt-4 md:mt-6'>
          Add a New Song
        </Button>

        {userData.songs?.length === 0 ? (
          <Card>
            <p>Sorry you don't have any songs added yet</p>
          </Card>
        ) : (
          userData.songs?.map((song) => (
            <Card
              key={song.id}
              title={`${song.song_name} - ${song.artist_name}`}>
              <p>Your progress:</p>
              <Button>Add Section</Button>
            </Card>
          ))
        )}
      </div>
    </>
  );
}

export default UserPage;

async function loadUserData(urlUserId: string): Promise<Response> {
  const { data: sessionData } = await dbClient.auth.getSession();
  const currentSession = sessionData.session;
  if (!currentSession) {
    return redirect('/');
  }

  const userQuery = await dbClient
    .from('user_info')
    .select(
      `
      id,
      full_name,
      email,
      songs(
        id,
        artist_name,
        song_name,
        sections(
          name,
          status
        )
      )
    `
    )
    .eq('id', urlUserId);

  if (userQuery.data?.length === 0) {
    return redirect('/');
  }

  return json({ ...userQuery.data?.at(0) });
}

export async function loader({ params }: any): Promise<Response> {
  return await loadUserData(params.userId);
}
