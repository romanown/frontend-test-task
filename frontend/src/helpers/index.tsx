export const getParams = (params: any): string =>
  Object.keys(params)
    .map((key) => {
      if (Array.isArray(params[key])) {
        return params[key].map((value: any) => `${key}[]=${value}`).join('&');
      }
      return typeof params[key] === 'object' ? `${key}=${JSON.stringify(params[key])}` : `${key}=${params[key]}`;
    })
    .join('&');
