import { useEffect, useState } from 'react';
import Template from '../components/Template';
import FiltersForm from '../components/FiltersForm';
import ListNotes from '../components/ListNotes';
import { useAppDispatch } from '../hooks/redux.hook';
import { fetchGetNotes } from '../store/thunks/note.thunk';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const Notes = () => {
  const [title, setTitle] = useState<string>('LIST');
  const dispatch = useAppDispatch();
  const notes = useSelector((state: RootState) => state.notes.notes);
  useEffect(() => {
    dispatch(fetchGetNotes());
  }, [dispatch]);
  return (
    <Template
      title={title}
      leftSize="short"
      childrenLeft={<FiltersForm setTitle={setTitle} />}
      childrenRigth={<ListNotes notes={notes} />}
    />
  );
};

export default Notes;
