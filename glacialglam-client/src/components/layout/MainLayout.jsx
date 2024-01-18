// MainLayout.jsx
import { Layout, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { NavLink, Outlet } from "react-router-dom";
import { adminSideBarItems } from "../../routes/admin.routes";

const { Content, Footer, Header } = Layout;

const MainLayout = () => {
  return (
    <div>
        <Layout style={{ height: "100vh" }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0">
        <div
          className=""
          style={{
            color: "white",
            height: "4rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1 style={{ height: "100%" }}>University</h1>
        </div>
        <Menu theme="dark" mode="inline" 
        defaultSelectedKeys={['4']} 
        items={adminSideBarItems} />
      </Sider>
      <Layout>
        <Header style={{ padding: 0 }} />
        <Content style={{ margin: '24px 16px 0' }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
    </div>
  );
};

export default MainLayout;
