import { Link } from 'react-router-dom';
import { Icons, Paths } from '../enums';
import './styles/LeftBar.style.scss';

interface NavbarProps {
  handleLogout: () => Promise<void>;
}

const Navbar: React.FC<NavbarProps> = ({ handleLogout }) => {
  const navbarItems = [
    {
      title: 'Create task',
      icon: Icons.icon_note_favorite,
      link: Paths.create_note,
      description: 'create note',
    },
    {
      title: 'List tasks',
      icon: Icons.icon_note_two,
      link: Paths.index,
      description: 'list notes',
    },
  ];

  return (
    <aside className="task-navbar__container z-3">
      <figure className="task-navbar__container-logo">
        <img
          className="task-navbar__container-logo-img"
          src="https://burbanostudio-assets.s3.us-east-2.amazonaws.com/projects/TaskManager/logo-task.svg"
          alt="logo"
          loading="lazy"
        />
      </figure>
      {navbarItems.map((item, index) => (
        <Link
          className="task-navbar__container-menu"
          key={index}
          to={item.link}
          title={item.description}
        >
          <img
            src={`https://burbanostudio-assets.s3.us-east-2.amazonaws.com/projects/TaskManager/${item.icon}.svg`}
            alt={`icon_${item.icon}`}
            loading="lazy"
          />
        </Link>
      ))}
      <img
        className="absolute left-50 cursor-pointer"
        style={{
          maxWidth: '42px',
          width: '60%',
          justifySelf: 'end',
          transform: 'translateX(-50%)',
          bottom: '10px',
          filter: 'invert(1',
        }}
        src="https://burbanostudio-assets.s3.us-east-2.amazonaws.com/projects/TaskManager/icon_power_off.svg"
        alt="logout"
        loading="lazy"
        title="logout"
        onClick={handleLogout}
      />
    </aside>
  );
};

export default Navbar;
