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
import { useNavigate } from "react-router-dom";

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

  return (
    <PageLayout>
      <SingIn title={t("Вход")} isAuth={auth} />
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
