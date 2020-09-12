import React from "react";
import { View, Text } from 'react-native';

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { error: null, errorInfo: null };
    }

    componentDidCatch(error, errorInfo) {
        // Catch errors in any components below and re-render with error message
        this.setState({
            error: error,
            errorInfo: errorInfo
        })
    }

    render() {
        if (this.state.errorInfo) {
            // Error path
            return (
                <View style={{
                    backgroundColor: 'white', flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text style={{ fontSize: 20 }}>Something went wrong! :(</Text>
                    <Text style={{ fontSize: 20, marginTop: 20 }}>Please restart the app</Text>
                </View>
            );
        }

        // Normally, just render children
        return this.props.children;
    }
}
