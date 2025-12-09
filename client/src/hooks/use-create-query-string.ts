import { useCallback } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const DEFAULT_OPTIONS = {
  autoNavigate: true,
};

type OptionsType = Partial<typeof DEFAULT_OPTIONS>;
export default function useCreateQueryString(
  options: OptionsType = DEFAULT_OPTIONS
) {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      let queries: { [key: string]: string } = {};
      searchParams.forEach((value, key) => {
        queries[key] = value;
      });
      const params = new URLSearchParams(queries);
      params.set(name, value);
      const paramsString = params.toString();
      if (options.autoNavigate) {
        navigate(location.pathname + "?" + paramsString);
      }
      return paramsString;
    },
    [location, searchParams]
  );

  return createQueryString;
}
