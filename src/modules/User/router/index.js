import Register from "@/modules/User/views/Register";
import Login from "@/modules/User/views/Login";

export default [
    {
        path: '/registration',
        name: 'Register',
        component: Register,
        meta:{
            layout: "main"
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta:{
            layout: "main"
        }
    },
]