import Head from "../../components/head";
import PageLayout from "../../components/page-layout";
import SingIn from "../../components/sing-in";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store.js";
import useSelector from "../../hooks/use-selector.js";
import { useEffect } from "react";
import ProfileCard from "../../components/profile-card/index.js";

const Profile = () => {
  const store = useStore();
  const { t } = useTranslate();
  const auth = localStorage.getItem("accessToken");

  const select = useSelector((state) => ({
    isAuth: state.user.isAuth,
    token: state.user.token,
    user: state.user.user,
  }));

  console.log("select.user", select.user);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        await store.actions.user.getUserInfo(auth);
      } catch (error) {
        console.error("Профиль не загружен", error);
      }
    };

    fetchUserInfo();
  }, [store.actions.user, select.token]);

  return (
    <PageLayout>
      <SingIn title={t("Вход")} isAuth={auth}/>
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
