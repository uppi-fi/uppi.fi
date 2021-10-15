import { UserT } from '@shared/schema';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useLocation } from 'wouter';
import { currentUserState } from '../state/currentUserState';
import { useApiService } from './useApiService';

export function useCheckAccess() {
  const [location, setLocation] = useLocation();
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const [userVerified, setUserVerified] = useState(false);
  const { get: getUser } = useApiService<UserT>('get-user');

  useEffect(() => {
    (async () => {
      let userId = currentUser?.userId;

      if (/^\/auth\/[a-z0-9-]+$/.test(location)) {
        userId = location.split('/').pop();
        setLocation('/');
      }

      const user = await getUser({
        userId,
      });
      setCurrentUser(user);
      setUserVerified(true);
    })();
  }, []);

  return { userVerified };
}
