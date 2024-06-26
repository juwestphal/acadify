const CACHE_NAME = 'meu-projeto-cache-v1';

const urlsToCache = [
  '/',
  '/bemvindo.html',
  '/css/style.css',
  '/js/basededados.js',
  '/html/cadeiras.html',
  '/html/calendario.html',
  '/html/definicoes_admin.html',
  '/html/definicoes.html',
  '/html/entidade.html',
  '/html/inicial.html',
  '/html/login.html',
  '/html/notas.html',
  '/html/registra.html',
  '/html/horario.html',
  '/html/offline.html' 
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache aberto');
        return cache.addAll(urlsToCache);
      })
      .catch(err => {
        console.error('Falha ao abrir o cache:', err);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }

        return fetch(event.request).then(response => {
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          const responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            })
            .catch(err => {
              console.error('Erro ao adicionar ao cache:', err);
            });

          return response;
        }).catch(err => {
          console.error('Erro ao buscar recurso:', err);
          //página offline se a rede falhar
          return caches.match('/offline.html');
        });
      }).catch(err => {
        console.error('Erro ao buscar no cache:', err);
        //página offline se o cache também falhar
        return caches.match('/offline.html');
      })
  );
});

// limpar caches antigos
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            console.log('Removendo cache antigo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
