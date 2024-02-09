import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Template from '../components/Template';
import './styles/CreateNote.styles.scss';
import Note from '../components/Note';
import FormNote from '../components/FormNote';
import { INote } from '../interfaces/note.interface';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useAppDispatch } from '../hooks/redux.hook';
import { cleanNote } from '../store/slices/note.slice';
import { useNavigate } from 'react-router-dom';

interface EditNoteProps {}

const EditNote: FC<EditNoteProps> = () => {
  const note = useSelector((state: RootState) => state.notes.note);
  const router = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!note) {
      router('/');
    }
    return () => {
      dispatch(cleanNote());
    };
  }, []);

  if (!note) {
    return <section>Loading</section>;
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<INote>({
    defaultValues: {
      ...note,
    },
  });

  return (
    <Template
      title="Create"
      childrenLeft={
        <FormNote
          control={control}
          handleSubmit={handleSubmit}
          errors={errors}
          _id={note?._id}
          isEdit={true}
        />
      }
      childrenRigth={
        <div className="flex justify-content-center align-items-center w-full h-full">
          <Note
            title={watch?.('title') || ''}
            content={watch?.('content') || ''}
            tags={watch?.('tags') || []}
            isActive={watch?.('isActive') || false}
            createdAt={watch?.('createdAt') || new Date()}
            completed={Boolean(watch?.('completed'))}
            showControls={false}
          />
        </div>
      }
    ></Template>
  );
};

export default EditNote;
