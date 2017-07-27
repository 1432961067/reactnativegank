import React, { PropTypes, Component } from 'react';
import {
    requireNativeComponent,
    View,
} from 'react-native';
var myListView = {
    name: 'MyListView',
    propTypes: {
        array: PropTypes.arrayOf(PropTypes.string),
        ...View.propTypes,
    }
}
// module.exports = requireNativeComponent('MyListView', MyListView)
var RTCListView = requireNativeComponent('MyListView', myListView);
class MyListView extends Component {

    constructor(props) {
        super(props)
    }

    _onItemClickListener = (event) => {
        if (!this.props.onItemClickListener) {
            return;
        }

        if (event.nativeEvent.message === 'onItemClickListener') {
            this.props.onItemClickListener();
            return;
        }

    }

    render() {
        return (
            <RTCListView
                {...this.props}
                onChange={
                    this._onItemClickListener()
                }
            >

            </RTCListView >
        )
    }

}
MyListView.propTypes = {
    onItemClickListener: React.PropTypes.func
}
module.exports = MyListView;



