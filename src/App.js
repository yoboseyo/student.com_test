import './static/iconfont/iconfont.css';
import './App.less';
import React, { Component, PureComponent } from 'react';
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import List from 'pages/List';
import Edit from 'pages/Edit';
import NoMatch from 'pages/NoMatch';
import { Layout, Menu, Affix, BackTop, Button } from 'antd';
const { Header, Sider, Content } = Layout;



class App extends Component {
  render () {
    return (
      <div className="App">
        <Layout style={{ minHeight: '100vh' }}>
          <Header className="header">
            <a className="log_out" href="javascript:;">Log out</a>
          </Header>
          <Layout className="content-wrap">
            <Nav location={this.props.location} />
            <Content className="content" id="scroll-wrap" style={{ overflow: 'auto', height: '100vh - 64px'}}>
              <Pages />
            </Content>
          </Layout>
          <BackTop visibilityHeight={200} target={() => document.getElementById('scroll-wrap')}>
            <Button className="back-to-top" type="primary">
              <i className="anticon anticon-up"></i>
            </Button>
          </BackTop>
        </Layout>
      </div>
    );
  }
}
class Nav extends PureComponent {
  constructor(){
    super();
    this.state = {
      collapsed: false
    };
    this.toggleCollapsed = this.toggleCollapsed.bind(this);
  }
  toggleCollapsed(){
    this.setState({
      collapsed: !this.state.collapsed
    });
  }
  render () {
    const selectedKyes = this.props.location.pathname.toLowerCase();
    const collapsed = this.state.collapsed;
    return (
      <Sider
        className="slider_nav"
        width={102}
        collapsible
        collapsed={this.state.collapsed}
        collapsedWidth={50}
        onCollapse={this.toggleCollapsed}
        breakpoint={'lg'}
      >
        <Affix offsetTop={64}>
          <Menu
            mode="inline"
            selectedKeys={[selectedKyes]}
            style={{lineHeight: '32px'}}
            inlineCollapsed={this.state.collapsed}
          >
            <Menu.Item key="/list">
              <Link className="link" to="/list">
                <i className="iconfont iconc-list"></i>
                {
                  !collapsed ?
                  'List'
                  :
                  <span className="collapsed-label"> List</span>
                }
              </Link>
            </Menu.Item>
            <Menu.Item key="/edit">
              <Link className="link" to="/edit">
                <i className="iconfont iconc-edit"></i>
                {
                  !collapsed ?
                  'Edit'
                  :
                  <span className="collapsed-label"> Edit</span>
                }
              </Link>
            </Menu.Item>
          </Menu>
        </Affix>
      </Sider>
    )
  }
}
class Pages extends Component {
  render () {
    return (
      <div className="container">
        <Switch>
          <Route exact path='/list' component={List} />
          <Redirect exact from="/" to="/list"></Redirect>
          <Route exact path='/edit' component={Edit} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    )
  }
}
export default App;
