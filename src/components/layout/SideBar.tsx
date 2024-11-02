import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem
} from 'cdbreact'

import { useNavigate, useLocation } from 'react-router-dom'
export default function SideBar() {
    const navigate = useNavigate()
    const url = useLocation()
    const page = url.pathname.split(('/admin-panel'))[1]

    return (
        <div
            style={{ display: 'inline-block', height: '100vh', overflow: 'scroll initial' }}
        >
            <CDBSidebar textColor="#fff" backgroundColor="#242A31">
                <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
                    Admin Panel
                </CDBSidebarHeader>
                <CDBSidebarContent className="sidebar-content">
                    <CDBSidebarMenu>
                        <CDBSidebarMenuItem
                            active={page === '' || page === '/admin-dashboard'}
                            onClick={() => navigate('./admin-dashboard')}
                            icon="table">Dashboard</CDBSidebarMenuItem>
                        <CDBSidebarMenuItem
                            active={page === '/add-bin'}
                            onClick={() => navigate('./add-bin')}
                            icon="plus">
                            Add Ben
                        </CDBSidebarMenuItem>
                        {/* <CDBSidebarMenuItem
                            active={page === '/profile'}
                            onClick={() => navigate('./profile')}
                            icon="user">Profile</CDBSidebarMenuItem> */}
                    </CDBSidebarMenu>
                </CDBSidebarContent>
            </CDBSidebar>
        </div>
    )
}

