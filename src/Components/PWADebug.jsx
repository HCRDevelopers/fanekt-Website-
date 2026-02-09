import React, { useState, useEffect } from 'react';

const PWADebug = () => {
  const [isPWA, setIsPWA] = useState(false);
  const [serviceWorkerStatus, setServiceWorkerStatus] = useState('Unknown');
  const [manifestStatus, setManifestStatus] = useState('Unknown');
  const [installPromptAvailable, setInstallPromptAvailable] = useState(false);
  const [debugInfo, setDebugInfo] = useState({});

  useEffect(() => {
    // Check if PWA is installed
    const checkPWA = () => {
      if (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) {
        setIsPWA(true);
      }
    };
    checkPWA();

    // Check Service Worker
    const checkServiceWorker = async () => {
      if ('serviceWorker' in navigator) {
        try {
          const registration = await navigator.serviceWorker.getRegistration();
          if (registration) {
            setServiceWorkerStatus('Registered');
            setDebugInfo(prev => ({ ...prev, swScope: registration.scope }));
          } else {
            setServiceWorkerStatus('Not registered');
          }
        } catch (error) {
          setServiceWorkerStatus('Error: ' + error.message);
        }
      } else {
        setServiceWorkerStatus('Not supported');
      }
    };
    checkServiceWorker();

    // Check Manifest
    const checkManifest = () => {
      const link = document.querySelector('link[rel="manifest"]');
      if (link && link.href) {
        fetch(link.href)
          .then(response => {
            if (response.ok) {
              setManifestStatus('Found and accessible');
              return response.json();
            } else {
              throw new Error('Manifest not found');
            }
          })
          .then(manifest => {
            setDebugInfo(prev => ({ ...prev, manifest }));
          })
          .catch(error => {
            setManifestStatus('Error: ' + error.message);
          });
      } else {
        setManifestStatus('Not found');
      }
    };
    checkManifest();

    // Check install prompt availability
    const handleBeforeInstallPrompt = () => {
      setInstallPromptAvailable(true);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Check HTTPS
    const isHTTPS = window.location.protocol === 'https:';
    setDebugInfo(prev => ({ ...prev, isHTTPS, userAgent: navigator.userAgent }));

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  // Always show debug info for troubleshooting PWA issues
  const shouldShow = true;

  if (!shouldShow) return null;

  return (
    <div className="fixed top-4 left-4 z-50 bg-black/90 text-white p-4 rounded-lg font-mono text-xs max-w-md">
      <h3 className="font-bold mb-2">PWA Debug Info</h3>
      <div className="space-y-1">
        <div>PWA Installed: <span className={isPWA ? 'text-green-400' : 'text-red-400'}>{isPWA ? 'Yes' : 'No'}</span></div>
        <div>Service Worker: <span className={serviceWorkerStatus === 'Registered' ? 'text-green-400' : 'text-red-400'}>{serviceWorkerStatus}</span></div>
        <div>Manifest: <span className={manifestStatus === 'Found and accessible' ? 'text-green-400' : 'text-red-400'}>{manifestStatus}</span></div>
        <div>Install Prompt: <span className={installPromptAvailable ? 'text-green-400' : 'text-red-400'}>{installPromptAvailable ? 'Available' : 'Not available'}</span></div>
        <div>HTTPS: <span className={debugInfo.isHTTPS ? 'text-green-400' : 'text-red-400'}>{debugInfo.isHTTPS ? 'Yes' : 'No (Required for PWA)'}</span></div>
      </div>
      {Object.keys(debugInfo).length > 0 && (
        <details className="mt-2">
          <summary className="cursor-pointer text-gray-300">Details</summary>
          <pre className="text-xs mt-2 overflow-auto max-h-32">{JSON.stringify(debugInfo, null, 2)}</pre>
        </details>
      )}
    </div>
  );
};

export default PWADebug;