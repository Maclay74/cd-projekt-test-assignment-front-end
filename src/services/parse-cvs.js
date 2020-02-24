import Papaparse from 'papaparse'
import * as moment from "moment";

const parseCsv = async file => {
     return new Promise(resolve => {
        Papaparse.parse(file, {
            worker: true,
            complete: resolve,
        })
    })
}

const mapRowsToFields = rows => {
    return rows.map(([title,description, author_name, publish_date]) => ({
        title,
        description,
        author_name,
        publish_date: moment(publish_date, 'DD.MM.Y H:mm').format('YYYY-MM-DD HH:mm:00')
    }))
}

export {
    parseCsv, mapRowsToFields
}