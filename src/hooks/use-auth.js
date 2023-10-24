import { useSelector } from 'react-redux';

export const useAuth = () => {
  const { userEmail, userToken, userId } = useSelector(
    (state) => state.currentUser
  );
  return {
    isAuth: !!userEmail,
    userEmail,
    userToken,
    userId,
  };
};
