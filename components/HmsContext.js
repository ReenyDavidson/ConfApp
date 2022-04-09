import {createContext} from 'react';

const HMSContext = createContext(null);

export const HMSProvider = HMSContext.Provider;

export default HMSContext;
