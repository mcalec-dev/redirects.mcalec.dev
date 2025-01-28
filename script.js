function redirectIfQueryIsLink() {
  const urlParams = new URLSearchParams(window.location.search);
  
  // List of query parameters to check
  const paramsToCheck = ['redirect', 'url', 'link', 'target'];
  
  for (const paramName of paramsToCheck) {
      const value = urlParams.get(paramName);
      
      if (value && isValidLink(value)) {
          try {
              const validatedUrl = new URL(value);
              window.location.href = validatedUrl.toString();
              return true;
          } catch (error) {
              console.warn('Invalid URL attempted:', value);
          }
      }
  }
  
  return false;
}

function isValidLink(str) {
  const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
  return urlPattern.test(str) && isValidUrl(str);
}

function isValidUrl(string) {
  try {
      const url = new URL(string);
      return ['http:', 'https:'].includes(url.protocol);
  } catch {
      return false;
  }
}

// Function for the manual redirect button
function manualRedirect() {
  const url = document.getElementById('urlInput').value;
  if (isValidLink(url)) {
      window.location.href = url;
  } else {
      alert('Please enter a valid URL');
  }
}

// Check for redirect on page load
window.addEventListener('load', redirectIfQueryIsLink);