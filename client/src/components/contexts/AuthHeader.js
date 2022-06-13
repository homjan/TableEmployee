export default function authHeader() {
    const authData = JSON.parse(localStorage.getItem('authData'));
    if (authData && authData.accessToken) {
      return { Authorization: 'Bearer ' + authData.accessToken };
    } else {
      return {};
    }
  }