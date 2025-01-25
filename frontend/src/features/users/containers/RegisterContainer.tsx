import { useAppDispatch } from '../../../app/hooks.ts';
import { useNavigate } from 'react-router-dom';
import { userRegister } from '../usersThunk.ts';
import { UserForm } from '../../../types';
import RegisterForm from '../components/RegisterForm.tsx';

const RegisterContainer = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const register = async (user: UserForm) => {
    await dispatch(userRegister({...user})).unwrap();
    navigate('/');
  };

  return (
    <>
      <RegisterForm register={register}/>
    </>
  );
};

export default RegisterContainer;