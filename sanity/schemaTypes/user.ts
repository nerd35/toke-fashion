// schemas/user.js
export default {
    name: 'user',
    title: 'User',
    type: 'document',
    fields: [
      {
        name: 'username',
        title: 'Username',
        type: 'string',
      },
      {
        name: 'email',
        title: 'Email',
        type: 'string',
        validation: (Rule: { required: () => { (): any; new(): any; email: { (): any; new(): any; }; }; }) => Rule.required().email(),
      },
      {
        name: 'password',
        title: 'Password',
        type: 'string',
        options: {
          isHidden: true, // hide this field in the desk tool
        },
      },
      // Add more fields as needed (e.g., phone number, address, etc.)
      
      {
        name: 'phonenumber',
        title: 'Phone Number',
        type: 'string',
      },
      {
        name: 'country',
        title: 'Country',
        type: 'string',
      },
      
      {
        name: 'address',
        title: 'Address',
        type: 'string',
      },
      {
        name: 'state',
        title: 'State',
        type: 'string',
      },
      {
        name: 'city',
        title: 'City',
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
    ],
  };
  