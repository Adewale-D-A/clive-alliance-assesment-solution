interface NavLink {
  id: string;
  title: string;
  href: string;
  icon?: JSX.Element;
  children?: NavLink[];
}
export type PaginationType = {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number;
  to: number;
  length?: number;
};

interface AutocompleteResultI {
  description: string;
  matched_substrings: [
    {
      length: number;
      offset: number;
    }
  ];
  place_id: string;
  reference: string;
  structured_formatting: {
    main_text: string;
    main_text_matched_substrings: {
      length: number;
      offset: number;
    }[];
    secondary_text: string;
  };
  terms: {
    offset: number;
    value: string;
  }[];
  types: string[];
}

export type UserTypeT = {
  id: string;
  name: string;
  description: string;
};
export type AuthUserT = {
  id: string;
  user_type: UserTypeT;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  dob: string;
  gender: string;
};
