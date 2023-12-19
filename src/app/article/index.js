import { memo, useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import Spinner from "../../components/spinner";
import ArticleCard from "../../components/article-card";
import LocaleSelect from "../../containers/locale-select";
import TopHead from "../../containers/top-head";
import { useDispatch, useSelector } from "react-redux";
import shallowequal from "shallowequal";
import articleActions from "../../store-redux/article/actions";
import Comment from "../../components/comment";
import newComment from "../../store-redux/comment/actions";
import {useSelector as useSelectorRedux} from 'react-redux';
import treeToList from "../../utils/tree-to-list";


function Article() {
  const store = useStore();
  // const comments = useSelector(getComments);
  // console.log('comments', comments)

  const dispatch = useDispatch();
  // Параметры из пути /articles/:id

  const params = useParams();

  useInit(() => {
    //store.actions.article.load(params.id);
    dispatch(articleActions.load(params.id));
   const res =  dispatch(newComment.getComments(params.id));
   console.log('res',res)
  }, [params.id]);
  console.log(newComment)

  const select = useSelector(
    (state) => ({
      article: state.article.data,
      waiting: state.article.waiting,
      comments: [...treeToList(state.newComment.comments)],

      // ...treeToList(listToTree(state.newComment.comments)
    }),
    shallowequal
  ); // Нужно указать функцию для сравнения свойства объекта, так как хуком вернули объект
  console.log('комменты',select.comments)

  const { t } = useTranslate();

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(
      (_id) => store.actions.basket.addToBasket(_id),
      [store]
    ),
  };

  const handleCommentSubmit = useCallback(
    (commentData) => {
      dispatch(
        newComment.createComment({
          text: commentData.text,
          _id: params.id,
          type: "article",
        })
      );
    },
    [dispatch, params.id]
  );

  return (
    <PageLayout>
      <TopHead />
      <Head title={select.article.title}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={select.waiting}>
        <ArticleCard
          article={select.article}
          onAdd={callbacks.addToBasket}
          t={t}
        />
      </Spinner>
      {select.comments && select.comments.map((e,i) => {
        return (
          <p key={i}>{e.text}</p>
        )
      })}

      <Comment onCommentSubmit={handleCommentSubmit} />
      
    </PageLayout>
  );
}

export default memo(Article);
