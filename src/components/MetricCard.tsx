import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography } from '@material-ui/core';

const colors = ['#000000', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00', '#654321', '#a65628', '#f781bf'];
const useStyles = makeStyles({
    root: {
        width: '100%',
        backgroundColor: '#fff',
        color: '#1f1f1f'
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
        color: '#1f1f1f'
    },
});
const MetricCard = (props: any) => {
    const classes = useStyles();
    const [metric, setMetric] = useState({ metric: '', unit: '', value: '' });
    const filterByMetric = [props.liveData].find((m) => m.metric === props.info.value);
    const newValue = filterByMetric !== undefined ? filterByMetric : metric;

    useEffect(() => {
        if (newValue !== undefined) {
            setMetric(newValue);
        }
    }, [newValue]);
    return (
        <div>
            <Card className={classes.root}>
                <CardContent>
                    <Typography variant="h6" component="h5" align="center">
                        {props.info.label}
                    </Typography>
                    <Typography className={classes.pos} align="center" variant="h6" component="h1">
                        {`${metric.value} - ${metric.unit}`}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}

export default MetricCard
