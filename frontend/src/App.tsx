import { useCurrentUser } from './services/useCurrentUser';
import Authenticated from './views/Authenticated';

function App() {
  const { currentUser } = useCurrentUser();
  if (!currentUser) return null;

  return <Authenticated />;
}

export default App;
