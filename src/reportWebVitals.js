const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    // Dynamically import the 'web-vitals' library and log performance metrics
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry); // Measure Cumulative Layout Shift (CLS)
      getFID(onPerfEntry); // Measure First Input Delay (FID)
      getFCP(onPerfEntry); // Measure First Contentful Paint (FCP)
      getLCP(onPerfEntry); // Measure Largest Contentful Paint (LCP)
      getTTFB(onPerfEntry); // Measure Time to First Byte (TTFB)
    });
  }
};

export default reportWebVitals;
