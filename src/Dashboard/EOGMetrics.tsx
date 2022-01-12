import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import { LinearProgress, Grid } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { useQuery, useSubscription } from 'urql';
import MetricCard from '../components/MetricCard';
import MetricChart from '../components/MetricChart';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../Redux/Reducers/Reducer'
import { IState } from '../Redux/Store'

const currentTime = new Date().valueOf();
const passTime = 1800000;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        select: {
            padding: theme.spacing(2),
        },
    }),
);

// Graphql Querries
const query = `{
    getMetrics
    }
  `;

const queryMultipleMeasurements = `
  query($input: [MeasurementQuery]){
    getMultipleMeasurements(input: $input) {
      metric
      measurements {
       at
       value
       metric
       unit
      }
    }
  }`;

const queryMetricSubscription = `
    subscription {
      newMeasurement{
        metric
        at
        value
        unit
      }
    }
  `;

export interface MultipleMeasurements {
    measurements: Object;
}

const getMetrics = (state: IState) => {
    const { allMetrics, multipleMeasurements, liveData } = state.MetricsData;
    return {
        allMetrics,
        multipleMeasurements,
        liveData
    };
};

const EOGMetrics = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const isMultiSelect = true;
    const [dropdownMenu, setDropdownMenu] = useState([]);
    const [selectedChartOptions, setSelectedChartsOptions] = useState([]);
    const { allMetrics, multipleMeasurements, liveData } = useSelector(getMetrics);
    const [resultgetMetrics] = useQuery({
        query,
    });

    const [resultMultipleMeasurements] = useQuery({
        query: queryMultipleMeasurements,
        variables: {
            input: allMetrics.map((metricName: any) => ({
                metricName,
                after: currentTime - passTime,
                before: currentTime,
            })),
        },
    });
    const [resultsLiveMetrics] = useSubscription({
        query: queryMetricSubscription,
    });

    const selectedOption = (option: any) => {
        if(option === null){
            setSelectedChartsOptions([])
        }
        else{
            setSelectedChartsOptions(option)
        }
    }

    useEffect(() => {
        const tempOptions: any = [];
        allMetrics.forEach((m: any) => {
            tempOptions.push({ value: m, label: m.replace(/([A-Z])/g, ' $1').toUpperCase() });
        });
        setDropdownMenu(tempOptions);
    }, [allMetrics]);

    // Get All Avaliable Metrics
    useEffect(() => {
        const { data, error } = resultgetMetrics;
        if (error) {
            dispatch(actions.metricsApiErrorReceived({ error: error?.message }));
            return;
        }
        if (!data) return;
        dispatch(actions.allMetricsDataRecevied(data));
    }, [dispatch, resultgetMetrics]);

    // Effect for Multiple and Pass Metrics
    useEffect(() => {
        const { data, error } = resultMultipleMeasurements;
        if (error) {
            dispatch(actions.metricsApiErrorReceived({ error: error?.message }));
            return;
        }
        if (!data) return;
        dispatch(actions.multipleMeasurementsDataRecevied(data?.getMultipleMeasurements));
    }, [dispatch, resultMultipleMeasurements]);

    // Effect for Live Data
    useEffect(() => {
        const { data, error } = resultsLiveMetrics;
        if (error) {
            dispatch(actions.metricsApiErrorReceived({ error: error?.message }));
            return;
        }
        if (!data) return;
        dispatch(actions.metricLiveDataRecevied(data?.newMeasurement));
    }, [dispatch, resultsLiveMetrics]);

    if (resultMultipleMeasurements?.fetching) {
        return <LinearProgress />;
    }
    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={3} />
                <Grid item xs={6}>
                    <div style={{ marginTop: '30px' }}>
                        <Select
                            placeholder='Select metric'
                            onChange={selectedOption}
                            isMulti={isMultiSelect}
                            closeMenuOnSelect
                            options={dropdownMenu}
                        />
                    </div>
                </Grid>
            </Grid>
            {selectedChartOptions.length === 0 ?
                <>
                    <p style={{ textAlign: 'center', marginTop: '150px' }}>
                        Please select atleast one metric from the dropdown
                    </p>
                </> : <>
                    <Grid container spacing={1} className={classes.select}>
                        {selectedChartOptions.map((c: any, i: any) => {
                            return (
                                <Grid key={i} item xs={2}>
                                    <MetricCard info={c} liveData={resultsLiveMetrics.data.newMeasurement} />
                                </Grid>
                            );
                        })}
                    </Grid>
                    <Grid container spacing={1} className={classes.select} />
                    <MetricChart data={multipleMeasurements} liveData={liveData} selectedChartOptions={selectedChartOptions} />
                </>
            }
        </div>
    )
}

export default EOGMetrics
