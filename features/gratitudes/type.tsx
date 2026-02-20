export type GratitudeType = {
  id: string;
  userid: string;
  content: string;
  isanonymous: boolean;
  isvisible: boolean;
  createdat: string;
  hearts: number;
  likes: number;
  cared: number;
  prayed: number;
  celebrate: number;
  reactions: [
    {
      name: string;
      user_id: string;
      reaction: string;
    },
  ];
  user_profiles: {
    id: string;
    email: string;
    createdat: string;
    displayname: string;
    lastactiveat: string;
    anonymous_username: string;
  };
};
