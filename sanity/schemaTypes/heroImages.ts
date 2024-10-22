// schemas/hero.js

export default {
    name: 'heroImage',
    title: 'Two Hero Images',
    type: 'document',
    fields: [
      {
        name:  'image1',
        type: 'image',
        title: 'First Image'
      },
      {
        name:  'image2',
        type: 'image',
        title: 'Secont Image'
      },
    ],
  };
  