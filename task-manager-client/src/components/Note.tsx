import { INote } from '../interfaces/note.interface';
import './styles/Note.style.scss';
import { Card } from 'primereact/card';
import { formatDistanceToNow } from 'date-fns';
import { useAppDispatch } from '../hooks/redux.hook';
import { fetchDeleteNote, fetchGetNoteById, fetchUpdateNote } from '../store/thunks/note.thunk';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';

export enum ActionsTask {
  DELETE = 'DELETE',
  EDIT = 'EDIT',
  UNARCHIVE = 'UNARCHIVE',
  ARCHIVE = 'ARCHIVE',
  COMPLETE = 'COMPLETE',
  PENDING = 'PENDING',
}

const Note: React.FC<INote & { showControls: boolean }> = ({
  _id,
  title,
  content,
  tags,
  isActive,
  createdAt,
  showControls,
  completed,
}) => {
  const dispatch = useAppDispatch();

  const router = useNavigate();

  const emitEvent = async (event: ActionsTask) => {
    switch (event) {
      case ActionsTask.DELETE:
        return dispatch(fetchDeleteNote(_id as string));
      case ActionsTask.UNARCHIVE:
        return dispatch(fetchUpdateNote({ _id: _id as string, noteData: { isActive: true } }));
      case ActionsTask.ARCHIVE:
        return dispatch(fetchUpdateNote({ _id: _id as string, noteData: { isActive: false } }));
      case ActionsTask.COMPLETE:
        return dispatch(fetchUpdateNote({ _id: _id as string, noteData: { completed: true } }));
      case ActionsTask.PENDING:
        return dispatch(
          fetchUpdateNote({
            _id: _id as string,
            noteData: { completed: false },
          }),
        );
      case ActionsTask.EDIT:
        try {
          await dispatch(fetchGetNoteById(_id as string));
          router('/edit-note');
        } catch (error) {
          throw error;
        }
        return;
      default:
        return;
    }
  };
  return (
    <Card
      pt={{
        body: {
          style: {
            gap: showControls ? '10px' : '30px',
          },
        },
      }}
      className={`text-white flex flex-column justify-content-center gap-2 jb-custom-text-${
        !isActive ? 'archived' : !!completed ? 'completed' : 'pending'
      } jb-custom-shadow-${
        !isActive ? 'archived' : !!completed ? 'completed' : 'pending'
      } jb-custom-size-`}
      style={{
        width: '360px',
        background: !isActive ? '#889999da' : 'var(--color-primary)',
        height: '400px',
        position: 'relative',
      }}
      title={
        <section
          className={`${isActive ? '' : 'text-gray-800'} uppercase`}
          style={{ wordBreak: 'break-word', hyphens: 'auto' }}
        >
          {title || '[Card Title]'}
        </section>
      }
      subTitle={
        <section className="flex">
          <span
            className={`mr-1 border-round px-2 text-gray-900 jb-custom-bg-${
              completed ? 'completed-low' : 'pending-low'
            }`}
          >
            {completed ? 'COMPLETED' : 'PENDING'}
          </span>
          <p>||</p>
          <p className="ml-1 border-round px-2 bg-gray-300 text-gray-900">
            {formatDistanceToNow(createdAt, { addSuffix: true }) || '[Date]'}
          </p>
        </section>
      }
      footer={
        <>
          <div className="card flex align-items-center gap-2 flex-wrap custom-tags">
            {tags?.length > 0 &&
              tags.map((tag, index) => (
                <p key={index} className="mr-2 mb-2 p-1 border-round bg-gray-700">
                  {tag}
                </p>
              ))}
          </div>
          {!tags?.length && !showControls && <div className="mr-2 mb-2">[tags here]</div>}
          <span className="flex justify-content-end">
            <p
              className={`${
                isActive
                  ? completed
                    ? 'text-green-500 bg-gray-700'
                    : 'text-orange-500 bg-gray-700'
                  : 'bg-blue-500 text-white'
              } text-sm text-right p-1 border-round`}
            >
              {isActive ? 'Active' : 'Archived'}
            </p>
          </span>
          {showControls && (
            <section
              className={`absolute bottom-0 left-0 w-full jb-custom-grad- border-round-bottom pb-3 flex gap-2 justify-content-between custom-buttons${
                !isActive ? '-archived' : ''
              }`}
            >
              <Button
                icon="pi pi-times"
                severity="danger"
                aria-label="Cancel"
                onClick={() => emitEvent?.(ActionsTask.DELETE)}
                tooltip="Delete Note"
                tooltipOptions={{
                  position: 'top',
                  showDelay: 100,
                  mouseTrack: true,
                  mouseTrackTop: 15,
                }}
                pt={{ root: { className: 'bg-orange-300 border-none' } }}
              />
              <Button
                icon="pi pi-book"
                severity="info"
                aria-label="Cancel"
                onClick={() => emitEvent?.(ActionsTask.EDIT)}
                tooltip="Edit note"
                tooltipOptions={{
                  position: 'top',
                  showDelay: 100,
                  mouseTrack: true,
                  mouseTrackTop: 15,
                }}
                pt={{ root: { className: 'bg-yellow-300 border-none' } }}
              />
              {!isActive ? (
                <>
                  <Button
                    icon="pi pi-bookmark-fill"
                    severity="info"
                    aria-label="Cancel"
                    onClick={() => emitEvent?.(ActionsTask.UNARCHIVE)}
                    tooltip="Unarchive note"
                    tooltipOptions={{
                      position: 'top',
                      showDelay: 100,
                      mouseTrack: true,
                      mouseTrackTop: 15,
                    }}
                    pt={{ root: { className: 'bg-blue-300 border-none' } }}
                  />
                </>
              ) : (
                <>
                  <Button
                    icon="pi pi-bookmark"
                    severity="info"
                    aria-label="Cancel"
                    onClick={() => emitEvent?.(ActionsTask.ARCHIVE)}
                    tooltip="Archive note"
                    tooltipOptions={{
                      position: 'top',
                      showDelay: 100,
                      mouseTrack: true,
                      mouseTrackTop: 15,
                    }}
                    pt={{ root: { className: 'bg-purple-300 border-none' } }}
                  />
                </>
              )}
              {completed ? (
                <Button
                  icon="pi pi-clock"
                  severity="info"
                  aria-label="Cancel"
                  onClick={() => emitEvent?.(ActionsTask.PENDING)}
                  tooltip="Mark Note as Pending"
                  tooltipOptions={{
                    position: 'top',
                    showDelay: 100,
                    mouseTrack: true,
                    mouseTrackTop: 15,
                  }}
                  pt={{ root: { className: 'bg-green-300 border-none ' } }}
                />
              ) : (
                <Button
                  icon="pi pi-check"
                  severity="info"
                  aria-label="Cancel"
                  onClick={() => emitEvent?.(ActionsTask.COMPLETE)}
                  tooltip="Completed"
                  tooltipOptions={{
                    position: 'top',
                    showDelay: 100,
                    mouseTrack: true,
                    mouseTrackTop: 15,
                  }}
                  pt={{ root: { className: 'bg-green-300 border-none ' } }}
                />
              )}
            </section>
          )}
        </>
      }
    >
      <p
        className={`${
          !isActive ? 'bg-gray-300 text-gray-900' : 'bg-gray-700 text-gray-200'
        } p-1 border-round`}
        style={{ minHeight: '120px', wordBreak: 'break-word', hyphens: 'auto' }}
      >
        {content || '[Card Description]'}
      </p>
    </Card>
  );
};

export default Note;
