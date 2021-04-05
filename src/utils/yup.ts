import * as yup from 'yup';

yup.setLocale({
  mixed: {
    required: 'Required',
    notType: ({ type }: { type: string }) => {
      return `Must be a ${type}`;
    },
  },
  number: {
    max: 'Must be less than ${max}',
    min: 'Must be more than ${min}',
    lessThan: 'Must be less than ${less}',
    moreThan: 'Must be more than ${more}',
  },
});
