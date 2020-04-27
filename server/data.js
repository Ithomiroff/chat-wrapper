

module.exports.contacts = [
  {
    userId: '1',
    firstName: 'John',
    lastName: 'Doe',
    lastMessage: {
      userId: '1',
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. At, dolor?',

      read: true,
      time: +new Date('4/25/2020')
    },
  },
  {
    userId: '54',
    firstName: 'Brad',
    lastName: 'Wilson',
    lastMessage: {
      userId: '5',
      text: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
       Ad at, autem deserunt doloremque eius eum modi obcaecati quae sed
        sequi similique sunt, voluptate?,
`,

      read: true,
      time: +new Date('4/25/2020')
    },
  },
  {
    userId: '44',
    firstName: 'Kolly',
    lastName: 'Torn',
    lastMessage: {
      userId: '5',
      text: `Lorem ipsum dolor sit amet
`,

      read: false,
      time: +new Date('4/27/2020')
    },
  }
];
