import React from 'react'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
    wrapper: {
        height: '100vh',
        background: '#F5F5F5'
    }
})

const Wrapper: React.FC = ({children}) => {
    const classes = useStyles();
    return (
        <div className={classes.wrapper}>
            {children}
        </div>
    )
}

export default Wrapper
