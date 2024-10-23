export default {
    name: 'orderItem',
    title: 'Order Item',
    type: 'object',
    fields: [
      {
        name: 'name',
        title: 'Product Name',
        type: 'string',
      },
      {
        name: 'quantity',
        title: 'Quantity',
        type: 'number',
      },
      {
        name: 'price',
        title: 'Price',
        type: 'number',
      },
      {
        name: 'size',
        title: 'Size',
        type: 'string',
      },
      {
        name: 'image',
        title: 'Image',
        type: 'image',
        options: {
          hotspot: true,
        },
      },
    ],
  };
  