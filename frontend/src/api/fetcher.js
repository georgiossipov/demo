let REQUEST_HEADERS = {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
};

class Fetcher {


  fetchJson(url, requestData = {}) {
    return this.fetch(url, requestData)
      .then(response => response.json())
      .then(data => data);
  }


  fetch(url, requestData = {}) {
    return fetch(url, Object.assign({}, REQUEST_HEADERS, requestData));
  }


  get(url, requestData = {}) {
    return this.fetchJson(url, {method: 'GET'});
  }


  post(url, requestData = {}) {
    return this.fetchJson(url, {method: 'POST'});
  }

  patch(url, requestData = {}) {
    return this.fetchJson(url, {method: 'PATCH', body: JSON.stringify(requestData)});
  }

  delete(url, requestData = {}) {
    return this.fetchJson(url, {method: 'DELETE'});
  }
}
export default new Fetcher();