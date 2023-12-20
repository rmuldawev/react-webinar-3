import { Link } from "react-router-dom"
import { cn as bem } from "@bem-react/classname";
import '../link-to-login/styles.css'

const LinkToLoginPage = () => {
    const cn = bem("LinkTo");
    return (
        <div className={cn('')}>
            <Link className={cn('link')} to={'/login'}>Войдите</Link>
            <p className={cn('text')}>, чтобы иметь возможность комментировать</p>
        </div>
    )
}

export default LinkToLoginPage