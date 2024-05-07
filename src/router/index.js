import { createRouter, createWebHistory } from 'vue-router'
import { getAuth, onAuthStateChanged } from "firebase/auth";

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/RegisterView.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue'),
  },
  {
    path: '/adminpanel',
    name: 'adminpanel',
    component: () => import('../views/AdminPanelView.vue'),
    meta: {requiresAuth: true},
  },
  {
    path: '/reservation',
    name: 'reservation',
    component: () => import('../views/ReservationView.vue'),
    meta: {requiresAuth: true},
  },
  {
    path: '/reservations',
    name: 'reservations',
    component: () => import('../views/ReservationsView.vue'),
  },
  {
    path: '/classroom',
    name: 'classroom',
    component: () => import('../views/ClassroomView.vue'),
  },
  {
    path: '/reservations-history',
    name: 'reservations-history',
    component: () => import('../views/ReservationsHistoryView.vue'),
    meta: {requiresAuth: true},
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

const getCurrentUser = () =>{
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user);
      },
      reject
    );
  });
};

router.beforeEach(async (to, from, next) => {
  if(to.matched.some((record) => record.meta.requiresAuth)){
    if(await getCurrentUser()){
      next();
    }else{
      next("/login");
    }
  }else{
    next();
  }
});

export default router