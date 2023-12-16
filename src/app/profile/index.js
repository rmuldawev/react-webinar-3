import Head from "../../components/head";
import PageLayout from "../../components/page-layout";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store.js";
import useSelector from "../../hooks/use-selector.js";
import { useEffect } from "react";
import ProfileCard from "../../components/profile-card/index.js";
import { useNavigate } from "react-router-dom";
import UserHeader from "../../components/sing-in/index.js";

const Profile = () => {
  const store = useStore();
  const { t } = useTranslate();
  const navigate = useNavigate();
  const auth = localStorage.getItem("accessToken");

  const select = useSelector((state) => ({
    isAuth: state.user.isAuth,
    user: state.user.user,
  }));

  console.log("select.user", select.user);
  console.log("authtoken", auth);

  useEffect(() => {
    if (!auth) {
      navigate("/singin");
    }
  }, []);

  const handleLogout = async () => {
    try {
      await store.actions.user.logout(auth);
      console.log("Токен удален");
    } catch (error) {
      console.error("Ошибка при удалении токена:", error);
    }
  };

  return (
    <PageLayout>
      <UserHeader
        title={t("Вход")}
        isAuth={select.isAuth}
        onClick={handleLogout}
        user={select.user}
      />
      <Head title={t("title")}>
        <LocaleSelect />
      </Head>
      <Navigation />
      {select.user && (
        <ProfileCard
          name={select.user.profile.name}
          phone={select.user.profile.phone}
          email={select.user.email}
        />
      )}
    </PageLayout>
  );
};

export default Profile;
