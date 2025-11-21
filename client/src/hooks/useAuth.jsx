import  useLocalStorage from "./useLocalStorage";

const useAuth = () => {
  const [loggedInUser, setLoggedInUser] = useLocalStorage("loggedInUser", null);

  return {
    loggedInUser,
    setLoggedInUser,
  };
};

export default useAuth;
