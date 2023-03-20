import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { LoginService } from "../../api/cards";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigation = useNavigate();
  const [hasRedirect, setHasRedirect] = useState(false);

  useEffect(() => {
    LoginService().then((response) => {
      if (response?.data) {
        Cookies.set("token", response.data, { expires: 24 });
        setHasRedirect(true);
      }
    });
  }, []);

  if (hasRedirect) {
    navigation("/dashboard");
  }

  return (
    <div>
      <p>Login fail</p>
    </div>
  );
}
