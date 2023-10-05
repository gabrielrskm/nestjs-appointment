interface RequestWithUser extends Response {
   user: { id: string; role: string, email: string };
 }
 