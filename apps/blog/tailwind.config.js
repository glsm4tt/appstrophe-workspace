const { createGlobPatternsForDependencies } = require('@nrwl/angular/tailwind');
const { join } = require('path');

module.exports = {
 // purge: [],
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
        boxShadow: {
          'inner-xl': '0 0 0px 1000px inset',
        },
      fontSize: {
        '4xs': '.125rem',
        '3xs': '.25rem',
        '2xs': '.5rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
};
