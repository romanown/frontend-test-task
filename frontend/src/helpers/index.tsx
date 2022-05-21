export const getParams = (params: any): string =>
  Object.keys(params)
    .map((key) => {
      if (Array.isArray(params[key])) {
        return params[key].map((value: any) => `${key}[]=${value}`).join('&');
      }
      return `${key}[]=${params[key]}`;
    })
    .join('&');
