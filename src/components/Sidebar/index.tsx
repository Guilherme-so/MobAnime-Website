import style from "./sidebar.module.css"
import { TopAnimes } from "./TopAnimes"

export const Sidebar = () => {
    return (
        <aside className={style.sidebar}>
            <TopAnimes title='Top Animes' />
        </aside>
    )
}