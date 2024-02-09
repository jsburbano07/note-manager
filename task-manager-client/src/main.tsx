import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.scss';
import { Provider } from 'react-redux';
import { persistor, store } from './store/store.ts';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CreateNote from './views/CreateNote.tsx';
import Notes from './views/Notes.tsx';
import EditNote from './views/EditNote.tsx';
import Access from './views/Access.tsx';
import Notify from './components/Notify.tsx';
import { PersistGate } from 'redux-persist/integration/react';
import { Paths } from './enums/paths.enum.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Notify />
      <BrowserRouter>
        <Routes>
          <Route path={Paths.login} element={<Access mode="Login" />} />
          <Route path={Paths.register} element={<Access mode="Register" />} />
          <Route path={Paths.index} element={<App />}>
            <Route index element={<Notes />} />
            <Route path={Paths.create_note} element={<CreateNote />} />
            <Route path={Paths.edit_note} element={<EditNote />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </PersistGate>
  </Provider>,
);
