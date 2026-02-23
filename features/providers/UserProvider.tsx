"use client";

import React, { createContext, useContext } from "react";
type User = {
  displayName: string;
  email: string;
  email_verified: boolean;
  phone_verified: boolean;
  sub: string;
};
const UserContext = createContext<User | null>(null);

const UserProvider = ({
  user,
  children,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any;
  children: React.ReactNode;
}) => {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export default UserProvider;

export const useUser = () => useContext(UserContext);
