import React, { useRef, useEffect } from 'react';
import { Toast } from 'primereact/toast';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { cleanNotify } from '../store/slices/ui.slice';

const Notify: React.FC = () => {
  const toast = useRef<Toast>(null);
  const dispatch = useDispatch();
  const notify = useSelector((state: RootState) => state.ui.notify);
  useEffect(() => {
    if (notify) {
      toast.current?.show({
        severity: notify.severity,
        summary: notify.title,
        detail: notify.content,
      });
    }
    return () => {
      dispatch(cleanNotify());
    };
  }, [notify]);

  return (
    <div className="card flex justify-content-center">
      <Toast ref={toast} />
    </div>
  );
};

export default Notify;
