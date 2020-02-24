import React from "react";
import { Card, Select, Typography } from 'antd'
import styles from './style.module.scss'

const TweetsSorter = ({isLoading, sortOptions = [], onSortChange}) => (
    <Card className={styles.container}>

        <Typography.Title level={4}>Order</Typography.Title>

        <Select
            loading={isLoading}
            disabled={isLoading}
            style={{width: 150}}
            placeholder={'Order by...'}
            allowClear
            onChange={onSortChange}
        >

            {sortOptions.map(option =>
                <Select.Option key={option.value} value={option.value}>{option.title}</Select.Option>)
            }

        </Select>
    </Card>
);

export default TweetsSorter;
