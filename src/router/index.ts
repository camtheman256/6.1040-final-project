import PlaceSearchVue from "@/components/PlaceSearch.vue";
import SpacesGridVue from "@/views/SpacesGrid.vue";
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SingleSpaceView from "../views/SingleSpaceView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/spaces",
      name: "spaces",
      component: SpacesGridVue,
    },
    {
      path: "/space/:id",
      name: "space",
      component: SingleSpaceView,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    {
      // I need a place to build the place search widget, so this can get removed in the final version
      path: "/place-search",
      name: "place-search",
      component: PlaceSearchVue,
    },
  ],
});

export default router;
