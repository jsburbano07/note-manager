import { SelectButton } from 'primereact/selectbutton';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Chips } from 'primereact/chips';
import { Button } from 'primereact/button';
import { Control, Controller, FieldErrors, UseFormHandleSubmit } from 'react-hook-form';
import { INote } from '../interfaces/note.interface';
import { fetchCreateNote, fetchUpdateNote } from '../store/thunks/note.thunk';
import { useAppDispatch } from '../hooks/redux.hook';
import { useNavigate } from 'react-router-dom';

interface FormDataProps {
  control: Control<INote, any, INote>;
  handleSubmit: UseFormHandleSubmit<INote, INote>;
  errors: FieldErrors<INote>;
  isEdit?: boolean;
  _id?: string;
}

const FormNote: React.FC<FormDataProps> = ({ handleSubmit, control, errors, isEdit, _id }) => {
  const router = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit = async (data: INote) => {
    try {
      if (isEdit) {
        await dispatch(fetchUpdateNote({ _id: _id as string, noteData: data }));
      } else {
        await dispatch(fetchCreateNote(data));
      }
      router('/');
    } catch (error) {
      throw error;
    }
  };

  const options: Array<{ label: string; value: boolean }> = [
    { label: 'pi pi-check', value: true },
    { label: 'pi pi-times', value: false },
  ];
  return (
    <form className="text-white font-bold" onSubmit={handleSubmit(onSubmit)}>
      <span className="flex flex-column" style={{ gap: '5px' }}>
        <Controller
          name="title"
          control={control}
          rules={{ required: 'Title is required' }}
          render={({ field }) => (
            <>
              <label htmlFor="title" className="font-bold">
                Title
              </label>
              <InputText
                className=" border-round block p-2 "
                type="text"
                id="title"
                maxLength={15}
                placeholder="Type a title"
                {...field}
              />
              <span className="create-form__field-error">{errors.title?.message}</span>
            </>
          )}
        />
      </span>

      <span className="flex flex-column" style={{ gap: '5px' }}>
        <Controller
          name="content"
          control={control}
          rules={{ required: 'Content is required' }}
          render={({ field }) => (
            <>
              <label htmlFor="content">Content</label>
              <InputTextarea
                className=" border-round block p-2 "
                placeholder="Type content"
                maxLength={200}
                autoResize={false}
                {...field}
              ></InputTextarea>
              <span className="create-form__field-error">{errors.content?.message}</span>
            </>
          )}
        />
      </span>

      <span className="flex flex-column" style={{ gap: '5px' }}>
        <Controller
          name="tags"
          control={control}
          render={({ field }) => (
            <>
              <label htmlFor="tags">Tags</label>
              <Chips
                {...field}
                value={field.value}
                onChange={(e) => {
                  field.onChange(e?.value?.map((e) => e.toLowerCase()) as string[]);
                }}
                inputId="custom-input"
                max={3}
                maxLength={10}
                allowDuplicate={false}
                separator=","
                className="jb-custom-input-transparent"
                keyfilter={/^[^<>*! ]*$/}
              />
              <span className="create-form__field-error">{errors.tags?.message}</span>
            </>
          )}
        />
      </span>

      <span className="flex flex-column" style={{ gap: '5px' }}>
        <Controller
          name="isActive"
          control={control}
          rules={{
            validate: (value) => typeof value === 'boolean' || 'This field is required',
          }}
          render={({ field }) => (
            <>
              <label htmlFor="isActive">Active</label>
              <SelectButton
                className=" border-round block p-2 "
                value={field.value}
                onChange={(value) => field.onChange(value)}
                itemTemplate={(option) => <i className={`pi ${option.label}`}></i>}
                options={options}
              />

              <span className="create-form__field-error">{errors.isActive?.message}</span>
            </>
          )}
        />
      </span>

      <span className="flex flex-column" style={{ gap: '5px' }}>
        <Controller
          name="completed"
          control={control}
          rules={{
            validate: (value) => typeof value === 'boolean' || 'This field is required',
          }}
          render={({ field }) => (
            <>
              <label htmlFor="completed">Completed</label>
              <SelectButton
                className=" border-round block p-2"
                value={field.value}
                onChange={(value) => field.onChange(value)}
                itemTemplate={(option) => <i className={`pi ${option.label}`}></i>}
                options={options}
              />
              <span className="create-form__field-error">{errors.completed?.message}</span>
            </>
          )}
        />
      </span>

      <div className="flex flex-column gap-2 mt-4">
        <Button label="Submit" className="custom-button-hover-blue" />
      </div>
    </form>
  );
};

export default FormNote;
