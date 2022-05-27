import CreateTheory from "@/modules/Theory/views/CreateTheory";
import TheoryView from "@/modules/Theory/views/TheoryView";

export default [
    {
        path: '/create-theory',
        name: 'CreateTheory',
        component: CreateTheory,
        meta:{
            layout: "main"
        }
    },
    {
        path: '/theory-view/:id',
        name: 'TheoryView',
        component: TheoryView,
        meta:{
            layout: "main"
        }
    },
]