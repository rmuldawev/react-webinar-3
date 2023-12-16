import { memo } from "react";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import CatalogFilter from "../../containers/catalog-filter";
import CatalogList from "../../containers/catalog-list";
import LocaleSelect from "../../containers/locale-select";
import UserHeader from "../../components/sing-in/index.js";

import useSelector from "../../hooks/use-selector";

/**
 * Главная страница - первичная загрузка каталога
 */
function Main() {
  const auth = localStorage.getItem("accessToken");
  const store = useStore();
  const select = useSelector((state) => ({
    isAuth: state.user.isAuth,
    user: state.user.user,
  }));

  useInit(
    () => {
      store.actions.catalog.initParams();
    },
    [],
    true
  );

  const { t } = useTranslate();

  const handleLogout = async () => {
    try {
      await store.actions.user.logout(auth);
    } catch (error) {
      console.error("Ошибка при удалении токена:", error);
    }
  };

  return (
    <PageLayout>
      <UserHeader
        title="Вход"
        isAuth={auth}
        onClick={handleLogout}
        user={select.user}
      />
      <Head title={t("title")}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <CatalogFilter />
      <CatalogList />
    </PageLayout>
  );
}

export default memo(Main);
