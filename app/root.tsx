import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import stylesheet from "~/tailwind.css";
import { Auth0Provider } from "@auth0/auth0-react";
import AuthWrapper from "./auth-wrapper";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  {
    rel: "stylesheet",
    href: "https://api.mapbox.com/mapbox-gl-js/v2.14.1/mapbox-gl.css",
  },
];

export default function App() {

  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <Auth0Provider
          domain="dev-ltqo8n37bj21i0c3.us.auth0.com"
          clientId="gIFqJc18EmhCL4O5YqnYjUDagqAtRpuG"
          authorizationParams={{
            redirect_uri: "http://localhost:3000",
          }}
        >
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
          <AuthWrapper>
            <Outlet />
          </AuthWrapper>
        </Auth0Provider>
      </body>
    </html>
  );
}
