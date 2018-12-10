import React from 'react'
import { Rating } from 'semantic-ui-react'

class Rate extends React.Component {
    render() {
        return (
            <Rating maxRating={5} clearable />
        )
    }
}

export default Rate;
