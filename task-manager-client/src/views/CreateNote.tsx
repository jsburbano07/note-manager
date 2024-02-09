import { FC } from 'react';
import { useForm } from 'react-hook-form';
import Template from '../components/Template';
import './styles/CreateNote.styles.scss';
import Note from '../components/Note';
import FormNote from '../components/FormNote';
import { INote } from '../interfaces/note.interface';

interface CreateNoteProps {}

const CreateNote: FC<CreateNoteProps> = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<INote>({
    defaultValues: {
      createdAt: new Date(),
      title: '',
      content: '',
      isActive: true,
      completed: false,
      tags: [],
    },
  });
  return (
    <Template
      title="Create"
      childrenLeft={<FormNote control={control} handleSubmit={handleSubmit} errors={errors} />}
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

export default CreateNote;
