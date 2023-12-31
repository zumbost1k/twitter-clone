import { useSelector } from 'react-redux';

export const useAuth = () => {
  const { userEmail, userId } = useSelector((state) => state.currentUser);
  return {
    isAuth: !!userId,
    userEmail,
    userId,
  };
};
