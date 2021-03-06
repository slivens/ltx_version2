/*
 * @Author: your name
 * @Date: 2019-08-28 10:36:08
 * @LastEditTime: 2020-04-30 17:25:07
 * @LastEditors: Sliven
 * @Description: In User Settings Edit
 * @FilePath: \ltx\app\index.js
 */
import React from 'react';
import './less/index.less';
import {withRouter} from 'react-router-dom';
import NotFound from './components/NotFound';
import {
    Home, Login, Server,
    Message, My, Detail,
    Mybranch, Telbooks,
    Zbinfo, Volunteer, Lndx,
    Zbactive, Zbdetail, Myactive,
    EduTrain, Ztjs, Apply,
    SchoolDate, Volunteerbaodao, Lnb,
    Yszd, Ycjp, Dzfwt,
    Shgc, ComonList,
    Resetpwd, Suggest,
    About, Help,
    Tbkt, MesgsDetail,
    Hdzx, Search,
    Allmember, HomeServer,
    PushActivity,JinTaiYang,
    Yuyue,EditAdress,
    Myorder,OrderDetail,
    MemberSelect,VerifyCode,
    Secret,Ggw,
    GgwView,Useragreement,
    Ldyzj, Lgbdx,   //belong to :美玉
    PartyDetail, PartyMember,
    Consolation,
    Zyww, ZywwDetail, ZywwRegister,
    Zdjjrww, ZdjjrwwDetail, ZdjjrwwRegister,
    Zhww, ZhwwDetail, ZhwwRegister,
    Tsknhww, TsknhwwDetail, TsknhwwRegister,
    TeacherPool, TeacherPoolDetail,
    MessageNotice
} from './pages';
const App = ({history, location}) => {
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
        'iwapply': <Apply path="Reg" title="报名"/>,
        'iwleave': <Apply path="leave" title="请假"/>,
        'iwsearch': <Apply path="sech" title="查询"/>,
        'schooldate': <SchoolDate/>,
        // 'zyzbd':<Volunteerbaodao/>,
        'zyzbd': <ComonList title="志愿者报道" branchtype="zyzbd"/>,
        'lnb': <Lnb/>,
        'yszd': <ComonList title="养生之道" branchtype="yszd"/>,
        'ycjp': <ComonList title="原创精品" branchtype="ycjp"/>,
        'dzfwt': <ComonList title="读者服务平台" branchtype="dzfwt"/>,
        'shgc': <ComonList title="史海钩沉" branchtype="shgc"/>,
        'ldyzj': <Ldyzj/>,
        'lgbdx': <Lgbdx/>,
        'hsjd': <ComonList title="红色基地" branchtype="hsjd"/>,
        'hdzx': <Hdzx/>,
        'hdkx': <ComonList title="活动快讯" branchtype="hdkx"/>,
        'hdgg': <ComonList title="活动公告" branchtype="hdgg"/>,
        'hdzs': <ComonList title="活动展示" branchtype="hdzs"/>,
        'lgbfc': <ComonList title="老干部风采" branchtype="lgbfc"/>,
        'resetpwd': <Resetpwd/>,
        'suggest': <Suggest/>,
        'about': <About/>,
        'help': <Help/>,
        'tbkt': <Tbkt/>,
        'search': <Search/>,
        'allmember': <Allmember/>,
        'mesgsDetail': <MesgsDetail/>,
        'homeServer': <HomeServer/>,
        'pushActivity': <PushActivity/>,
        'partyDetail': <PartyDetail/>,
        'partyMember': <PartyMember/>,
        'consolation': <Consolation/>,
        'zyww': <Zyww/>,
        'zywwDetail': <ZywwDetail/>,
        'zywwRegister': <ZywwRegister/>,
        'zdjjrww': <Zdjjrww/>,
        'zdjjrwwDetail': <ZdjjrwwDetail/>,
        'zdjjrwwRegister': <ZdjjrwwRegister/>,
        'zhww': <Zhww/>,
        'zhwwDetail': <ZhwwDetail/>,
        'zhwwRegister': <ZhwwRegister/>,
        'tsknhww': <Tsknhww/>,
        'tsknhwwDetail': <TsknhwwDetail/>,
        'tsknhwwRegister': <TsknhwwRegister/>,
        'homeServerCompany':<JinTaiYang/>,
        'yuyue':<Yuyue/>,
        'editAdress':<EditAdress/>,
        'myorder':<Myorder/>,
        'orderDetail':<OrderDetail/>,
        'member':<MemberSelect/>,
        'verify':<VerifyCode/>,
        'secret':<Secret/>,
        'ggw':<Ggw/>,
        'ggwView':<GgwView/>,
        'teacherPool': <TeacherPool/>,
        'messageNotice': <MessageNotice/>,
        'teacherPoolDetail': <TeacherPoolDetail/>,
        'useragreement':<Useragreement/>
    };
    const {pathname} = location;
    const path = pathname.split('/')[1];
    return router[path] || <NotFound />
};
export default withRouter(App);
