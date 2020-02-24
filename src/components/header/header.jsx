import React, { useEffect, useState } from "react";
import styles from './style.module.scss'
import { Layout, Menu, Modal } from 'antd'
import TwitterLogoUrl from './twitter-logo.svg'
import { withRouter, Link } from 'react-router-dom'

const Header = ({signOut, isAuthorized, history, ...props}) => {

    const [current, setCurrent] = useState(null)

    useEffect(() => {

        let pageName;

        try {
            [, pageName] = history.location.pathname.match( /([^/]+)$/ );
        } catch (e) {
            pageName = 'tweets'
        } finally {
            setCurrent(pageName);
        }

    }, [setCurrent, history])

    const onMenuItemClick = ({key}) => {

        switch (key) {
            case 'log-in':
                history.push('/auth/log-in')
                break;
            case 'log-out':

                Modal.confirm({
                    title: 'Log out',
                    content: 'Are you sure you want to log out? You will be unable to upload new tweets.',
                    okText: 'Log out',
                    centered: true,
                    onOk: signOut
                })

                break;
            case 'tweets':
                history.push('/tweets')
                break;

            default:
                console.warn(`Unknown page: ${key}`)
                break;
        }

        setCurrent(key)
    }

    return (
        <Layout.Header className={styles.container}>
            <Link to={"/"}>
                <img src={TwitterLogoUrl} alt="twitter-logo" className={styles.logo}/>
            </Link>

            <Menu
                theme="dark"
                mode="horizontal"
                className={styles.menu}
                selectedKeys={[current]}
                onClick={onMenuItemClick}
            >
                <Menu.Item key="tweets">Tweets</Menu.Item>
                {!isAuthorized && <Menu.Item key="log-in">Log In</Menu.Item>}
                {isAuthorized && <Menu.Item key="log-out">Log Out</Menu.Item>}

            </Menu>
        </Layout.Header>
    );

}

export default withRouter(Header);