import React from "react";
import { useSession, signOut, getSession } from "next-auth/react";
const account = () => {
  const { data: session, status } = useSession();
console.log(session);  
  if (status === "authenticated") {
    return (
      <div>
        <p>Welcome, {session.user.name}</p>
        <img
          src={session.user.image}
          alt="image"
          style={{ borderRadius: "50px" }}
        />
        <button onClick={() => signOut()}>Sign Out</button>
      </div>
    );
  } else {
    return (
      <div>
        <p>You are not signed in.</p>
      </div>
    );
  }
};

export default account;

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  if(!session){
    return {
        redirect:{
            destination:'/login'
        }
    }
  }
  return {
    props: { session },
  };
};
