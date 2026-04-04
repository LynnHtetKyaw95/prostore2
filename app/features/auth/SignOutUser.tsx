import { Button } from "@/components/ui/button";
import { signOutUser } from "@/lib/actions/userAction";

const SignOutUser = () => {
  return (
    <form action={signOutUser} className="w-full">
      <Button className="w-full py-2 px-0 justify-start" variant={"ghost"}>
        Sign Out
      </Button>
    </form>
  );
};

export default SignOutUser;
