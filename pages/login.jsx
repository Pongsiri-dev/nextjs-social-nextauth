import React from "react";
import { useSession, signIn, signOut ,getSession} from "next-auth/react";
const login = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <div>
        <p>Welcome, {session.user.email}</p>
        <img src={session.user.image} alt="image" style={{borderRadius:'50px'}}/>
        <button onClick={()=> signOut()}>Sign Out</button>
      </div>
    );
  } else {
    return (
      <div>
        <p>You are not signed in.</p>
        <button onClick={() => signIn()}>Sign in</button>
      </div>
    );
  }
};

export default login;
export const getServerSideProps = async (context) => {
    const session = await getSession(context);
    if(session){
      return {
          redirect:{
              destination:'/account'
          }
      }
    }
    return {
      props: { session },
    };
  };