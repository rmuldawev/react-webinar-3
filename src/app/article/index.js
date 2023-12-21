import { memo, useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
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
import { useDispatch } from "react-redux";
import { useSelector as useSelectorRedux } from "react-redux";
import shallowequal from "shallowequal";
import articleActions from "../../store-redux/article/actions";
import newComment from "../../store-redux/comment/actions";
import CommentForm from "../../components/comment";
import renderComments from "../../components/render-comments";
import { transformComments } from "../../utils/transform-comments";
import LinkToLoginPage from "../../components/link-to-login";
import useSelector from "../../hooks/use-selector";

function Article() {
  const store = useStore();
  const [parentCommentId, setParentCommentId] = useState(null);
  const isUserLoggedIn = useSelector((state) => !!state.session.token);
  const currentUserId = useSelector((state) => state.session.user._id) 


  const dispatch = useDispatch();

  const params = useParams();

  useInit(() => {
    store.actions.article.load(params.id);
    dispatch(articleActions.load(params.id));
    dispatch(newComment.getComments(params.id));
  }, [params.id]);

  const select = useSelectorRedux(
    (state) => ({
      article: state.article.data,
      waiting: state.article.waiting,
      comments: state.newComment.comments,
    }),
    shallowequal
  );
  console.log(select.comments)

  const transformedComments = transformComments(select.comments);

  const { t } = useTranslate();

  const callbacks = {
    addToBasket: useCallback(
      (_id) => store.actions.basket.addToBasket(_id),
      [store]
    ),
  };

  const handleReplyClick = useCallback(
    (commentId) => {
      if (isUserLoggedIn) {
        setParentCommentId(commentId);
      }
    },
    [isUserLoggedIn]
  );

  const handleCommentSubmit = useCallback(
    (text) => {
      const parentType = parentCommentId ? "comment" : "article";
      const parentId = parentCommentId || select.article._id;
      dispatch(newComment.createComment(text, parentId, parentType));
      setParentCommentId(null);
    },
    [dispatch, parentCommentId, select.article._id]
  );

  const handleCancelReply = useCallback(() => {
    setParentCommentId(null);
  }, []);

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
      <div style={{ marginLeft: 40 }}>
        {select.comments && <p>Комментарии ({select.comments.length})</p>}
        {renderComments(
          transformedComments,
          0,
          parentCommentId,
          handleReplyClick,
          handleCommentSubmit,
          handleCancelReply
        )}
      </div>
      {!parentCommentId && isUserLoggedIn ? (
        <CommentForm
          onCommentSubmit={handleCommentSubmit}
          parentCommentId={parentCommentId}
          isUserLoggedIn={isUserLoggedIn}
        />
      ) : (
        null
      )}
       {!isUserLoggedIn && <LinkToLoginPage />}

    </PageLayout>
  );
}

export default memo(Article);
