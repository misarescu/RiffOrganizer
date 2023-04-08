import React, { useEffect } from 'react';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import dbClient from '../API/dbClient';
import { json, redirect, useRouteLoaderData } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userActions } from '../store/user-slice';
import AddSongForm from '../components/AddSongForm';
import { songsActions } from '../store/songs-slice';
import Section from '../components/Section';

type UserData = {
  email: string;
  full_name: string;
  id: string;
  songs?: {
    id: string;
    artist_name: string;
    song_name: string;
    sections?: {
      id: string;
      name: string;
      status: string;
    }[];
  }[];
};

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
    dispatch(
      songsActions.setSongList({
        songList: userData.songs,
      })
    );
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
              <br />
              {/* TODO: add an order/index property to be able 
                        to change the order of the sections 🙂
              */}
              <ul className='flex flex-wrap w-full gap-1 md:gap-2 '>
                {song.sections?.map((section) => (
                  // for some reason rounded here needs to be lg not md
                  <li className='rounded-lg w-fit h-fit'>
                    <Section
                      key={section.id}
                      id={section.id}
                      name={section.name}
                      status={section.status}
                    />
                  </li>
                ))}
              </ul>
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
          id,
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
