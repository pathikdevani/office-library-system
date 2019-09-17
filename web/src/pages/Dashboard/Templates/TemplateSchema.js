export default [
  {
    label: 'Name',
    key: 'name',
    type: 'text',
    placeholder: 'Enter store name',
    icon: 'user',
    rules: [{
      required: true,
      message: 'please enter Store Name',
    }],
  },
  {
    label: 'Repository link',
    key: 'repository',
    type: 'text',
    placeholder: 'Enter repository link',
    rules: [{
      required: true,
      message: 'please enter Repository link',
    }],
  },
];
