import  {useRecoilState} from "recoil"
import { TopAnimes } from "./TopAnimes"
import { toogleSidebar } from "../../recoil-global/atom"
import style from "./sidebar.module.css"

export const Sidebar = () => {
    const [sidebar, setSidebar] = useRecoilState(toogleSidebar)

    return (
        <aside className={`${style.sidebar} ${sidebar == true ? style.active : "" }`}>
            <TopAnimes title='Top Animes' />
        </aside>
    )
}