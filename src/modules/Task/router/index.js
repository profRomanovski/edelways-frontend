import CreateTask from "@/modules/Task/views/CreateTask";
import TaskView from "@/modules/Task/views/TaskView";
import TaskViewAdmin from "@/modules/Task/views/TaskViewAdmin";
import TaskReview from "@/modules/Task/views/TaskReview";

export default [
    {
        path: '/create-task',
        name: 'CreateTask',
        component: CreateTask,
        meta:{
            layout: "main"
        }
    },
    {
        path: '/task-view/:id',
        name: 'TaskView',
        component: TaskView,
        meta:{
            layout: "main"
        }
    },
    {
        path: '/task-view-admin/:id',
        name: 'TaskViewAdmin',
        component: TaskViewAdmin,
        meta:{
            layout: "main"
        }
    },
    {
        path: '/task-review/:id',
        name: 'TaskReview',
        component: TaskReview,
        meta:{
            layout: "main"
        }
    },
]