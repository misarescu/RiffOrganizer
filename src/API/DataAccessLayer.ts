import { json, redirect } from 'react-router-dom';
import dbClient from './dbClient';
import { SectionType, SongType } from '../store/songs-slice';
import { AuthResponse } from '@supabase/supabase-js';
import { Database } from './dbTypes';

export async function logOut() {
  dbClient.auth.signOut();
}

export async function loadUserData(urlUserId: string): Promise<Response> {
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
        created_at,
        sections(
          id,
          name,
          status
        )
      )
    `
    )
    .eq('id', urlUserId)
    .order('created_at', {
      foreignTable: 'songs',
      ascending: false,
    });

  if (userQuery.data?.length === 0) {
    return redirect('/');
  }

  return json({ ...userQuery.data?.at(0) });
}

export async function createUser(
  fullName: string,
  email: string,
  password: string
) {
  // create a new user
  let { data: newUserCreated, error: createdError } =
    await dbClient.auth.signUp({
      email,
      password,
    });

  if (createdError) {
    alert(createdError.message);
    return;
  }

  // get the new user id in order to fill out information in user_info table
  if (newUserCreated) {
    const newUserId: string = newUserCreated.user ? newUserCreated.user.id : '';
    let { data, error } = await dbClient.from('user_info').insert({
      id: newUserId,
      full_name: fullName,
      email,
    });
  }
}

export async function signInWithEmail(
  email: string,
  password: string
): Promise<AuthResponse> {
  return await dbClient.auth.signInWithPassword({
    email: email,
    password: password,
  });
}

export async function getUserByEmail(email: string) {
  return await dbClient.from('user_info').select('id').eq('email', email);
}

export async function updateSection(newSection: SectionType) {
  return await dbClient
    .from('sections')
    .update(newSection)
    .eq('id', newSection.id);
}

export async function removeSection(targetSection: SectionType) {
  return await dbClient.from('sections').delete().eq('id', targetSection.id);
}

export async function insertSections(
  sections: Database['public']['Tables']['sections']['Insert'][]
) {
  return await dbClient.from('sections').insert(sections).select();
}

export async function insertSong(
  artistName: string,
  songName: string,
  userId: string
) {
  return await dbClient
    .from('songs')
    .insert({
      artist_name: artistName,
      song_name: songName,
      user_id: userId,
    })
    .select();
}

export async function removeSong(song: SongType) {
  return await dbClient.from('songs').delete().eq('id', song.id);
}

export async function resetPasswordWithEmail(userId: string, email: string) {
  const currentPath = window.location.href;
  return await dbClient.auth.resetPasswordForEmail(email, {
    redirectTo: `${currentPath}password-reset/${userId}`,
  });
}
