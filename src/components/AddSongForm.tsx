import React, { useRef } from 'react';
import Modal from './UI/Modal';
import { Form } from 'react-router-dom';
import FormInput from './UI/FormInput';
import { useDispatch, useSelector } from 'react-redux';
import { songsActions } from '../store/songs-slice';
import { StoreStateType } from '../store';
import FormButtonList from './UI/FormButtonList';
import Button from './UI/Button';
import useInput from './hooks/use-input';
import FormSongSectionList from './UI/FormSongSectionList';

function AddSongForm() {
  const songNameInput = useInput((value: string) => value.trim() !== '');
  const artistNameInput = useInput((value: string) => value.trim() !== '');
  const songName = useRef<HTMLInputElement>(null);
  const artistName = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const isVisible = useSelector(
    (state: StoreStateType) => state.songs.isSongFormVisible
  );

  function closeModalHandler() {
    dispatch(songsActions.closeSongForm());
  }

  return isVisible ? (
    <Modal title='Add a new song' onClick={closeModalHandler}>
      <Form className=' min-w-fit w-1/2 mx-auto'>
        <FormInput
          inputLabel='Song Name'
          inputId='song-name'
          inputType='text'
          errorMessage='Song name must not be empty'
          hasError={songNameInput.hasError}
          onChange={songNameInput.onChangeHandler}
          onBlur={songNameInput.onBlurHandler}
          ref={songName}
        />
        <FormInput
          inputLabel='Artist Name'
          inputId='artist-name'
          inputType='text'
          errorMessage='Artist name must not be empty'
          hasError={artistNameInput.hasError}
          onChange={artistNameInput.onChangeHandler}
          onBlur={artistNameInput.onBlurHandler}
          ref={artistName}
        />

        <FormSongSectionList>
          <Button>Intro</Button>
          <Button>Chorus</Button>
          <Button>Pre-chorus</Button>
          <Button>Verse</Button>
          <Button>Outro</Button>
        </FormSongSectionList>
        <FormButtonList>
          <Button outline onClick={closeModalHandler}>
            Cancel
          </Button>
          <Button>Add Song</Button>
        </FormButtonList>
      </Form>
    </Modal>
  ) : null;
}

export default AddSongForm;
