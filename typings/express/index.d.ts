declare namespace Express {
  interface Request {
    user: {
      id: string;
      name: string;
      username: string;
      picture: string;
    } | null;
  }
}
