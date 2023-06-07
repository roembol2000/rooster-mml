class Analytics {
  constructor(provider, opts) {
    this.provider = provider;
    this.opts = opts;
    const enabledEnv = import.meta.env.VITE_ANALYTICS_ENABLED;
    this.enabled = enabledEnv == "yes" ? true : false;
    this.apiEndpoint = `${opts.endpoint}/api/send`;
    this.urlWhitelist = ["/schedule"];
  }

  sendData(body) {
    fetch(this.apiEndpoint, {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      method: "POST",
    });
  }

  trackPageView(location) {
    if (!this.enabled) return;
    if (!this.urlWhitelist.includes(location.pathname)) return;

    const referrer = location.state?.referrer || "";

    const body = {
      type: "event",
      payload: {
        hostname: import.meta.env.VITE_HOSTNAME,
        language: navigator.language,
        referrer: referrer,
        screen: `${window.screen.width}x${window.screen.height}`,
        title: document.title,
        url: location.pathname,
        website: this.opts.website,
      },
    };

    this.sendData(body);
  }

  trackEvent(location, event) {
    if (!this.enabled) return;

    const referrer = location.state?.referrer || "";

    const body = {
      type: "event",
      payload: {
        hostname: import.meta.env.VITE_HOSTNAME,
        language: navigator.language,
        referrer: referrer,
        screen: `${window.screen.width}x${window.screen.height}`,
        title: document.title,
        url: location.pathname,
        website: this.opts.website,
        name: event.name,
      },
    };

    this.sendData(body);
  }
}

export default Analytics;
