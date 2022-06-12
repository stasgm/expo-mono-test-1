export const log = (message: string | Error, data?: Record<string, unknown>) => {
  data ? console.log(message, data) : console.log(message);
};
