export const mockDataTeam = [
    {
      id: 1,
      name: "Jon Snow",
      email: "jonsnow@gmail.com",
      age: 35,
      phone: "(665)121-5454",
      access: "admin",
      img: 'https://pngimg.com/d/thinking_man_PNG11606.png'
    },
    {
        id: 2,
        name: "Cersei Lannister",
        email: "cerseilannister@gmail.com",
        age: 42,
        phone: "(421)314-2288",
        access: "manager",
        img: 'https://t4.ftcdn.net/jpg/03/83/25/83/360_F_383258331_D8imaEMl8Q3lf7EKU2Pi78Cn0R7KkW9o.jpg'
    },
    {
        id: 3,
        name: "Jaime Lannister",
        email: "jaimelannister@gmail.com",
        age: 45,
        phone: "(422)982-6739",
        access: "user",
        img: 'https://img.freepik.com/free-photo/handsome-corporate-man-real-estate-agent-assistant-smiling-hold-hands-together-how-may-i-help-you-smiling-friendly-polite-assist-customer-white-background_176420-45257.jpg?size=626&ext=jpg&ga=GA1.1.1448711260.1706313600&semt=ais'
    },
    {
        id: 4,
        name: "Anya Stark",
        email: "anyastark@gmail.com",
        age: 16,
        phone: "(921)425-6742",
        access: "admin",
        img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww'
    },
    {
        id: 5,
        name: "Daenerys Targaryen",
        email: "daenerystargaryen@gmail.com",
        age: 31,
        phone: "(421)445-1189",
        access: "user",
        img: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?cs=srgb&dl=pexels-justin-shaifer-1222271.jpg&fm=jpg'
    },
    {
        id: 6,
        name: "Ever Melisandre",
        email: "evermelisandre@gmail.com",
        age: 150,
        phone: "(232)545-6483",
        access: "manager",
        img: 'https://previews.123rf.com/images/stockbroker/stockbroker1710/stockbroker171000644/89639939-portrait-of-young-professional-man-in-suit-arms-crossed.jpg'
    },
    {
        id: 7,
        name: "Ferrara Clifford",
        email: "ferraraclifford@gmail.com",
        age: 44,
        phone: "(543)124-0123",
        access: "user",
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOXSlBXw9_z5ve5_4tverBGLtVGy0lNMhM6Q&usqp=CAU'
    },
    {
        id: 8,
        name: "Rossini Frances",
        email: "rossinifrances@gmail.com",
        age: 36,
        phone: "(222)444-5555",
        access: "user",
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfM4OblFh1J9PweRH4uLelyKgpP6vPSPx2nA&usqp=CAU'
    },
    {
        id: 9,
        name: "Harvey Roxie",
        email: "harveyroxie@gmail.com",
        age: 65,
        phone: "(444)555-6239",
        access: "admin",
        img: 'https://img.freepik.com/free-photo/young-male-entrepreneur-making-eye-contact-against-blue-background_662251-739.jpg'
    },
  ];

export const rows = mockDataTeam.map(item => ({
    id: item.id,
    name: item.name,
    email: item.email,
    age: item.age,
    phone: item.phone,
    access: item.access
}));

export const columns = [
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'age', headerName: 'Age', width: 150 },
    { field: 'phone', headerName: 'Phone', width: 200 },
    { field: 'access', headerName: 'Access', width: 150 },
];