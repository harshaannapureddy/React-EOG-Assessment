/* eslint-disable quotes */
import { takeEvery, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { PayloadAction } from '@reduxjs/toolkit';
import { actions as MetricActions, ApiErrorAction } from '../Redux/Reducers/Reducer';

function* apiErrorReceived(action: PayloadAction<ApiErrorAction>) {
    yield call(toast.error, `Error: ${action.payload.error}`);
}

// We could have one for each or just recive a parameter to identify the source of the error
export default function* watchApiError() {
    yield takeEvery(MetricActions.metricsApiErrorReceived.type, apiErrorReceived);
}
