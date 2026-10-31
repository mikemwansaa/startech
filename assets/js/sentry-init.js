/**
 * Sentry configuration callback.
 *
 * This file works together with the Sentry Loader Script tag in index.html
 * (<head>). The loader calls window.sentryOnLoad() once the full SDK has
 * downloaded, so any extra Sentry.init() options belong here rather than
 * inline in the HTML — keeping this file external lets us run a strict
 * Content-Security-Policy with no 'unsafe-inline' for scripts.
 *
 * Setup:
 * 1. In Sentry: Settings -> Projects -> (your project) -> SDK Setup -> Loader Script.
 * 2. Copy the <script src="https://js.sentry-cdn.com/XXXXXXXX.min.js"> tag
 *    and paste it in index.html <head>, replacing the placeholder src.
 * 3. That's it for basic error tracking — this file's defaults below are
 *    optional extras (environment tag, sample rates) and are safe to leave
 *    as-is or adjust.
 */
window.sentryOnLoad = function () {
  if (typeof Sentry === "undefined") {
    return;
  }

  Sentry.init({
    environment: window.location.hostname === "localhost" ? "development" : "production",

    // Uncomment and set a release identifier if you tag deploys, e.g. a git SHA:
    // release: "startech-landing@1.0.0",

    // Tracing / Session Replay sample rates (only take effect if those
    // features are enabled for this project in the Sentry dashboard).
    tracesSampleRate: 0.2,
    replaysSessionSampleRate: 0.0,
    replaysOnErrorSampleRate: 1.0,
  });
};
