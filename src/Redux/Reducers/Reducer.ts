import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';

export type MultipleMeasurementsTypes = {
    multipleMeasurements: string;
};

export type AllMeasurements = {
    getMetrics: [];
};

export type LiveMetricsTypes = {
    liveData: Array<Object>;
    metric: string;
    value: string;
    at: string;
    unit: string;
};

export type ApiErrorAction = {
    error: string;
};

const initialState = {
    allMetrics: [],
    multipleMeasurements: {},
    liveData: {},
};

const metricSlice = createSlice({
    name: 'metrics',
    initialState,
    reducers: {
        allMetricsDataRecevied: (state, action: PayloadAction<AllMeasurements>) => {
            const { getMetrics } = action.payload;
            state.allMetrics = getMetrics;
        },
        multipleMeasurementsDataRecevied: (state, action: PayloadAction<MultipleMeasurementsTypes>) => {
            state.multipleMeasurements = action.payload;
        },
        metricLiveDataRecevied: (state, action: PayloadAction<LiveMetricsTypes>) => {
            state.liveData = [action.payload]?.map((data) => ({
                [data.metric]: data.value,
                at: moment(parseInt(data.at)).format('LTS'),
                unit: data.unit,
            }))[0];
        },
        metricsApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
    },
});

export const MetricsReducer = metricSlice.reducer;
export const actions = metricSlice.actions;
export default MetricsReducer 