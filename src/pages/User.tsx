import React, { useEffect } from 'react';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import { useRouteLoaderData } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../store/user-slice';
import AddSongForm from '../components/AddSongForm';
import { songsActions } from '../store/songs-slice';
import { StoreStateType } from '../store';
import SongCard from '../components/SongCard';
import AddSectionForm from '../components/AddSectionForm';
import { loadUserData } from '../API/DataAccessLayer';

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
      <AddSectionForm />
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

export async function loader({ params }: any): Promise<Response> {
  return await loadUserData(params.userId);
}
