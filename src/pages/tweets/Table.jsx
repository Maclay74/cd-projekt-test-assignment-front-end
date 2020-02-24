import React from "react";
import TweetsTableContainer from "../../containers/TweetsTable";
import UploadTweetsContainer from "../../containers/UploadTweets";
import TweetsTableComponent from "../../components/tweets-table/tweets-table";
import TweetsSorterComponent from "../../components/tweets-sorter/tweets-sorter";
import TweetsUploadComponent from "../../components/tweets-upload/tweets-upload";

const Table = ({showAdminPanel}) => {
    return (
        <TweetsTableContainer>
            {props => <React.Fragment>

                {showAdminPanel &&
                    <UploadTweetsContainer {...props}>
                        {props => <TweetsUploadComponent {...props} />}
                    </UploadTweetsContainer>
                }

                <TweetsSorterComponent {...props} />
                <TweetsTableComponent {...props} />
            </React.Fragment>}
        </TweetsTableContainer>
    )
}

export default Table;
