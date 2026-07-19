import React, { createContext, useState, useEffect } from "react";


export const AuthContext = createContext();



export const AuthProvider = ({ children }) => {


  const [user, setUser] = useState(null);

  const [token, setToken] = useState(null);





  // Restore login after refresh

  useEffect(() => {


    const savedToken = localStorage.getItem("token");

    const savedUser = localStorage.getItem("user");



    if(savedToken && savedUser){


      try {


        const parsedUser = JSON.parse(savedUser);


        setToken(savedToken);

        setUser(parsedUser);



        // restore role

        if(parsedUser.role){

          localStorage.setItem(
            "role",
            parsedUser.role
          );

        }



      } catch(error){


        console.log(
          "Failed to restore user",
          error
        );


        localStorage.clear();


      }


    }


  }, []);








  const login = (userData) => {


    setUser(userData);


    setToken(userData.token);





    localStorage.setItem(

      "token",

      userData.token

    );




    localStorage.setItem(

      "user",

      JSON.stringify(userData)

    );





    if(userData.role){


      localStorage.setItem(

        "role",

        userData.role

      );


    }



  };









  const logout = () => {


    setUser(null);

    setToken(null);



    localStorage.removeItem("token");

    localStorage.removeItem("user");

    localStorage.removeItem("role");


  };








  return (

    <AuthContext.Provider

      value={{

        user,

        token,

        login,

        logout

      }}

    >

      {children}

    </AuthContext.Provider>

  );


};