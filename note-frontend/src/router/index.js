import { createWebHistory, createRouter } from "vue-router";
const routes = [
    {
        path: "/",
        alias: "/notebook",
        name: "NoteBook",
        component: () => import("../views/NoteBook"),
    },       
    {
        path: "/notes/:id",
        name: "EditNote",
        component: () => import("../views/NoteEdit"),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router;