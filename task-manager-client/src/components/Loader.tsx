import { ThreeCircles } from 'react-loader-spinner';
import Typewriter from 'react-ts-typewriter';
const Loader = () => {
  return (
    <div
      className="fixed z-5 w-full h-full flex flex-column align-items-center py-6 gap-8"
      style={{
        background: 'var(--img-pattern-logo) repeat center/10%',
        backgroundColor: 'var(--color-primary)',
      }}
    >
      <figure className="w-15rem h-15rem overflow-hidden">
        <img
          src="https://burbanostudio-assets.s3.us-east-2.amazonaws.com/projects/TaskManager/logo-task.svg"
          alt="logo"
          loading="lazy"
        />
      </figure>
      <section
        className="absolute left-50 top-50 flex flex-column align-items-center"
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        <ThreeCircles
          visible={true}
          height="100"
          width="100"
          color="#ffffff"
          ariaLabel="three-circles-loading"
        />

        <h2 className="text-white py-2">
            <Typewriter text={'Loading...'} loop={true} speed={100}/>
        </h2>
      </section>
    </div>
  );
};

export default Loader;
