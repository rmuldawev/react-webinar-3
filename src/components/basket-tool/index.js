import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { numberFormat, plural } from "../../utils";
import "./style.css";
import NavBar from "../navBar";

function BasketTool({ sum, amount, onOpen, lang }) {
  const cn = bem("BasketTool");
  return (
    <div className={cn()}>
      <NavBar lang={lang} />
      <div>
        <span className={cn("label")}>
          {lang ? "In Basket:" : "В корзине:"}
        </span>
        <span className={cn("total")}>
          {amount
            ? `${amount} ${plural(amount, {
                one: lang ? "product" : "товар",
                few: lang ? "products" : "товара",
                many: lang ? "products" : "товаров",
              })} / ${numberFormat(sum)} ₽`
            : lang
            ? "empty"
            : `пусто`}
        </span>
        <button  className="buttonStyle" onClick={onOpen}>{lang ? "Cross" : "Перейти"}</button>
      </div>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
  lang: PropTypes.bool,
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0,
};

export default memo(BasketTool);
