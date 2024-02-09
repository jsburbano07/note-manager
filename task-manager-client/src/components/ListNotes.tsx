import { INote } from '../interfaces/note.interface';
import Note from './Note';

interface ListNotesProps {
  notes: INote[];
}
const ListNotes: React.FC<ListNotesProps> = ({ notes }) => {
  return (
    <div className="w-full min-h-full">
      {notes?.length ? (
        <section className="w-full flex flex-column align-items-center gap-6 pt-4 flex-wrap pb-8">
          {notes.map((n) => (
            <Note
              key={n._id as string}
              _id={n._id as string}
              title={n.title}
              content={n.content}
              isActive={n.isActive}
              completed={n.completed}
              tags={n.tags}
              createdAt={n.createdAt}
              showControls={true}
            />
          ))}
        </section>
      ) : (
        <section className="w-full pt-4">
          <h3 className="text-center text-3xl">Notes not found!</h3>
        </section>
      )}
    </div>
  );
};

export default ListNotes;
