import { authSaga } from './authSaga';

export default function* rootSaga() {
    yield authSaga();
}