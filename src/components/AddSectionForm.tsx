import React, { useEffect, useRef, useState } from 'react';
import useInput from './UI/hooks/use-input';
import { useDispatch, useSelector } from 'react-redux';
import { StoreStateType } from '../store';
import { songsActions } from '../store/songs-slice';
import dbClient from '../API/dbClient';
import Modal from './UI/Modal';
import { useFetcher } from 'react-router-dom';
import FormInput from './UI/FormInput';
import FormSongSectionList from './UI/FormSongSectionList';
import FormSongSection from './UI/FormSongSection';
import FormButtonList from './UI/FormButtonList';
import Button from './UI/Button';

type SectionType = { name?: string; status?: string; song_id: string };

function AddSectionForm() {
  const fetcher = useFetcher();
  const sectionNameInput = useInput((value: string) => value.trim() !== '');
  const sectionName = useRef<HTMLInputElement>(null);
  const [isSelectionValid, setIsSelectionValid] = useState(false);

  // TODO: maybe use a Map instad of an object arrray
  const sectionList: {
    ref: React.RefObject<HTMLInputElement>;
    name: string;
  }[] = [
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

  async function addSectionHandler() {
    // get the str list of the already included sections and check the
    const presentSections = songData.sections.map(
      (songDataSection) => songDataSection.name
    );

    const newSections = sectionList
      .filter((section) => section.ref.current?.checked === true)
      .map((section) => section.name) // get the str list of the selected sections
      .filter((sectionName) => !presentSections.includes(sectionName))
      .map((sectionName) => {
        return {
          song_id: songData.id,
          name: sectionName,
          status: 'not started',
        } as SectionType;
      });

    if (sectionName.current?.value !== '') {
      newSections.push({
        song_id: songData.id,
        name: sectionName.current?.value,
        status: 'not started',
      } as SectionType);
    }

    const { data: sectionsData, error: sectionsError } = await dbClient
      .from('sections')
      .insert(newSections)
      .select();

    console.log('the new section list is %o', newSections);

    sectionNameInput.reset();
    closeModalHandler();
  }

  return isVisible ? (
    <Modal title='Add a new section' onClick={closeModalHandler}>
      <fetcher.Form className=' min-w-fit w-1/2 mx-auto'>
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
              // disabled={section.disabled}
            />
          ))}
        </FormSongSectionList>
        <FormButtonList>
          <Button outline onClick={closeModalHandler}>
            Cancel
          </Button>
          <Button onClick={addSectionHandler} disabled={!formIsValid}>
            Add Section
          </Button>
        </FormButtonList>
      </fetcher.Form>
    </Modal>
  ) : null;
}

export default AddSectionForm;
