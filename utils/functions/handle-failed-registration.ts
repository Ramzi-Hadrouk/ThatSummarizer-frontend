import type { SignUpFields,LoginFields } from "@/utils/interfaces/types";

export default function handleFailedRegistration(
  fields: SignUpFields|LoginFields,
  prevState: any,
  state: any
) {
  return {
    ...prevState,
    validation_errors: null,
    is_registered: state,
  };
}
