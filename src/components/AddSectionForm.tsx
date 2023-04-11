import React, { useEffect, useRef, useState } from 'react';
import useInput from './hooks/use-input';
import { useDispatch, useSelector } from 'react-redux';
import { StoreStateType } from '../store';
import { songsActions } from '../store/songs-slice';
import dbClient from '../API/dbClient';
import Modal from './UI/Modal';
import { Form } from 'react-router-dom';
import FormInput from './UI/FormInput';
import FormSongSectionList from './UI/FormSongSectionList';
import FormSongSection from './UI/FormSongSection';
import FormButtonList from './UI/FormButtonList';
import Button from './UI/Button';

type SectionType = { name?: string; status?: string; song_id: string };

function AddSectionForm() {
  const sectionNameInput = useInput((value: string) => value.trim() !== '');
  const sectionName = useRef<HTMLInputElement>(null);
  const [isSelectionValid, setIsSelectionValid] = useState(false);

  // TODO: maybe use a Map instad of an object arrray
  const sectionList = [
    { ref: useRef<HTMLInputElement>(null), name: 'Intro' },
    { ref: useRef<HTMLInputElement>(null), name: 'Verse' },
    { ref: useRef<HTMLInputElement>(null), name: 'Pre-Chorus' },
    { ref: useRef<HTMLInputElement>(null), name: 'Chorus' },
    { ref: useRef<HTMLInputElement>(null), name: 'Bridge' },
    { ref: useRef<HTMLInputElement>(null), name: 'Outro' },
  ];

  const dispatch = useDispatch();
  const isVisible = useSelector(
    (state: StoreStateType) => state.songs.isSectionFormVisible
  );
  const songData = useSelector(
    (state: StoreStateType) =>
      state.songs.songList.filter(
        (song) => song.id === state.songs.activeSongToAddSection
      )[0]
  );

  useEffect(() => {
    // on a new AddSectionForm pop up, call the validate selection
    // to disable the add button on empty selections
    // without this after the first use the button is valid by default
    // due to the validation being the same
    validateSelection();

    console.log('selected song is: %o', songData);
  }, [songData]);

  function validateSelection() {
    setIsSelectionValid(
      sectionList
        .map((section) => section.ref.current?.checked)
        .filter((section) => section).length > 0
    );
  }
  function formValidationCondition() {
    return sectionNameInput.isValid || isSelectionValid;
  }

  const formIsValid = formValidationCondition();

  function closeModalHandler() {
    dispatch(songsActions.closeSectionForm());
  }

  async function addSongHandler() {
    // const { data: songsData, error: songsError } = await dbClient
    //   .from('songs')
    //   .insert({
    //     artist_name: artistName.current?.value.trim(),
    //     song_name: sectionName.current?.value.trim(),
    //     user_id: userId,
    //   })
    //   .select();

    // const songId = songsData?.at(0)?.id;

    // const selectedSections: SectionType[] = sectionList
    //   .filter((section) => section.ref.current?.checked === true) // only desired sections
    //   .map((section) => {
    //     return {
    //       song_id: songId,
    //       name: section.name,
    //       status: 'not started',
    //     } as SectionType;
    //   });

    // const { data: sectionsData, error: sectionsError } = await dbClient
    //   .from('sections')
    //   .insert(selectedSections)
    //   .select();
    sectionNameInput.reset();
    closeModalHandler();
  }

  return isVisible ? (
    <Modal title='Add a new section' onClick={closeModalHandler}>
      <Form className=' min-w-fit w-1/2 mx-auto'>
        <FormInput
          inputLabel='Custom Section'
          inputId='section-name'
          inputType='text'
          errorMessage='Section name must not be empty'
          hasError={sectionNameInput.hasError}
          onChange={sectionNameInput.onChangeHandler}
          onBlur={sectionNameInput.onBlurHandler}
          ref={sectionName}
        />

        <FormSongSectionList>
          {sectionList.map((section) => (
            <FormSongSection
              key={section.name}
              name={section.name}
              ref={section.ref}
              onChange={() => validateSelection()}
              // disabled
            />
          ))}
        </FormSongSectionList>
        <FormButtonList>
          <Button outline onClick={closeModalHandler}>
            Cancel
          </Button>
          <Button onClick={addSongHandler} disabled={!formIsValid}>
            Add Song
          </Button>
        </FormButtonList>
      </Form>
    </Modal>
  ) : null;
}

export default AddSectionForm;
