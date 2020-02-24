import React from "react";
import styles from './style.module.scss'
import { Card, Table, Typography } from "antd";

const TweetsTable = ({tweets, page, pageSize, count, onPageChange, onPageSizeChange, isLoading}) => {

    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: 'Title', dataIndex: 'title', key: 'title' },
        { title: 'Description', dataIndex: 'description', key: 'description' },
        { title: 'Publish Date', dataIndex: 'publish_date', key: 'publish_date' },
    ];

    return (<Card className={styles.container}>
        <Typography.Title level={4}>Tweets</Typography.Title>

        <Table
            dataSource={tweets}
            columns={columns}
            loading={isLoading}
            pagination={{
                total: count,
                current: page,
                showSizeChanger: true,
                pageSizeOptions: ['10', '20', '50'],
                pageSize,
                onChange: onPageChange,
                onShowSizeChange: (current, size) => onPageSizeChange(size)
            }}
        />
    </Card>);

}
export default TweetsTable;