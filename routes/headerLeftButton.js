import React from 'react';
import { Switch, View, Text } from 'react-native';
import { setTheme } from '../redux/actions/userActions';
import { connect } from 'react-redux';

const headerThemeDarkButton = (props) => {
    return (
        <View style={{ alignItems: 'center', margin: 10 }}>
            <Text style={{ color: '#fff' }}>Theme</Text>
            <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                onValueChange={(value) => props.setTheme(value)}
                value={props.user.isThemeDark}
            />
        </View>
    )
};

function mapDispatchToProps(dispatch) {
    return {
        setTheme: (isDark) => (dispatch(setTheme(isDark))),
    };
};

const mapStateToProps = state => ({
    user: state.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(headerThemeDarkButton);