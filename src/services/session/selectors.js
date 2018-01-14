import { store } from '../../store';

export const get = () => {
  return store.getState().session;
};
