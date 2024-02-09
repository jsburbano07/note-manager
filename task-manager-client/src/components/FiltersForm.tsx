import { ChangeEventHandler, useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { CascadeSelect, CascadeSelectChangeEvent } from 'primereact/cascadeselect';
import { Button } from 'primereact/button';
import { SelectButton, SelectButtonChangeEvent } from 'primereact/selectbutton';
import { useAppDispatch } from '../hooks/redux.hook';
import { fetchGetNotesWithFilters } from '../store/thunks/note.thunk';
import { cleanFilter, setFilters } from '../store/slices/note.slice';
import { MultiSelect, MultiSelectChangeEvent } from 'primereact/multiselect';
import NoteService from '../services/note.service';

interface FilterFormProps {
  setTitle: (title: string) => void;
}

const FiltersForm: React.FC<FilterFormProps> = ({ setTitle: onChangeTitle }) => {
  const dispatch = useAppDispatch();

  const [search, setSearch] = useState('');
  const [sort, setSortBy] = useState<{ code: string; label: string }>();
  const [filter, setFilter] = useState<{ label: string; code: string }>();
  const [tab, setTab] = useState<string>('LIST');
  const [tags, setTags] = useState<Array<string>>();

  const selectOptions = [
    {
      label: 'Active Notes',
      value: 'LIST',
    },
    {
      label: 'Archived Notes',
      value: 'ARCHIVED',
    },
  ];

  const sortByOptions = [
    {
      name: 'Sort by Name',
      states: [
        { label: 'Ascending (A-Z)', code: 'title-asc' },
        { label: 'Descending (Z-A)', code: 'title-desc' },
      ],
    },
    {
      name: 'Sort by Created Date',
      states: [
        { label: 'Ascending', code: 'createdAt-asc' },
        { label: 'Descending', code: 'createdAt-desc' },
      ],
    },
  ];

  const handleTitleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setSearch(event.currentTarget.value);
    dispatch(setFilters({ key: 'search', value: event.currentTarget.value }));
  };

  const handleSortByChange = ({ value }: CascadeSelectChangeEvent) => {
    dispatch(setFilters({ key: 'sort', value: value.code }));
    setSortBy(value);
  };

  const handleFilterChange = ({ value }: MultiSelectChangeEvent) => {
    setFilter(value);
    dispatch(
      setFilters({
        key: 'filters',
        value: value.join(','),
      }),
    );
  };

  const clearLocaleStates = () => {
    setSearch('');
    setSortBy(undefined);
    setFilter(undefined);
  };

  const handleClearFilters = () => {
    clearLocaleStates();
    onChangeTitle('LIST');
    setTab('LIST');
    dispatch(cleanFilter());
    dispatch(fetchGetNotesWithFilters());
  };

  const handleChangeTab = async ({ value }: SelectButtonChangeEvent) => {
    setTab(value);
    dispatch(cleanFilter());
    dispatch(setFilters({ key: 'archived', value: value }));
    clearLocaleStates();
    await dispatch(fetchGetNotesWithFilters());
    onChangeTitle(value);
  };

  const handleSubmit = async () => {
    dispatch(fetchGetNotesWithFilters());
  };

  useEffect(() => {
    async function fetchTags() {
      const tagsResponse = await NoteService.getTags();
      setTags(tagsResponse);
    }
    fetchTags();
    return () => {
      dispatch(cleanFilter());
    };
  }, []);

  return (
    <div className="text-white font-bold w-full flex flex-column px-4 gap-2">
      <section className="flex flex-column" style={{ gap: '5px' }}>
        <label htmlFor="title" className="font-bold">
          Search
        </label>
        <InputText
          className="border-round block p-2"
          type="text"
          id="title"
          value={search}
          onChange={handleTitleChange}
          placeholder="Search by title"
        />
      </section>

      <section className="flex flex-column" style={{ gap: '5px' }}>
        <label htmlFor="sortBy" className="font-bold">
          Sort By
        </label>
        <CascadeSelect
          value={sort?.label}
          onChange={handleSortByChange}
          options={sortByOptions}
          optionLabel="label"
          optionGroupLabel="name"
          optionGroupChildren={['states', 'cities']}
          className="w-full color-gray-400"
          breakpoint="767px"
          placeholder="Sort By"
          style={{ minWidth: '14rem' }}
        />
      </section>

      <section className="flex flex-column" style={{ gap: '5px' }}>
        <label htmlFor="filter" className="font-bold">
          Filter
        </label>
        <MultiSelect
          value={filter}
          onChange={handleFilterChange}
          options={tags}
          display="chip"
          placeholder="Filter by tags"
          maxSelectedLabels={3}
          className="w-full"
          filter
        />
      </section>

      <section className="flex flex-column gap-2 mt-4">
        <Button label="Submit" onClick={handleSubmit} className="custom-button-hover-blue" />
        <Button
          label="Clear Filters"
          onClick={handleClearFilters}
          className="custom-button-hover-blue"
        />
      </section>
      <section
        className="absolute w-full"
        style={{ top: '100px', left: '50%', transform: 'translateX(-50%)' }}
      >
        <hr className="my-2 m-auto border-2 border-white" style={{ width: '80%' }} />
        <h4 className="text-center font-bold">Select view Notes Status</h4>
        <SelectButton
          value={tab}
          className=" border-round block p-2 text-2xl flex justify-content-center"
          onChange={handleChangeTab}
          options={selectOptions}
          allowEmpty={false}
        />
      </section>
    </div>
  );
};

export default FiltersForm;
