importScripts("https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey:            "AIzaSyDaMCyFYwJvFlx9OstCp4lSbprpXza3meE",
  authDomain:        "devdic-herbal-e79e1.firebaseapp.com",
  projectId:         "devdic-herbal-e79e1",
  storageBucket:     "devdic-herbal-e79e1.firebasestorage.app",
  messagingSenderId: "221133624530",
  appId:             "1:221133624530:web:4ed65ada79561f4fe6490b",
});

const messaging = firebase.messaging();

// Background message handler — browser band ya tab inactive hone par
messaging.onBackgroundMessage((payload) => {
  // notification field ho to wahi, warna data se (alert ab data-only aata hai)
  const title = payload.notification?.title || payload.data?.title || "Devdic";
  const body  = payload.notification?.body  || payload.data?.body  || "";

  self.registration.showNotification(title, {
    body,
    icon:  "/icons/Icon-192.png",
    badge: "/icons/Icon-192.png",
    data:  payload.data || {},
  });
});

// Notification click → app kholo
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes("devdic") && "focus" in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow("https://rkroy4doctor-devdic.github.io/devdic-chat-web/");
      }
    })
  );
});
