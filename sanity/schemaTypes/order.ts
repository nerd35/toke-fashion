export default {
    name: 'order',
    title: 'Order',
    type: 'document',
    fields: [
      {
        name: 'userId',
        title: 'User ID',
        type: 'string',
      },
      {
        name: 'firstname',
        title: 'First Name',
        type: 'string',
      },
      {
        name: 'lastname',
        title: 'Last Name',
        type: 'string',
      },
      {
        name: 'email',
        title: 'Email',
        type: 'string',
      },
      {
        name: 'phone',
        title: 'Phone Number',
        type: 'string',
      },
      {
        name: 'address',
        title: 'Address',
        type: 'string',
      },
      {
        name: 'city',
        title: 'City',
        type: 'string',
      },
      {
        name: 'state',
        title: 'State',
        type: 'string',
      },
      {
        name: 'country',
        title: 'Country',
        type: 'string',
      },
      {
        name: 'price',
        title: 'Price',
        type: 'number',
      },
      {
        name: 'orderDetails',
        title: 'Order Details',
        type: 'array',
        of: [{ type: 'orderItem' }], // Reference the 'orderItem' sub-schema here
      },
      {
        name: 'status',
        title: 'Order Status',
        type: 'string',
        options: {
          list: [
            { title: 'Pending', value: 'pending' },
            { title: 'Success', value: 'success' },
            { title: 'Failed', value: 'failed' },
          ],
          layout: 'dropdown',
        },
      },
    ]
  }
  