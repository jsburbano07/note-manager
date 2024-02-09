import { useForm } from 'react-hook-form';
import Template from '../components/Template';
import { IAuthForm } from '../interfaces/auth.interface';
import AccessForm from '../components/AccessForm';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Navigate } from 'react-router-dom';
import { Paths } from '../enums';

interface AccessProps {
  mode: 'Login' | 'Register';
}
const Access: React.FC<AccessProps> = ({ mode }) => {
  const token = useSelector((state: RootState) => state.auth.token);

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<IAuthForm>({
    defaultValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
  });
  if (!!token) {
    return <Navigate to={Paths.index} replace />;
  }
  return (
    <Template
      title={mode}
      childrenLeft={
        <AccessForm
          control={control}
          handleSubmit={handleSubmit}
          errors={errors}
          getValues={getValues}
          type={mode}
        />
      }
      childrenRigth={
        <section className="w-full h-full p-4 flex align-items-center justify-content-center">
          <img
            style={{
              filter: 'grayscale(1) brightness(.3) drop-shadow(0 0 10px #0008)',
              width: '80%',
              maxWidth: '500px',
            }}
            src="https://burbanostudio-assets.s3.us-east-2.amazonaws.com/projects/TaskManager/logo-task.svg"
            alt="logo"
          />
        </section>
      }
    />
  );
};

export default Access;
