import { NextRequest, NextResponse } from "next/server";
import React from "react";

const Middleware = (request: NextRequest) => {
  return NextResponse.redirect(new URL("/overview", request.url));
};

const config = {
  matcher: ["/", "/home", "/dashboard"],
};
Middleware.config = config;

export default Middleware;
