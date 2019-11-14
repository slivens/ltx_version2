import React from 'react';
import './less/index.less';
import { withRouter } from 'react-router-dom';
import NotFound from './components/NotFound';
import {
    Home, Login, Server,
    Message, My, Detail,
    Mybranch, Telbooks,
    Zbinfo, Volunteer, Lndx,
    Zbactive, Zbdetail, Myactive,
    EduTrain, Ztjs,Apply,
    SchoolDate,Volunteerbaodao,Lnb,
    Yszd,Ycjp,Dzfwt,
    Shgc,ComonList,
    Resetpwd,Suggest,
    About,Help,
    Tbkt
} from './pages';
const App = ({ history, location }) => {
    const router = {
        '': <Login />,
        'home': <Home />,
        'login': <Login />,
        'server': <Server />,
        'message': <Message />,
        'my': <My />,
        'detail': <Detail />,
        'tel': <Telbooks />,
        'mybranch': <Mybranch />,
        'zbinfo': <Zbinfo />,
        'zbactive': <Zbactive />,
        'volunteer': <Volunteer />,
        'lndx': <Lndx />,
        'zbdetail': <Zbdetail />,
        'myactive': <Myactive />,
        'eduTrain': <EduTrain />,
        'ztjs': <Ztjs/>,
        'iwapply':<Apply path="Reg" title="报名"/>,
        'iwleave':<Apply path="leave" title="请假"/>,
        'iwsearch':<Apply path="sech" title="查询"/>,
        'schooldate':<SchoolDate/>,
        // 'zyzbd':<Volunteerbaodao/>,
        'zyzbd':<ComonList title="志愿者报道" branchtype="zyzbd"/>,
        'lnb':<Lnb/>,
        'yszd':<ComonList title="养生之道" branchtype="yszd"/>,
        'ycjp':<ComonList title="原创精品" branchtype="ycjp"/>,
        'dzfwt':<ComonList title="读者服务平台" branchtype="dzfwt"/>,
        'shgc':<ComonList title="史海钩沉" branchtype="shgc"/>,
        'ldyzj':<ComonList title="老党员之家" branchtype="ldyzj"/>,
        'lgbdx':<ComonList title="老干部党校" branchtype="lgbdx"/>,
        'hsjd':<ComonList title="红色基地" branchtype="hsjd"/>,
        'resetpwd':<Resetpwd/>,
        'suggest':<Suggest/>,
        'about':<About/>,
        'help':<Help/>,
        'tbkt':<Tbkt/>
    }
    const { pathname } = location;
    const path = pathname.split('/')[1];
    return router[path] || <NotFound />
}
export default withRouter(App);
