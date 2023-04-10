import React, { useEffect } from 'react';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import dbClient from '../API/dbClient';
import { json, redirect, useRouteLoaderData } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../store/user-slice';
import AddSongForm from '../components/AddSongForm';
import { songsActions } from '../store/songs-slice';
import Section from '../components/Section';
import { StoreStateType } from '../store';
import SongCard from '../components/SongCard';

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
  const songsDataStore = useSelector(
    (state: StoreStateType) => state.songs.songList
  );

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

        {songsDataStore?.length === 0 ? (
          <Card>
            <p>Sorry you don't have any songs added yet</p>
          </Card>
        ) : (
          songsDataStore?.map((song) => <SongCard song={song} key={song.id} />)
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
