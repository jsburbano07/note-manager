import { Button } from 'primereact/button';
import {
  Control,
  Controller,
  FieldErrors,
  UseFormGetValues,
  UseFormHandleSubmit,
} from 'react-hook-form';
import { IAuthForm } from '../interfaces/auth.interface';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../hooks/redux.hook';
import { fetchLogin, fetchRegister } from '../store/thunks/auth.thunk';
interface FormDataProps {
  handleSubmit: UseFormHandleSubmit<IAuthForm>;
  control: Control<IAuthForm, any, IAuthForm>;
  errors: FieldErrors<IAuthForm>;
  type: 'Register' | 'Login';
  getValues: UseFormGetValues<IAuthForm>;
}

const AccessForm: React.FC<FormDataProps> = ({
  handleSubmit,
  control,
  errors,
  type,
  getValues,
}) => {
  const dispatch = useAppDispatch();
  const router = useNavigate();
  async function onSubmit(data: IAuthForm) {
    try {
      if (type === 'Register') {
        await dispatch(fetchRegister(data));
      } else {
        await dispatch(fetchLogin(data));
      }
      router('/');
    } catch (error) {
      throw error;
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="text-white font-bold">
      <div className="flex flex-column" style={{ gap: '5px' }}>
        <Controller
          name="username"
          control={control}
          rules={{
            required: 'Username is required',
            pattern: {
              value: /^[\w-]+(\.[\w-]+)*@[A-Za-z0-9]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$/,
              message: 'Username must be a valid email',
            },
          }}
          render={({ field }) => (
            <>
              <label htmlFor="username" className="font-bold">
                Username
              </label>
              <InputText {...field} />
              <span
                className="p-1 w-full text-red-500 border-round text-xs"
                style={{ background: '#ffffffaa', backdropFilter: 'blur(10px)' }}
              >
                {errors.username?.message}
              </span>
            </>
          )}
        />
      </div>

      <div className="flex flex-column" style={{ gap: '5px' }}>
        <Controller
          name="password"
          control={control}
          rules={{
            required: 'Password is required',
            minLength: { value: 8, message: 'Pasword must have a minimum of 8 characters.' },
            maxLength: { value: 16, message: 'Password must have a maximum of 16 characters ' },
          }}
          render={({ field }) => (
            <>
              <label htmlFor="password" className="font-bold">
                Password
              </label>
              <Password
                {...field}
                toggleMask
                className="w-full"
                feedback={false}
                pt={{ input: { className: 'w-full' } }}
              />
              <span
                className="p-1 w-full text-red-500 border-round text-xs"
                style={{ background: '#ffffffaa', backdropFilter: 'blur(10px)' }}
              >
                {errors.password?.message}
              </span>
            </>
          )}
        />
      </div>

      {type === 'Register' && (
        <div className="flex flex-column" style={{ gap: '5px' }}>
          <Controller
            name="confirmPassword"
            control={control}
            rules={{
              required: 'Confirm Password is required',
              validate: (value) => value === getValues('password') || 'Passwords do not match',
            }}
            render={({ field }) => (
              <>
                <label htmlFor="confirmPassword" className="font-bold">
                  Confirm Password
                </label>
                <Password
                  {...field}
                  className="w-full"
                  feedback={false}
                  pt={{ input: { className: 'w-full' } }}
                />
                <span
                  className="p-1 w-full text-red-500 border-round text-xs"
                  style={{ background: '#ffffffaa', backdropFilter: 'blur(10px)' }}
                >
                  {errors.confirmPassword?.message}
                </span>
              </>
            )}
          />
        </div>
      )}

      <div className="flex flex-column gap-2 mt-4" style={{ gridColumn: '1 / span 2' }}>
        <Button label="Submit" className="custom-button-hover-blue w-full" />
      </div>
      <span
        className="flex gap-1 text-blue-500 justify-content-center"
        style={{ gridColumn: '1 / span 2' }}
      >
        <p className="text-white font-light">
          {type === 'Register' ? '¿Have an account?' : 'Have not an account?'}
        </p>
        {type === 'Register' ? (
          <Link to={'/login'}>Login</Link>
        ) : (
          <Link to={'/register'}>Join Us</Link>
        )}
      </span>
    </form>
  );
};

export default AccessForm;
