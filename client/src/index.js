import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import App from './App';

import './index.css';
import 'nprogress/nprogress.css';
// Sentry
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
// Immer
import { enableES5 } from 'immer';

// Redux
import { configureStore } from './store';
import { Provider } from 'react-redux';

const store = configureStore();

// Suppport for older JavaScript environments.
enableES5();

// Enable Sentry
Sentry.init({
	// Lar dette ligge her for presentasjon, dette burde ligge i en udelt mappe, slik som forkaringen ved Auth nedenfor.
  dsn: "https://59b91f0ea056489da848677a3920e76a@o441984.ingest.sentry.io/5412944",
  integrations: [
    new Integrations.BrowserTracing(),
  ],
  tracesSampleRate: 1.0,
});

//!!- Død kode

// This will also work.
// const onRedirectCallback = appState => {
//   history.push(
//     appState && appState.targetUrl
//       ? appState.targetUrl
//       : window.location.href = "http://localhost:3000/lookup"
//   );
// };

ReactDOM.render(
	<Provider store={store}>
			<App />
	</Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
