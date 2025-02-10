//--------used in main page adn blockrendred function 
export interface Block {
  __component: string;
  id: string;

};

//---------used in feature-section component:
export interface FeatureItem {
  id: number;
  heading: string;
  subheading: string;
  icon: string;
};

export interface FeaturesSection {
  id: number;
  __component: string;
  title: string | null;
  description: string | null;
  features: FeatureItem[];
};

//------ used in hero-section component :
interface ImageAttributes {
  url: string;
  alternativeText: string | null;
}

interface ImageData {
  id: number;
  attributes: ImageAttributes;
}

interface Image {
  data: ImageData;
}

interface Link {
  id: number;
  name: string;
  url: string;
  isExternal: boolean;
}

export interface HeroSection {
  id: number;
  __component: string; // Should be "sections.hero-section"
  heading: string;
  subheading: string;
  image: Image;
  link: Link[];
}

export interface Footer {
  id: number;
  logo: Link;
  button: Link;
}

//------ used in server-action/register-user-action  :
export interface SignUpFields {
  username: FormDataEntryValue | null;
  email: FormDataEntryValue | null;
  password: FormDataEntryValue | null;
}

export interface LoginFields {
  email: FormDataEntryValue | null;
  password: FormDataEntryValue | null;
}

// types.ts
export interface UpdateProfileFields {
  id: number;
  username: string| null;
  email: string| null;
  firstname: string | null;
  lastname: string | null;
  bio: string | null;
}

export type User = {
  id: number;
  username: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  bio: string | null;
  credit: number;
  createdAt: string;
  updatedAt: string;
};

// In updateProfileServerAction.ts


export interface FormState {
  data: any;
  validation_errors: Record<string, string[]> | null;
  is_updated: {
    state: string;
    error: any;
  };
}



export interface UserInfo {
  id: number;
  username: string;
  email: string;
  firstname?: string;
  lastname?: string;
  bio?: string;
  [key: string]: any;
}

export interface FieldConfig {
  id: string;
  label?: string;
  name: string;
  type: string;
  readOnly?: boolean;
  component: React.ComponentType<any>;
  className?: string;
  errorKey?: string;
  hidden?: boolean;
}

export interface FormFieldProps {
  field: FieldConfig;
  userInfo: UserInfo | null;
  validationErrors: Record<string, string[]> | null;
}