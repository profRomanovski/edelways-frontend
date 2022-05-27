import GroupGeneral from "@/modules/Groups/views/GroupGeneral";
import GroupView from "@/modules/Groups/views/GroupView";

export default [
    {
        path: '/',
        name: 'GroupGeneral',
        component: GroupGeneral,
        meta:{
            layout: "main"
        }
    },
    {
        path: '/view/:id',
        name: 'GroupView',
        component: GroupView,
        meta:{
            layout: "main"
        }
    },
]