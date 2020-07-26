
const routes = [
  {
    path: '/',
    component: () => import('layouts/FilmesLayout.vue'),
    children: [
      { path: '', component: () => import('pages/index.vue') },     
      { path: 'busca/:id', component: () => import('pages/filmeLista.vue') },
      { path: 'filme/:id', component: () => import('pages/filme.vue') }
    ]
  },{
    path: '*/',
    component: () => import('layouts/FilmesLayout.vue'),
    children: [
      { path: 'filme', component: () => import('pages/filme.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
