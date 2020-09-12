
import * as React from 'react';

export const navigationRef = React.createRef();

export const routeNameRef = React.createRef();

export function navigate(name, params) {
    navigationRef.current?.navigate(name, params);
}

export function reset(name, params) {
    navigationRef.current?.reset({ index: 0, routes: [{ name: name, params }] });
}
