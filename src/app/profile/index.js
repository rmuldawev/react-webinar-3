import Head from "../../components/head";
import PageLayout from "../../components/page-layout";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store.js";
import useSelector from "../../hooks/use-selector.js";
import { useEffect, useState } from "react";
import ProfileCard from "../../components/profile-card/index.js";
import UserHeader from "../../components/sing-in/index.js";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const store = useStore();
  const { t } = useTranslate();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const select = useSelector((state) => ({
    isAuth: state.userInfo.isAuth,
    userInfo: state.userInfo.user,
    user: state.user.user,
  }));

  useEffect(() => {
    const fetchData = async () => {
      try {
        await store.actions.user.autoLogin();
        await store.actions.userInfo.fetchUserInfo();
      } catch (error) {
        console.error("Ошибка при загрузке данных пользователя:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [store]);

  if (isLoading) {
    return null;
  }

  const handleLogout = async () => {
    try {
      await store.actions.user.logout();
    } catch (error) {
      console.error("Ошибка при удалении токена:", error);
    }
  };

  if (!select.isAuth) {
    navigate("/login");
    return null;
  }

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
      {select.userInfo && (
        <ProfileCard
          name={select.userInfo.profile.name}
          phone={select.userInfo.profile.phone}
          email={select.userInfo.email}
        />
      )}
    </PageLayout>
  );
};

export default Profile;
