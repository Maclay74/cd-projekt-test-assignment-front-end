import React from "react";
import { request } from "../services/api";
import PropTypes from "prop-types";

class TweetsTable extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            page: 1,
            pageSize: 10,
            count: null,
            sort: null,
            tweets: [],
            isLoading: false,
        }

        this.sortOptions = [
            {title: 'Publish date', value: 'publish_date'},
            {title: 'Title', value: 'title'},
        ]

        this.onPageChange = this.onPageChange.bind(this);
        this.onPageSizeChange = this.onPageSizeChange.bind(this);
        this.onSortChange = this.onSortChange.bind(this);
        this.afterUpdate = this.afterUpdate.bind(this);
    }

    componentDidMount() {
        this.fetchTweets();
    }

    afterUpdate(response) {
        this.setState({
            page: 1,
        }, this.fetchTweets)
    }

    onPageChange(page) {
        this.setState({
            page,
        }, this.fetchTweets)
    }

    onPageSizeChange(pageSize) {
        this.setState({
            pageSize,
            page: 1,
        }, this.fetchTweets)
    }

    mapTweetsFromApi(tweets) {
        return tweets.map(tweet => ({
            ...tweet,
            key: tweet.id,
        }));
    }

    onSortChange(sort) {
        this.setState({
            page: 1,
            sort,
        }, this.fetchTweets)
    }

    async fetchTweets() {
        const {page, pageSize, sort} = this.state;

        this.setState({
            isLoading: true,
        }, async () => {

            const response = await request('tweets/index', {
                page, pageSize, sort
            }, 'get')

            const {tweets, count} = response.data;

            this.setState({
                tweets: this.mapTweetsFromApi(tweets),
                count: parseInt(count),
                isLoading: false,
            })
        })
    }

    render() {
        return this.props.children({
            ...this.state,
            onPageChange: this.onPageChange,
            onPageSizeChange: this.onPageSizeChange,
            onSortChange: this.onSortChange,
            sortOptions: this.sortOptions,
            afterUpdate: this.afterUpdate,
        })
    }
}

TweetsTable.propTypes = {
    children: PropTypes.func
}

export default TweetsTable;
