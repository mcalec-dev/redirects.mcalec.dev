function redirectIfQueryIsLink() {
  const urlParams = new URLSearchParams(window.location.search);
  const paramsToCheck = ['redirect', 'url', 'link', 'target'];
  
  for (const paramName of paramsToCheck) {
      const value = urlParams.get(paramName);
      if (value) {
          const processedUrl = processUrl(value);
          if (processedUrl) {
              window.location.href = processedUrl;
              return true;
          }
      }
  }
  return false;
}

function processUrl(input) {
  // Remove any whitespace
  input = input.trim();

  // Check if it's already a valid URL
  try {
      new URL(input);
      return input;
  } catch {
      // Not a valid URL, let's process it
  }

  // Check if it matches a domain pattern
  const domainPattern = /^([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
  if (domainPattern.test(input)) {
      return `https://${input}`;
  }

  // If it starts with www., add https://
  if (input.startsWith('www.')) {
      return `https://${input}`;
  }

  // Check if it might be a domain without protocol
  if (input.includes('.') && !input.includes(' ') && !input.includes('http')) {
      return `https://${input}`;
  }

  return null;
}

function manualRedirect() {
  const input = document.getElementById('urlInput').value;
  const processedUrl = processUrl(input);
  
  if (processedUrl) {
      window.location.href = processedUrl;
  } else {
      alert('Please enter a valid domain or URL');
  }
}

// Check for redirect on page load
window.addEventListener('load', redirectIfQueryIsLink);