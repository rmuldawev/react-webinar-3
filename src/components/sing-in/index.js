import { Link } from "react-router-dom";
import '../sing-in/styles.css';
import { useNavigate } from "react-router-dom";
import useSelector from "../../hooks/use-selector";

const SingIn = ({ title, isAuth,onClick}) => {
  const navigate = useNavigate()

  // console.log('userData',currUser)

  const select = useSelector((state) => ({
    isAuth: state.user.isAuth,
    token: state.user.token,
    user: state.user.user,
  }));
  console.log('isAuth123123',select.isAuth)

  // console.log('select.user12312312312',select.)



  // const handleLogout = async() => {
  //   // localStorage.removeItem("accessToken");
  //   await log
  //   console.log('token deleted');
  // };

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems:'center' }}>
      {isAuth ? (
        <>
          {/* Если пользователь авторизован, отобразить приветствие и кнопку "Выход" */}
          {select.user && 
          <Link to={"/profile"}>
          <p style={{marginRight:'20px', color:'#0087E9'}}>{select.user.profile.name }</p>
          </Link>

          }
          <Link to={"/"}>
            <button onClick={onClick} className="buttonStyle">
              Выход
            </button>
          </Link>
        </>
      ) : (
        <>
          {/* Если пользователь не авторизован, отобразить кнопку "Вход" */}
          <Link to={'/singin'}>
            <button  className="buttonStyle">{title}</button>
          </Link>
        </>
      )}
    </div>
  );
};

export default SingIn;
