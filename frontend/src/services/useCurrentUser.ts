import {
  currentUserState,
  currentUserQuery,
} from '@frontend/state/currentUserState';
import { useRecoilValue, useSetRecoilState } from 'recoil';

export function useCurrentUser() {
  const currentUser = useRecoilValue(currentUserQuery);
  const setCurrentUser = useSetRecoilState(currentUserState);

  return { currentUser, setCurrentUser };
}
