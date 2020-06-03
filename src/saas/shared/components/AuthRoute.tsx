import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from 'react-redux'
import { RootState } from '../../../state/root'


interface IProps {
    children: React.ReactNode,
    path: string,
    type: string,
}

export const AuthRoute = (props: IProps) => {
    const { type } = props
    const isAuthenticated = useSelector((state: RootState) => state.authReducer.isAuthenticated)
    if (type === "guest" && isAuthenticated) return <Redirect to="/c" />
    else if (type === "private" && !isAuthenticated) return <Redirect to="/" />

    return <Route {...props} />
}
