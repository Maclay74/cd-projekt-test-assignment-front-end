import React from "react";
import PropTypes from 'prop-types'
import { request } from "../services/api";

class UploadTweets extends React.Component {

    constructor(props) {
        super(props);

        this.uploadTweets = this.uploadTweets.bind(this)
        this.truncateTable = this.truncateTable.bind(this)
    }

    async uploadTweets(tweets) {
        const { afterUpdate } = this.props

        try {
            await request('tweets/upload', {tweets}, 'post')
            await afterUpdate()
        } catch(e) {
            console.warn('Error with uploading tweets')
        }
    }

    async truncateTable() {
        const { afterUpdate } = this.props
        await request('tweets/truncate')
        await afterUpdate()
    }

    render() {
        return this.props.children({
            ...this.state,
            uploadTweets: this.uploadTweets,
            truncateTable: this.truncateTable,
        })
    }

}

UploadTweets.defaultProps = {
    children:  () => {},
    afterUpdate: () => {},
}

UploadTweets.propTypes = {
    children: PropTypes.func,
    afterUpdate: PropTypes.func,
}

export default UploadTweets;