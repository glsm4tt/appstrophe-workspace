const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
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
        'inner-xl': '0 0 0px  1000px inset',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
