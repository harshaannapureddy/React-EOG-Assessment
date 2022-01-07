import { AppBar, Toolbar, Typography } from '@material-ui/core'

const Header = () => {
    return (
        <div>
            <AppBar position='static' style={{ background: '#48466D' }}>
                <Toolbar>
                    <Typography variant='h6' >
                        EOG React Visualization Assessment
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Header
