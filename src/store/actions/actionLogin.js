export const IS_AUTH = "AUTHENTICATED";
const isAuth = (val) => ({
      type: IS_AUTH,
      payload: val
});
export default isAuth;