const RequestBuilder = {
  BuildQuery(queryParams) {
    let query = "";
    if (queryParams) {
      query = Object.keys(queryParams)
        .map((key) => {
          return (
            encodeURIComponent(key) + "=" + encodeURIComponent(queryParams[key])
          );
        })
        .join("&");
    }
    return `?${query}`;
  },
  BuildBody(bodyParams) {
    let body = "";
    if (bodyParams) {
      body = JSON.stringify(bodyParams);
    }
    return body;
  },
};

export default RequestBuilder;
