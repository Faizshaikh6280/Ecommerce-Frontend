import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const userApi = createApi({
    reducerPath : "userApi",
    baseQuery : fetchBaseQuery({
        baseUrl : `${import.meta.env.VITE_SERVER}/api/v1/user`
    }),
    endpoints : (builder)=>({
        login : builder.mutation({  
            query : (user)=> ({
                url : "/signup",
                method : "POST",
                body : user
            })
        })
    })
})

export const {useLoginMutation} = userApi;