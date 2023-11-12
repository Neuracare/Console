import { Activity, Settings, User } from "lucide-react";
import Logo from "./logo";
import { Link } from "@remix-run/react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@tremor/react";

const AuthWrapper = ({ children }: { children: React.ReactElement }) => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  if (!isAuthenticated) {
    return (
      <Button type="button" onClick={(e) => loginWithRedirect()} className="m-10">
        Log In
      </Button>
    );
  } else {
    return (
      <div className="flex h-full w-full">
        <div className="w-72 h-full pl-4 pr-4 py-10 flex flex-col justify-between border-r">
          <div>
            <h1 className="text-xl font-bold pl-4 inline-flex items-center gap-x-2">
              <Logo />
              Neuracare
            </h1>

            <nav className="mt-10 space-y-4">
              <Link
                to="/"
                className="inline-flex items-center gap-x-2 w-full hover:bg-gray-100 py-2 px-4 rounded-md font-medium"
              >
                <Activity className="w-5 h-5" />
                Overview
              </Link>
              <p className="text-sm text-gray-600 pt-4 pl-4">My Patients:</p>
              {navigation.map((item) => (
                <Link
                  to={item.url}
                  key={item.label}
                  className="inline-flex items-center gap-x-2 hover:bg-gray-100 py-2 rounded-md w-full text-sm px-4 font-medium"
                >
                  <User className="h-5 w-5 text-blue-500" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <Link
            to="/settings"
            className="flex items-center gap-x-2 hover:bg-gray-100 py-2 rounded-md w-full text-sm px-4"
          >
            <Settings className="h-5 w-5" />
            Settings
          </Link>
        </div>

        <div className="h-full w-full p-10 overflow-scroll">{children}</div>
      </div>
    );
  }
};

export default AuthWrapper;

const navigation = [
  {
    url: "/patients/shlokdesai33@gmail.com",
    label: "Shlok Desai",
  },
  {
    url: "/patients/rmadith@gmail.com",
    label: "Yajurva Shrotriya",
  },
];
