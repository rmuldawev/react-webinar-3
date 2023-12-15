import { Link } from "react-router-dom";
import "../sing-in/styles.css";
import useSelector from "../../hooks/use-selector";

const SingIn = ({ title, isAuth, onClick }) => {
  const select = useSelector((state) => ({
    isAuth: state.user.isAuth,
    token: state.user.token,
    user: state.user.user,
  }));

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      {isAuth ? (
        <>
          {select.user && (
            <Link to={"/profile"}>
              <p style={{ marginRight: "20px", color: "#0087E9" }}>
                {select.user.profile.name}
              </p>
            </Link>
          )}
          <Link to={"/"}>
            <button onClick={onClick} className="buttonStyle">
              Выход
            </button>
          </Link>
        </>
      ) : (
        <>
          <Link to={"/singin"}>
            <button className="buttonStyle">{title}</button>
          </Link>
        </>
      )}
    </div>
  );
};

export default SingIn;
