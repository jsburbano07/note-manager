import { ReactNode, FC, useState } from 'react';
import { Button } from 'primereact/button';

import './styles/Template.style.scss';

interface TemplateProps {
  title?: string;
  leftSize?: string;
  childrenLeft?: ReactNode;
  childrenRigth?: ReactNode;
}

const Template: FC<TemplateProps> = ({ title, leftSize, childrenLeft, childrenRigth }) => {
  const [isClose, SetIsClose] = useState(false);
  function toggleClose(): void {
    SetIsClose((v) => !v);
  }
  return (
    <section className="task-template__container">
      <main
        className={`task-template__container-tool transition-transform transition-duration-300 transition-ease-in z-2`}
      >
        <aside
          className={`bg-gray-100 task-template__container-tool-form transition-duration-300 transition-ease-in transition-transform z-2 ${isClose ? 'hide' : ''} ${leftSize} relative`}
        >
          <h1 className="font-bold text-white text-6xl absolute top-0 left-0 uppercase w-full text-center">
            {title || '[Title]'}
          </h1>
          {childrenLeft}
        </aside>
        <aside className="overflow-auto flex flex-1 h-full">{childrenRigth}</aside>
        <Button
          onClick={toggleClose}
          className="task-template__container-tool-toggle p-button-rounded fixed z-3 custom-button-blue"
          style={{ bottom: '75px', right: '5px' }}
          children={<i className={`pi pi-${isClose ? 'align-center' : 'times'}`} />}
        />
      </main>
    </section>
  );
};

export default Template;
