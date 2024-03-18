import Greeting from "./components/Greeting";
import { token } from "./store/services/spotify";

function AuthMiddleware({ children }) {
  const { access_token, expires_at } = JSON.parse(
    localStorage.getItem("token") || "{}"
  );
  const now = Math.round(new Date().getTime() / 1000);

  const { data, isLoading } = token.endpoints.getToken.useQuery(null, {
    skip: access_token && now < expires_at?.expires_at,
  });

  if (data) {
    localStorage.setItem("token", JSON.stringify(data));
  }

  return (
    <>
      <Greeting loading={isLoading} />
      {!isLoading && children}
    </>
  );
}

export default AuthMiddleware;
