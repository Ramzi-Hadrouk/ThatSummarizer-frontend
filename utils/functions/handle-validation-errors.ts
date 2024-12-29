import type { SignUpFields,LoginFields } from "@/utils/interfaces/types";

export default function handleValidationErrors(
  fields: SignUpFields|LoginFields,
  validationResult: any,
  prevState: any
) {
  return {
    ...prevState,
    validation_errors: validationResult.error.flatten().fieldErrors,
    is_registered: { state: "no", error: null },
  };
}
