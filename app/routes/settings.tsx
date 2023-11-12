import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@tremor/react';

function Settings() {
  const {
    isAuthenticated,
    logout,
  } = useAuth0();

  return isAuthenticated && (
    <Button onClick={() => {
      logout({ 
        logoutParams: {
          returnTo: window.location.origin
        }
      });
    }}>Log out</Button>
  );
}

export default Settings;