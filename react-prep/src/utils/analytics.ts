export const trackEvent = (
  eventName: string,
  params: Record<string, any> = {}
) => {
  window.gtag?.("event", eventName, {
    ...params,
    app: "finance-demo",
    env: "dev",
  });
};