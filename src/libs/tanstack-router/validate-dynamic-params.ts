import type { ErrorComponentProps, ParamsOptions } from '@tanstack/react-router';

type Props = {
  params: ParamsOptions;
  errors: ErrorComponentProps['error'][];
};

export function validateDynamicParams({ params, errors }: Props) {
  for (const [key, value] of Object.entries(params)) {
    if (isNaN(Number(value))) {
      errors.push({ message: `${key} must be a number` });
    }
  }
}
