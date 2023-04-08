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
import FormSongSection from './UI/FormSongSection';

function AddSongForm() {
  const songNameInput = useInput((value: string) => value.trim() !== '');
  const artistNameInput = useInput((value: string) => value.trim() !== '');
  const songName = useRef<HTMLInputElement>(null);
  const artistName = useRef<HTMLInputElement>(null);

  const sectionList = [
    { ref: useRef<HTMLInputElement>(null), name: 'Intro' },
    { ref: useRef<HTMLInputElement>(null), name: 'Verse' },
    { ref: useRef<HTMLInputElement>(null), name: 'Chorus' },
    { ref: useRef<HTMLInputElement>(null), name: 'Outro' },
    { ref: useRef<HTMLInputElement>(null), name: 'Pre-Chorus' },
  ];

  const dispatch = useDispatch();
  const isVisible = useSelector(
    (state: StoreStateType) => state.songs.isSongFormVisible
  );

  function closeModalHandler() {
    dispatch(songsActions.closeSongForm());
  }

  function addSongHandler() {
    console.table(
      sectionList.map((section) => {
        return {
          name: section.name,
          checked: section.ref.current?.checked,
        };
      })
    );
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
          {sectionList.map((section) => (
            <FormSongSection name={section.name} ref={section.ref} />
          ))}
        </FormSongSectionList>
        <FormButtonList>
          <Button outline onClick={closeModalHandler}>
            Cancel
          </Button>
          <Button onClick={addSongHandler}>Add Song</Button>
        </FormButtonList>
      </Form>
    </Modal>
  ) : null;
}

export default AddSongForm;
