import ReactGA from 'react-ga4';

// Replace with your actual Google Analytics Measurement ID
const MEASUREMENT_ID = 'G-XXXXXXXXXX';

export const initGA = () => {
  ReactGA.initialize(MEASUREMENT_ID, {
    gaOptions: {
      siteSpeedSampleRate: 100,
    },
  });
};

export const logPageView = () => {
  ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
};

export const logEvent = (category: string, action: string, label?: string) => {
  ReactGA.event({
    category,
    action,
    label,
  });
};

export const logException = (description: string, fatal = false) => {
  ReactGA.event({
    category: 'Exception',
    action: description,
    label: fatal ? 'Fatal' : 'Non-Fatal',
  });
};
