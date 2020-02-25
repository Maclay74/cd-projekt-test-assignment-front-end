import React from "react";
import {Upload, Icon, Modal, Card, Typography, Button, message } from "antd";
import { parseCsv, mapRowsToFields } from "../../services/parse-cvs";
import styles from './style.module.scss'

const TweetsUpload = ({uploadTweets, truncateTable }) => {

    const onUpload = async (records) => {

        try {
            await uploadTweets(records)
            message.success(`Wow! ${records.length} tweets were successfully uploaded!`)
        } catch (e) {
            message.error('Something went wrong with uploading tweets')
            console.log(e.response)
        }
    }

    const config = {
        name: 'file',
        accept: '.csv',
        multiply: false,
        customRequest: async data => {
            const records = mapRowsToFields(data.file.data)

            await new Promise(resolve => {
                Modal.confirm({
                    title: 'Upload tweets',
                    content: `${records.length} records were successfully parsed, upload them at the speed of light?`,
                    onOk: async () => {
                        await onUpload(records)
                        data.onSuccess(true)
                        resolve();
                    },
                    okText: 'Upload',
                    type: 'info',
                    onCancel: async () => {
                        resolve();
                        data.onError('You canceled that!')
                    }
                })
            })

        },

        transformFile: parseCsv,
    }

    const onTruncateButtonPress = () => {

        Modal.confirm({
            title: 'Truncate table',
            content: 'Are you sure? Somebody (maybe even you) spent a lot of time to fill it up, there could be something important...',
            okText: 'Truncate',
            okType: 'danger',
            onOk: truncateTable,
        })
    }

    return (
        <Card className={styles.container}>

            <div className={styles.header}>
                <Typography.Title level={4} className={styles.title}>Admin Panel</Typography.Title>
                <Button.Group>
                    <Button href={'/sample.csv'} target={'_blank'} type={'info'} icon="download">Get sample</Button>
                    <Button type={'danger'} icon="frown" onClick={onTruncateButtonPress}>Truncate table</Button>
                </Button.Group>

            </div>

            <Upload.Dragger {...config}>
                <p className="ant-upload-drag-icon">
                    <Icon type="inbox"/>
                </p>
                <p className="ant-upload-text">Click or drag .csv file to this area to upload</p>
                <p className="ant-upload-hint">
                    Since you are an authorized user, you can upload table and we will gently parse it
                </p>
            </Upload.Dragger>

        </Card>
    )
}
export default TweetsUpload;

