
import React from 'react';
import { Switch, View, Text } from 'react-native';
import { setTempUnit } from '../redux/actions/userActions';
import { connect } from 'react-redux';

const mainHeaderButtons = (props) => {
    return (
        <View style={{ alignItems: 'center', margin: 10 }}>
            <Text style={{ color: '#fff' }}>Temp Unit</Text>
            <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                onValueChange={(value) => props.setTempUnit(value)}
                value={props.user.isTempUnitMetric}
            />
        </View>
    )
};

function mapDispatchToProps(dispatch) {
    return {
        setTempUnit: (isMetric) => (dispatch(setTempUnit(isMetric))),
    };
};

const mapStateToProps = state => ({
    user: state.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(mainHeaderButtons);
