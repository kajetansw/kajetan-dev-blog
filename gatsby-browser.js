exports.onServiceWorkerUpdateReady = () => {
  if (confirm('A new version of this site is available!\n\nWould you like to load it now?')) {
    window.location.reload(true);
  }
};
