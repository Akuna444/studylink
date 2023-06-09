import mongoose from "mongoose";

const userIds = [
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
];

export const users = [
  {
    _id: userIds[0],
    firstName: "Chala",
    lastName: "Kassahun",
    email: "chalu@gmail.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "p7.jpeg",
    friends: [],
    university: "AASTU",
    department: "Software Engineering",
    viewedProfile: 14561,
    impressions: 888822,
    createdAt: 1115211422,
    updatedAt: 1115211422,
    __v: 0,
  },
  {
    _id: userIds[1],
    firstName: "Alemu",
    lastName: "Kebede",
    email: "aleale@gmail.com",
    password: "$!FEAS@!O)_IDJda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "p3.jpeg",
    friends: [],
    university: "Gonder University",
    department: "Software Engineering",
    viewedProfile: 12351,
    impressions: 55555,
    createdAt: 1595589072,
    updatedAt: 1595589072,
    __v: 0,
  },
  {
    _id: userIds[2],
    firstName: "Megerssa",
    lastName: "Ebisa",
    email: "megerssa@gmail.com",
    password: "da39a3ee5e6b4b0d3255bfef95601890afd80709",
    picturePath: "p10.jpeg",
    friends: [],
    university: "Addis Ababa University",
    department: "Electrical and Communication Engineering",
    viewedProfile: 45468,
    impressions: 19986,
    createdAt: 1288090662,
    updatedAt: 1288090662,
    __v: 0,
  },
  {
    _id: userIds[3],
    firstName: "Mulatu",
    lastName: "Solomon",
    email: "mulatu@gmail.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "p4.jpeg",
    friends: [],
    university: "AASTU",
    department: "Civil Engineering",
    viewedProfile: 41024,
    impressions: 55316,
    createdAt: 1219214568,
    updatedAt: 1219214568,
    __v: 0,
  },
  {
    _id: userIds[4],
    firstName: "Alemitu",
    lastName: "Getu",
    email: "alemitu@gmail.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "p5.jpeg",
    friends: [],
    university: "Bahirdar University",
    department: "Chemical Engineering",
    viewedProfile: 40212,
    impressions: 7758,
    createdAt: 1493463661,
    updatedAt: 1493463661,
    __v: 0,
  },
  {
    _id: userIds[5],
    firstName: "Aynalem",
    lastName: "Tafesse",
    email: "aynalem33@gmail.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "p1.jpeg",
    friends: [],
    university: "Jinka University",
    department: "Accounting",
    viewedProfile: 976,
    impressions: 4658,
    createdAt: 1381326073,
    updatedAt: 1381326073,
    __v: 0,
  },
  {
    _id: userIds[6],
    firstName: "Amanuel",
    lastName: "Tolossa",
    email: "amani@gmail.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "p3.jpeg",
    friends: [],
    university: "AASTU",
    department: "Electrical and Computer Engineering",
    viewedProfile: 1510,
    impressions: 77579,
    createdAt: 1714704324,
    updatedAt: 1642716557,
    __v: 0,
  },
  {
    _id: userIds[7],
    firstName: "Bethelehem",
    lastName: "Kebede",
    email: "jessicadunn@gmail.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "p9.jpeg",
    friends: [],
    university: "Wolayita Sodo",
    department: "Computer Science",
    viewedProfile: 19420,
    impressions: 82970,
    createdAt: 1369908044,
    updatedAt: 1359322268,
    __v: 0,
  },
];

export const posts = [
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[6],
    firstName: "Amanuel",
    lastName: "Tolossa",
    university: "AASTU",
    department: "Electrical and Computer Engineering",
    description: "Here is Data Communication and Networks Chapter 2",
    filePath: "datacom-c3.pdf",
    userPicturePath: "p3.jpeg",
    likes: new Map([
      [userIds[0], true],
      [userIds[2], true],
      [userIds[3], true],
      [userIds[4], true],
    ]),
    comments: ["Thank you!", "That was helpful", "We want chapter 2"],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[4],
    firstName: "Alemitu",
    lastName: "Getu",
    university: "Bahirdar University",
    description: "Here is analaytical chemistry worksheet",
    department: "Chemical Engineering",
    picturePath: "chemical-worksheet.jpg",
    userPicturePath: "p5.jpeg",
    likes: new Map([
      [userIds[7], true],
      [userIds[4], true],
      [userIds[1], true],
      [userIds[2], true],
    ]),
    comments: ["Thank you"],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[5],
    firstName: "Aynalem",
    lastName: "Taffese",
    department: "Accounting",
    university: "Jinka University",
    description: "Guys do you have this book? ",
    picturePath: "econometrics-book.jpg",
    userPicturePath: "p1.jpeg",
    likes: new Map([
      [userIds[1], true],
      [userIds[6], true],
      [userIds[3], true],
    ]),
    comments: ["I am afraid I haven't", "Search it on Google Schoolars"],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[0],
    firstName: "Chala",
    lastName: "Kassahun",
    university: "AASTU",
    department: "Software Engineering",
    description: "Guys can you send me DSA last year exams?",
    picturePath: "question.png",
    userPicturePath: "p7.jpeg",
    likes: new Map([
      [userIds[1], true],
      [userIds[3], true],
      [userIds[5], true],
      [userIds[7], true],
    ]),
    comments: [
      "Can you specify what kind of exam you need?",
      "Is it mid exam?",
    ],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[6],
    firstName: "Amanuel",
    lastName: "Tolossa",
    university: "AASTU",
    department: "Electrical and Computer Engineering",
    description: "Guys here is DSA chapter 5 pdf",
    filePath: "dsa-c5.pdf",
    userPicturePath: "p3.jpeg",
    likes: new Map([
      [userIds[1], true],
      [userIds[2], true],
    ]),

    comments: [
      "Thank you! That was helpful",
      "Respect",
      "Amanuel you are so helpful!",
    ],
  },
];
