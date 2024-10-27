// schemas/product.js

export default {
    name: 'product',
    title: 'Product',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Name',
        type: 'string',
      },
      {
        name: 'price',
        title: 'Price',
        type: 'number',
      },
      {
        name: 'isNew',
        title: 'Is New',
        type: 'boolean',
      },
      {
        name: 'img',
        title: 'Image',
        type: 'array',
        of: [{ type: 'image', options: { hotspot: true } }],
      },
      {
        name: 'discount',
        title: 'Discount',
        type: 'number',
      },
      
      {
        name: 'newArrival',
        title: 'New Arrival',
        type: 'string',
      },

    {
        name: 'soldOut',
        title: 'Sold Out',
        type: 'boolean',
      },
      {
        name: 'category',
        title: 'Category',
        type: 'string',
        options: {
          list: [
            { title: 'T-shirt', value: 't-shirt' },
            { title: 'Must Have', value: 'must-have' },
            { title: 'Pants', value: 'pant' },
            { title: 'Jacket', value: 'jacket' },
            { title: 'TEBC', value: 'tebc' },
            { title: 'Accessories', value: 'accessories' },
          ],
        },
      },
      {
        name: 'size',
        title: 'Sizes',
        type: 'array',
        of: [{ type: 'string' }],
      },
      {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
            source: 'name'
        }
      },
      {
        name: 'color',
        title: 'Color',
        type: 'string',
      },
      {
        name: 'description',
        title: 'Description',
        type: 'text',
      },
      {
        name: 'hot',
        title: 'HOT',
        type: 'string',
      },
      {
        name: 'features',
        title: 'Features',
        type: 'array',
        of: [{ type: 'string' }],
      },
      {
        name: 'gender',
        title: 'Gender',
        type: 'string',
        options: {
          list: [
            { title: 'Men', value: 'men' },
            { title: 'Women', value: 'women' },
            { title: 'Unisex', value: 'unisex' },
          ],
        },
      },
    ],
  };
  