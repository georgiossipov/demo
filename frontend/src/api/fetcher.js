let REQUEST_HEADERS = {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
};

class Fetcher {


  fetchJson(url, requestData = {}) {
    return this.fetch(url, requestData)
      .then(response => {
        return response.status === 204 ? {} : response.json();
      })
      .then(data => {
        return data
      });
  }


  fetch(url, requestData = {}) {
    return fetch(url, Object.assign({}, REQUEST_HEADERS, requestData));
  }


  get(url) {
    return this.fetchJson(url, {method: "GET"});
  }


  post(url, requestData = {}) {
    return this.fetchJson(url, {method: "POST", body: JSON.stringify(requestData)});
  }

  patch(url, requestData = {}) {
    return this.fetchJson(url, {method: "PATCH", body: JSON.stringify(requestData)});
  }

  delete(url) {
    return this.fetchJson(url, {method: "DELETE"});
  }
}
export default new Fetcher();