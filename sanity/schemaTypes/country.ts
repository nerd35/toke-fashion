// country.js (Sanity Schema)
export default {
    name: 'country',
    type: 'document',
    title: 'Country',
    fields: [
      {
        name: 'name',
        type: 'string',
        title: 'Country Name'
      },
      {
        name: 'code',
        type: 'string',
        title: 'Country Code'
      },
      {
        name: 'flag',
        type: 'url',
        title: 'Country Flag URL'
      }
    ]
  };
  